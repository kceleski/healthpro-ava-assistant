// Save this code as: src/components/MapView.tsx

import React, { useState, useEffect, useMemo, useRef } from 'react'; // Added useRef
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Navigation, Phone, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming custom hook exists
import { toast } from 'sonner'; // Assuming sonner is setup

// Define the expected structure for a facility passed via props
// Ensure this matches the structure returned by your backend search function
interface Facility {
  id: string;         // Unique ID (e.g., Google Place ID)
  name: string;
  address: string;
  latitude?: number;  // Expecting these from backend or client-side geocoding
  longitude?: number;
  type?: string;      // Primary type/category
  phone?: string;     // Optional phone number
  website?: string;   // Optional website URL
  rating?: number;    // Optional rating
  photo?: string;     // Optional photo URL
  priceRange?: string;
  // Add other relevant fields returned by your backend search
}

interface GoogleMapsViewProps {
  facilities: Facility[] | null | undefined; // Facilities array passed as prop
  isLoading: boolean;                       // Loading state passed as prop
  hasSearched: boolean;                     // Indicates if a search attempt was made
}

// IMPORTANT: Replace with your actual Google Maps API key, loaded securely from environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_FALLBACK"; // Replace FALLBACK
const mapLibraries = useMemo(() => ['marker'], []); // Memoize libraries array

