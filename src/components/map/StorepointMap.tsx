
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    SP: any;
    selectedLocation: any;
  }
}

const StorepointMap = () => {
  const [mapInteractive, setMapInteractive] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Remove any existing StorePoint scripts to prevent duplication
    const existingScript = document.querySelector('script[src*="storepoint.co"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Try to get assessment data from localStorage
    const assessmentDataString = localStorage.getItem('assessmentData');
    let assessmentData = null;
    
    if (assessmentDataString) {
      try {
        assessmentData = JSON.parse(assessmentDataString);
      } catch (error) {
        console.error("Error parsing assessment data:", error);
      }
    }

    // Add StorePoint script with async attribute
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true; // Add defer to improve loading performance
    script.src = 'https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js';
    script.onload = () => setMapScriptLoaded(true);
    document.body.appendChild(script);

    // Set a timeout to check if the map loaded within a reasonable time
    const mapTimeout = setTimeout(() => {
      if (isMapLoading) {
        toast({
          title: "Map is taking longer than expected",
          description: "Please wait a moment while it continues to load.",
        });
      }
    }, 5000);

    // Wait for StorePoint to fully load
    const checkSP = setInterval(function() {
      if (typeof window.SP !== 'undefined') {
        clearInterval(checkSP);
        setIsMapLoading(false);
        
        // Configure map display
        window.SP.options.maxLocations = 20; // Show more locations at a time
        window.SP.options.defaultView = 'map'; // Start with map view
        window.SP.options.templateType = 'custom';
        window.SP.options.showSidePanel = true; // Enable side panel for more information
        window.SP.options.scrollToLocation = true; // Scroll to selected location
        window.SP.options.markerColor = '#9b87f5'; // Use custom brand color
        
        // Mobile-specific adjustments
        if (isMobile) {
          window.SP.options.markerSize = 'small'; // Smaller markers on mobile
          window.SP.options.infoWindowWidth = 280; // Smaller info windows
        } else {
          window.SP.options.markerSize = 'medium'; // Normal markers on desktop
          window.SP.options.infoWindowWidth = 350; // Normal info windows
        }
        
        if (!mapInteractive) {
          const mapContainer = document.querySelector('#storepoint-container');
          if (mapContainer) {
            mapContainer.classList.add('pointer-events-none', 'opacity-70');
          }
        } else {
          const mapContainer = document.querySelector('#storepoint-container');
          if (mapContainer) {
            mapContainer.classList.remove('pointer-events-none', 'opacity-70');
          }
          
          // Apply highlighting based on user preferences from assessment if available
          if (assessmentData && assessmentData.careType) {
            highlightMatchingFacilities(assessmentData.careType);
          }
        }
        
        // Set up event listeners for location selection
        window.SP.on('markerClick', function(location: any) {
          console.log('Location selected:', location.name);
          window.selectedLocation = location;
          setSelectedFacility(location);
          
          toast({
            title: location.name,
            description: `${location.address}, ${location.city}, ${location.state}`,
          });
        });

        // Set initial map center based on assessment data or default to US center
        if (assessmentData && assessmentData.locationCoordinates) {
          window.SP.map.setCenter({
            lat: assessmentData.locationCoordinates.lat || 39.8283,
            lng: assessmentData.locationCoordinates.lng || -98.5795
          });
          window.SP.map.setZoom(9);
        }
      }
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(checkSP);
      clearTimeout(mapTimeout);
      // Remove the script when component unmounts
      const storepointScript = document.querySelector('script[src="https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js"]');
      if (storepointScript) {
        storepointScript.remove();
      }
    };
  }, [mapInteractive, isMobile, toast, isMapLoading]);

  // Function to highlight matching facilities
  const highlightMatchingFacilities = (careType: string) => {
    if (!window.SP || !window.SP.locations) return;
    
    setTimeout(() => {
      // We need to wait a bit for the StorePoint map to fully render
      const allMarkers = document.querySelectorAll('.storepoint-marker');
      
      allMarkers.forEach((marker: any) => {
        // Reset any previous styling
        marker.style.transform = 'scale(1)';
        marker.style.zIndex = '1';
        marker.style.filter = '';
        
        // Apply highlighting based on the facility types and user preferences
        const facilityName = marker.getAttribute('data-name')?.toLowerCase() || '';
        const facilityDescription = marker.getAttribute('data-description')?.toLowerCase() || '';
        
        let isMatch = false;
        
        // Match by care type
        if (careType === 'memory' && 
            (facilityName.includes('memory') || facilityDescription.includes('memory care'))) {
          isMatch = true;
        } else if (careType === 'assisted' && 
                  (facilityName.includes('assisted') || facilityDescription.includes('assisted living'))) {
          isMatch = true;
        } else if (careType === 'independent' && 
                  (facilityName.includes('independent') || facilityDescription.includes('independent living'))) {
          isMatch = true;
        } else if (careType === 'nursing' && 
                  (facilityName.includes('nursing') || facilityDescription.includes('nursing home'))) {
          isMatch = true;
        }
        
        // If it's a match, highlight it
        if (isMatch) {
          marker.style.transform = 'scale(1.3)';
          marker.style.zIndex = '1000';
          marker.style.filter = 'drop-shadow(0 0 10px rgba(155, 135, 245, 0.8))';
        } else {
          marker.style.opacity = '0.6';
        }
      });
    }, 2000);
  };

  const handleAskAva = () => {
    navigate('/portal/ava');
  };

  return (
    <div className="relative w-full h-full">
      {isMapLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-32 w-[300px] mt-4" />
          </div>
          <p className="mt-4 text-muted-foreground">Loading facility map...</p>
        </div>
      )}
      
      <div 
        id="storepoint-container" 
        data-map-id="1645a775a8a422" 
        className="storepoint-map h-full min-h-[600px]"
        style={{ width: '100%', height: '100%' }}
      ></div>
      
      {selectedFacility && (
        <div className="absolute bottom-20 left-4 z-10 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{selectedFacility.name}</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setSelectedFacility(null)}
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true">×</span>
            </Button>
          </div>
          <div className="mt-2">
            <div className="flex items-start gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{selectedFacility.address}, {selectedFacility.city}, {selectedFacility.state}</span>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="flex-1">Details</Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                if (selectedFacility.phone) {
                  window.location.href = `tel:${selectedFacility.phone}`;
                }
              }}
            >
              Call
            </Button>
          </div>
        </div>
      )}
      
      <div className={`absolute ${isMobile ? 'bottom-20 right-4' : 'bottom-4 right-4'} z-10`}>
        <Button 
          className="shadow-lg"
          onClick={handleAskAva}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Ask Ava about facilities
        </Button>
      </div>
    </div>
  );
};

export default StorepointMap;
