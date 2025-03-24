
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    SP: any;
    selectedLocation: any;
  }
}

const StorepointMap = () => {
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
        
        // Set up event listeners for future Ava integration
        window.SP.on('markerClick', function(location: any) {
          console.log('Location selected:', location.name);
          // This will connect to our Ava AI in the future
          window.selectedLocation = location;
        });
        
        // Optional: Add custom controls to the map
        setTimeout(() => {
          const mapControls = document.querySelector('.storepoint-map-controls');
          if (mapControls) {
            const helpButton = document.createElement('button');
            helpButton.className = 'storepoint-custom-control';
            helpButton.innerHTML = 'Get Help';
            helpButton.onclick = function() {
              alert('Ava will assist you here soon');
            };
            mapControls.appendChild(helpButton);
          }
        }, 1000); // Give map controls time to render
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
  }, []);

  return (
    <div className="relative">
      <div id="storepoint-container" data-map-id="1645a775a8a422" className="storepoint-map"></div>
      <div className="absolute bottom-4 right-4 z-10">
        <Button className="shadow-lg">
          <MessageSquare className="h-4 w-4 mr-2" />
          Ask Ava about facilities
        </Button>
      </div>
    </div>
  );
};

export default StorepointMap;
