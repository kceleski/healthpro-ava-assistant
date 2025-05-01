import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Navigation, Phone, Globe, Search, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming custom hook
import { toast } from 'sonner'; // Assuming sonner is setup

// Define the expected structure for a facility passed via props
// Ensure this matches the structure returned by your backend search function
interface Facility {
  id: string;         // Unique ID (e.g., Google Place ID)
  name: string;
  address: string;
  latitude?: number;  // Latitude might be fetched/geocoded separately if not returned by search
  longitude?: number; // Longitude might be fetched/geocoded separately if not returned by search
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
const mapLibraries = ['marker']; // Use the 'marker' library for AdvancedMarkerElement implicitly used by MarkerF

const GoogleMapsView = ({ facilities, isLoading, hasSearched }: GoogleMapsViewProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  // Default center, updated by user location or selected facility
  const [mapCenter, setMapCenter] = useState({ lat: 33.4484, lng: -112.0740 }); // Phoenix center
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const isMobile = useIsMobile();

  // Memoize valid facilities with coordinates to avoid recalculating on every render
  const validFacilities = useMemo(() => {
      return (facilities || []).filter(f => typeof f.latitude === 'number' && typeof f.longitude === 'number');
  }, [facilities]);

  // Effect to get user's location ONCE when the component mounts after a search
  useEffect(() => {
    if (hasSearched && !userLocation && navigator.geolocation) {
      console.log('Attempting to get user location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newUserLocation);
          // Center on user location initially only if no facilities are found yet
          if ((!validFacilities || validFacilities.length === 0)) {
              setMapCenter(newUserLocation);
          }
          console.log('User location set:', newUserLocation);
        },
        (error) => {
          console.warn('Error getting user location:', error.message);
          // Keep default Phoenix center
        },
        { timeout: 10000 }
      );
    }
  }, [hasSearched, userLocation, validFacilities]); // Rerun if hasSearched changes

  // Effect to update map center when a facility is selected
  useEffect(() => {
    if (selectedFacility?.latitude && selectedFacility?.longitude) {
      setMapCenter({
        lat: Number(selectedFacility.latitude),
        lng: Number(selectedFacility.longitude)
      });
      console.log('Centering map on selected facility:', selectedFacility.name);
    }
  }, [selectedFacility]);

   // Effect to update map center if facilities load and user location is known
   useEffect(() => {
    if (validFacilities.length > 0 && !selectedFacility) {
        // If user location is known, maybe fit bounds? For now, center on first facility
        // if user location is unknown or map hasn't been centered yet.
        if (!userLocation || (mapCenter.lat === 33.4484 && mapCenter.lng === -112.0740)) {
             setMapCenter({
                 lat: Number(validFacilities[0].latitude),
                 lng: Number(validFacilities[0].longitude)
             });
        }
        // Consider using fitBounds here for a better experience with multiple markers
    }
   }, [validFacilities, userLocation, selectedFacility, mapCenter]);


  const containerStyle = useMemo(() => ({
    width: '100%',
    height: '100%', // Take full height of parent
    minHeight: '600px', // Ensure minimum height
    borderRadius: '0.5rem', // Add some rounding
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
    ]
  }), []);

  // --- Event Handlers ---
  const handleGetDirections = (facility: Facility) => {
    if (!facility.address) { toast.error("Address not available."); return; }
    const destination = encodeURIComponent(facility.address);
    // Use standard Google Maps URL
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

  // --- Render Logic ---

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-slate-100 rounded-lg border">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-muted-foreground text-center">Loading facilities...</p>
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
                center={mapCenter}
                zoom={11} // Start with a reasonable zoom, fitBounds can adjust later
                options={mapOptions}
                // Optional: Add map instance ref for fitBounds
                // onLoad={(map) => { /* save map instance, fit bounds */ }}
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
                    // You can customize the marker icon here if needed
                    />
                ))}

                {/* Info Window for Selected Facility */}
                {selectedFacility && selectedFacility.latitude && selectedFacility.longitude && (
                    <InfoWindowF
                    position={{ lat: selectedFacility.latitude, lng: selectedFacility.longitude }}
                    onCloseClick={handleInfoWindowClose}
                    options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
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