const GoogleMapsView = ({ facilities, isLoading, hasSearched }: GoogleMapsViewProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 33.4484, lng: -112.0740 }); // Phoenix center
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const isMobile = useIsMobile();
  const mapRef = useRef<google.maps.Map | null>(null); // Ref to access map instance

  // Memoize valid facilities with coordinates
  const validFacilities = useMemo(() => {
      return (facilities || []).filter(f => typeof f.latitude === 'number' && typeof f.longitude === 'number');
  }, [facilities]);

  // Effect to get user's location
  useEffect(() => {
    // Only get location if a search has been done and we don't have it yet
    if (hasSearched && !userLocation && navigator.geolocation) {
      console.log('Attempting to get user location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newUserLocation);
          // Don't automatically center on user if facilities are found, wait for fitBounds
          console.log('User location set:', newUserLocation);
        },
        (error) => {
          console.warn('Error getting user location:', error.message);
          // Don't center map here, wait for facility data or default
        },
        { timeout: 10000 }
      );
    }
  }, [hasSearched, userLocation]); // Depend only on these

  // Effect to fit bounds when facilities or user location change
  useEffect(() => {
    if (mapRef.current && validFacilities.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      validFacilities.forEach(f => {
          if (f.latitude && f.longitude) { // Check again for type safety
             bounds.extend(new window.google.maps.LatLng(f.latitude, f.longitude));
          }
      });
      if (userLocation) {
        bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
      }

      if (bounds.isEmpty()) {
          // If bounds are empty (e.g., only one point), center manually
          if (validFacilities[0]?.latitude && validFacilities[0]?.longitude) {
              mapRef.current.setCenter({ lat: validFacilities[0].latitude, lng: validFacilities[0].longitude });
              mapRef.current.setZoom(13); // Zoom in a bit for single result
          } else if (userLocation) {
              mapRef.current.setCenter(userLocation);
              mapRef.current.setZoom(11);
          }
      } else if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
         // Only one point in bounds, center and zoom
         mapRef.current.setCenter(bounds.getCenter());
         mapRef.current.setZoom(13);
      }
      else {
          console.log("Fitting map bounds...");
          mapRef.current.fitBounds(bounds, 60); // Add padding (e.g., 60px)
      }
    } else if (mapRef.current && !isLoading && hasSearched && validFacilities.length === 0) {
        // No valid facilities, center on user or default
        if (userLocation) {
            mapRef.current.setCenter(userLocation);
            mapRef.current.setZoom(11);
        } else {
             mapRef.current.setCenter({ lat: 33.4484, lng: -112.0740 }); // Phoenix
             mapRef.current.setZoom(10);
        }
    }
  }, [validFacilities, userLocation, isLoading, hasSearched]); // Re-run when these change


  // Effect to pan map when a facility is selected (smoothly if possible)
  useEffect(() => {
    if (selectedFacility?.latitude && selectedFacility?.longitude && mapRef.current) {
      const newCenter = {
        lat: Number(selectedFacility.latitude),
        lng: Number(selectedFacility.longitude)
      };
      console.log('Panning map to selected facility:', selectedFacility.name);
      mapRef.current.panTo(newCenter);
      // Optionally adjust zoom if needed when selecting
      // if (mapRef.current.getZoom() < 14) {
      //     mapRef.current.setZoom(14);
      // }
    }
  }, [selectedFacility]);


  const containerStyle = useMemo(() => ({
    width: '100%',
    height: '100%', // Take full height of parent
    minHeight: '600px', // Ensure minimum height
    borderRadius: '0.5rem',
    overflow: 'hidden'
  }), []);

  const mapOptions = useMemo(() => ({
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    zoomControl: true,
    styles: [
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }
    ],
    mapId: '94ee754f515a1722' // Apply your Map ID for potential styling/3D
  }), []);

  // --- Event Handlers ---
  const handleGetDirections = (facility: Facility) => {
    if (!facility.address) { toast.error("Address not available."); return; }
    const destination = encodeURIComponent(facility.address);
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Opening directions to ${facility.name}`);
  };

  const handleMarkerClick = (facility: Facility) => {
    console.log('Marker clicked:', facility.name);
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
  }

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
      console.log("Map loaded.");
      mapRef.current = mapInstance;
      // Initial bounds fitting can happen here if needed, but useEffect handles updates
  }, []);

  const handleMapUnmount = useCallback(() => {
      console.log("Map unmounted.");
      mapRef.current = null;
  }, []);


  // --- Render Logic ---

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-muted-foreground text-center">Loading facilities map...</p>
      </div>
    );
  }

  // No search performed yet
  if (!hasSearched) {
    return (
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border border-dashed">
        <MapPin className="h-16 w-16 mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">Search for facilities to see them on the map</p>
        <p className="text-sm text-gray-500">Your search results will appear here</p>
      </div>
    );
  }

   // No results found after search
   if (hasSearched && (!facilities || facilities.length === 0)) {
    return (
        <div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border border-dashed">
            <MapPin className="h-16 w-16 mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-600">No Facilities Found</p>
            <p className="text-sm text-gray-500 text-center max-w-xs">
                No facilities matched your search criteria. Try adjusting your search.
            </p>
        </div>
    );
   }


  // *** Render Google Map ***
  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border">
        {/* Check if API key is provided */}
        {!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_FALLBACK" ? (
             <div className="absolute inset-0 flex items-center justify-center bg-red-100 z-20">
                 <p className="text-red-700 font-medium text-center p-4">
                     Google Maps API Key is missing or invalid.<br/> Please configure it in your environment variables.
                 </p>
             </div>
        ) : (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={mapLibraries}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter} // Center state is managed by effects
                    zoom={11} // Initial zoom, fitBounds will adjust
                    options={mapOptions}
                    onLoad={handleMapLoad} // Get map instance
                    onUnmount={handleMapUnmount} // Clean up map instance
                >
                    {/* User Location Marker */}
                    {userLocation && (
                        <MarkerF
                        position={userLocation}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
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
                        // Optional: Add custom icon based on facility.type or if selected
                        // icon={selectedFacility?.id === facility.id ? selectedIcon : defaultIcon}
                        />
                    ))}

                    {/* Info Window for Selected Facility */}
                    {selectedFacility && selectedFacility.latitude && selectedFacility.longitude && (
                        <InfoWindowF
                        position={{ lat: selectedFacility.latitude, lng: selectedFacility.longitude }}
                        onCloseClick={handleInfoWindowClose}
                        options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Adjust offset
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
                                <Button size="xs" variant="outline" onClick={() => handleCallFacility(selectedFacility.phone)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                                    <Phone className="h-3 w-3" /> Call
                                </Button>
                            )}
                            {selectedFacility.website && (
                                <Button size="xs" variant="outline" onClick={() => handleVisitWebsite(selectedFacility.website)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                                    <Globe className="h-3 w-3" /> Website
                                </Button>
                            )}
                            <Button size="xs" variant="outline" onClick={() => handleGetDirections(selectedFacility)} className="flex items-center gap-1 text-xs px-1.5 py-0.5">
                                <Navigation className="h-3 w-3" /> Directions
                            </Button>
                            </div>
                        </div>
                        </InfoWindowF>
                    )}
                </GoogleMap>
            </LoadScript>
        )}
    </div>
  );
};

export default GoogleMapsView;
