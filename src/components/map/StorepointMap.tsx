
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';
import AvaQuestionnaire, { QuestionnaireData } from './AvaQuestionnaire';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    SP: any;
    selectedLocation: any;
  }
}

const StorepointMap = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [mapInteractive, setMapInteractive] = useState(false);
  const [userPreferences, setUserPreferences] = useState<QuestionnaireData | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Handle form completion
  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setUserPreferences(data);
    setShowQuestionnaire(false);
    setMapInteractive(true);
    
    toast({
      title: "Preferences saved",
      description: "I'll highlight facilities that match your needs.",
    });
    
    // We'll apply the highlighting in the next useEffect
    console.log("User preferences:", data);
  };

  useEffect(() => {
    // Add StorePoint script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js';
    document.body.appendChild(script);

    // Wait for StorePoint to fully load
    const checkSP = setInterval(function() {
      if (typeof window.SP !== 'undefined') {
        clearInterval(checkSP);
        
        // Configure map display
        window.SP.options.maxLocations = 25; // Show 25 locations at a time
        window.SP.options.defaultView = 'map'; // Start with map view
        
        // Mobile-specific adjustments
        if (isMobile) {
          window.SP.options.markerSize = 'small'; // Smaller markers on mobile
          window.SP.options.infoWindowWidth = 280; // Smaller info windows
        }
        
        // Disable map interactions until questionnaire is completed
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
          
          // Apply highlighting based on user preferences if available
          if (userPreferences) {
            highlightMatchingFacilities(userPreferences);
          }
        }
        
        // Set up event listeners for location selection
        window.SP.on('markerClick', function(location: any) {
          console.log('Location selected:', location.name);
          window.selectedLocation = location;
        });
      }
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(checkSP);
      // Remove the script when component unmounts
      const storepointScript = document.querySelector('script[src="https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js"]');
      if (storepointScript) {
        storepointScript.remove();
      }
    };
  }, [mapInteractive, userPreferences, isMobile]);

  // Function to highlight matching facilities
  const highlightMatchingFacilities = (preferences: QuestionnaireData) => {
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
        if (preferences.careType === 'memory' && 
            (facilityName.includes('memory') || facilityDescription.includes('memory care'))) {
          isMatch = true;
        } else if (preferences.careType === 'assisted' && 
                  (facilityName.includes('assisted') || facilityDescription.includes('assisted living'))) {
          isMatch = true;
        } else if (preferences.careType === 'independent' && 
                  (facilityName.includes('independent') || facilityDescription.includes('independent living'))) {
          isMatch = true;
        } else if (preferences.careType === 'nursing' && 
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
      
      toast({
        title: "Map updated",
        description: "Matching facilities have been highlighted on the map.",
      });
    }, 2000);
  };

  return (
    <div className="relative">
      <div id="storepoint-container" data-map-id="1645a775a8a422" className="storepoint-map min-h-[60vh] md:min-h-[70vh]"></div>
      
      {userPreferences && (
        <div className={`absolute ${isMobile ? 'bottom-4 left-4 right-4' : 'top-4 left-4'} z-10 bg-white/90 p-3 rounded-lg shadow-lg text-sm`}>
          <div className="font-medium mb-1">Your Preferences:</div>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {userPreferences.careType === 'assisted' ? 'Assisted Living' : 
               userPreferences.careType === 'memory' ? 'Memory Care' :
               userPreferences.careType === 'independent' ? 'Independent Living' : 'Nursing Home'}
            </span>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {userPreferences.budget === 'low' ? '$2k-$4k' :
               userPreferences.budget === 'medium' ? '$4k-$6k' : '$6k+'}
            </span>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {userPreferences.location === 'urban' ? 'Urban' :
               userPreferences.location === 'suburban' ? 'Suburban' : 'Rural'}
            </span>
          </div>
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 mt-1 h-auto text-xs"
            onClick={() => setShowQuestionnaire(true)}
          >
            Change preferences
          </Button>
        </div>
      )}
      
      <div className={`absolute ${isMobile ? 'bottom-20 right-4' : 'bottom-4 right-4'} z-10`}>
        <Button className="shadow-lg">
          <MessageSquare className="h-4 w-4 mr-2" />
          Ask Ava about facilities
        </Button>
      </div>
      
      {/* Questionnaire Dialog */}
      <AvaQuestionnaire 
        open={showQuestionnaire} 
        onComplete={handleQuestionnaireComplete} 
      />
    </div>
  );
};

export default StorepointMap;
