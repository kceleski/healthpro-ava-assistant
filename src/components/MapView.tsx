import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Navigation, Phone, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Define the expected structure for a facility passed via props
interface Facility {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  phone?: string;
  website?: string;
  rating?: number;
  photo?: string;
  priceRange?: string;
}

interface GoogleMapsViewProps {
  facilities: Facility[] | null | undefined;
  isLoading: boolean;
  hasSearched: boolean;
  isVisible: boolean; // New prop to control when map should load
}

// Use environment variable for API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const mapLibraries = ["places"];

const GoogleMapsView = ({ facilities, isLoading, hasSearched, isVisible }: GoogleMapsViewProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 33.4484, lng: -112.0740 }); // Phoenix center
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const isMobile = useIsMobile();
  const mapRef = useRef<google.maps.Map | null>(null);

  // Only load the script when isVisible is true
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: mapLibraries as any,
    // Only load the script when the tab is active
    preventGoogleFontsLoading: !isVisible
  });

  // Memoize valid facilities with coordinates
  const validFacilities = useMemo(() => {
    return (facilities || []).filter(f => typeof f.latitude === 'number' && typeof f.longitude === 'number');
  }, [facilities]);

  // Effect to get user's location
  useEffect(() => {
    if (isVisible && hasSearched && !userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newUserLocation);
        },
        (error) => {
          console.warn('Error getting user location:', error.message);
        },
        { timeout: 10000 }
      );
    }
  }, [hasSearched, userLocation, isVisible]);

  // Effect to fit bounds when facilities or user location change
  const fitBounds = useCallback(() => {
    if (mapRef.current && validFacilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      validFacilities.forEach(f => {
        if (f.latitude && f.longitude) {
          bounds.extend(new google.maps.LatLng(f.latitude, f.longitude));
        }
      });
      
      if (userLocation) {
        bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
      }

      if (bounds.isEmpty()) {
        if (validFacilities[0]?.latitude && validFacilities[0]?.longitude) {
          mapRef.current.setCenter({ lat: validFacilities[0].latitude, lng: validFacilities[0].longitude });
          mapRef.current.setZoom(13);
        } else if (userLocation) {
          mapRef.current.setCenter(userLocation);
          mapRef.current.setZoom(11);
        }
      } else if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        mapRef.current.setCenter(bounds.getCenter());
        mapRef.current.setZoom(13);
      } else {
        mapRef.current.fitBounds(bounds, 60);
      }
    } else if (mapRef.current && !isLoading && hasSearched && validFacilities.length === 0) {
      if (userLocation) {
        mapRef.current.setCenter(userLocation);
        mapRef.current.setZoom(11);
      } else {
        mapRef.current.setCenter({ lat: 33.4484, lng: -112.0740 });
        mapRef.current.setZoom(10);
      }
    }
  }, [validFacilities, userLocation, isLoading, hasSearched]);

  useEffect(() => {
    if (isLoaded && mapRef.current && isVisible) {
      fitBounds();
    }
  }, [isLoaded, validFacilities, userLocation, isLoading, hasSearched, fitBounds, isVisible]);

  // Effect to pan map when a facility is selected
  useEffect(() => {
    if (selectedFacility?.latitude && selectedFacility?.longitude && mapRef.current) {
      const newCenter = {
        lat: Number(selectedFacility.latitude),
        lng: Number(selectedFacility.longitude)
      };
      mapRef.current.panTo(newCenter);
    }
  }, [selectedFacility]);

  const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '500px',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
    styles: [
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
    ]
  };

  // --- Event Handlers ---
  const handleGetDirections = (facility: Facility) => {
    if (!facility.address) { toast.error("Address not available."); return; }
    const destination = encodeURIComponent(facility.address);
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Opening directions to ${facility.name}`);
  };

  const handleMarkerClick = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  const handleCallFacility = (phoneNumber: string | undefined) => {
    if (!phoneNumber) { toast.error("Phone number not available."); return; }
    window.open(`tel:${phoneNumber}`);
    toast.info(`Initiating call to ${phoneNumber}...`);
  };

  const handleVisitWebsite = (website: string | undefined) => {
    if (!website) { toast.error("Website not available."); return; }
    const url = website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.info('Opening website...');
  };

  const handleInfoWindowClose = () => {
    setSelectedFacility(null);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMapUnmount = () => {
    mapRef.current = null;
  };

  // Don't try to load anything if the tab isn't visible
  if (!isVisible) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-slate-50 rounded-lg">
        <div className="text-center p-6">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Map View</h3>
          <p className="text-sm text-gray-500">
            Click the "Map View" tab to load the interactive map.
          </p>
        </div>
      </div>
    );
  }

  // --- Render Logic ---
  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-muted-foreground text-center">Loading facilities map...</p>
      </div>
    );
  }

  // No search performed yet
  if (!hasSearched) {
    return (
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border border-dashed">
        <MapPin className="h-16 w-16 mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">Search for facilities to see them on the map</p>
        <p className="text-sm text-gray-500">Your search results will appear here</p>
        <Button variant="outline" className="mt-4" onClick={() => window.open("https://maps.google.com", "_blank")}>
          Open Google Maps
        </Button>
      </div>
    );
  }

  // No results found after search
  if (hasSearched && (!facilities || facilities.length === 0)) {
    return (
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border border-dashed">
        <MapPin className="h-16 w-16 mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">No Facilities Found</p>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          No facilities matched your search criteria. Try adjusting your search.
        </p>
      </div>
    );
  }

  // Loading script
  if (!isLoaded) {
    return (
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-muted-foreground text-center">Loading Google Maps...</p>
      </div>
    );
  }

  // Maps API error
  if (loadError) {
    return (
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-lg font-medium text-red-700">Failed to load Google Maps</p>
        <p className="text-sm text-red-600 mt-2 text-center max-w-md px-4">
          {!GOOGLE_MAPS_API_KEY ? 
            "Google Maps API Key is missing. Please set the VITE_GOOGLE_MAPS_API_KEY environment variable." : 
            "There was an error loading Google Maps. Please try again later."
          }
        </p>
        <Button variant="outline" className="mt-4" onClick={() => window.open("https://maps.google.com", "_blank")}>
          Open Google Maps Instead
        </Button>
      </div>
    );
  }

  // *** Render Google Map ***
  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={11}
        options={mapOptions}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
      >
        {/* User Location Marker */}
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7, fillColor: "#4285F4", fillOpacity: 1,
              strokeWeight: 1.5, strokeColor: "#ffffff"
            }}
            title="Your Location"
            zIndex={10}
          />
        )}

        {/* Facility Markers */}
        {validFacilities.map((facility) => (
          <MarkerF
            key={facility.id}
            position={{ lat: facility.latitude!, lng: facility.longitude! }}
            onClick={() => handleMarkerClick(facility)}
            title={facility.name}
          />
        ))}

        {/* Info Window for Selected Facility */}
        {selectedFacility && selectedFacility.latitude && selectedFacility.longitude && (
          <InfoWindowF
            position={{ lat: selectedFacility.latitude, lng: selectedFacility.longitude }}
            onCloseClick={handleInfoWindowClose}
            options={{ pixelOffset: new google.maps.Size(0, -30) }}
          >
            {/* InfoWindow Content */}
            <div className="p-1 max-w-xs text-sm">
              <h3 className="font-semibold mb-1 text-base">{selectedFacility.name}</h3>
              {selectedFacility.type && (
                <Badge variant="secondary" className="mb-2 text-xs">{selectedFacility.type}</Badge>
              )}
              <p className="text-xs text-gray-600 mb-2">{selectedFacility.address}</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedFacility.phone && (
                  <Button size="sm" variant="outline" onClick={() => handleCallFacility(selectedFacility.phone)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                    <Phone className="h-3 w-3" /> Call
                  </Button>
                )}
                {selectedFacility.website && (
                  <Button size="sm" variant="outline" onClick={() => handleVisitWebsite(selectedFacility.website)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                    <Globe className="h-3 w-3" /> Website
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => handleGetDirections(selectedFacility)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                  <Navigation className="h-3 w-3" /> Directions
                </Button>
              </div>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
      <div className="absolute bottom-4 right-4">
        <Button 
          variant="default"
          className="shadow-lg"
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent('Senior Living Facilities near Phoenix, AZ')}`;
            window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <MapPin className="h-4 w-4 mr-2" /> Open in Google Maps
        </Button>
      </div>
    </div>
  );
};

export default GoogleMapsView;
