
import React, { useEffect, useRef } from 'react';

// This uses a simple UI while the GoogleMapsView component uses the Google Maps API
interface StorepointMapProps {
  facilities?: Array<{
    id: string;
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
  }>;
}

export function StorepointMap({ facilities = [] }: StorepointMapProps) {
  const storepointContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Storepoint script dynamically
    if (storepointContainerRef.current) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js';
      storepointContainerRef.current.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (storepointContainerRef.current) {
        const scripts = storepointContainerRef.current.getElementsByTagName('script');
        if (scripts.length > 0) {
          storepointContainerRef.current.removeChild(scripts[0]);
        }
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 rounded-lg">
      {/* Storepoint container */}
      <div 
        id="storepoint-container" 
        data-map-id="1645a775a8a422"
        ref={storepointContainerRef}
        className="w-full h-64 md:h-96"
      ></div>
      
      {/* Fallback content/info */}
      <div className="text-center p-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Facility Map</h3>
        <p className="text-sm text-gray-500">
          {facilities?.length > 0 
            ? `Displaying ${facilities.length} facilities on the map`
            : "No facilities to display on the map"}
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Note: Add VITE_GOOGLE_MAPS_API_KEY to your environment variables to enable Google Maps
        </p>
      </div>
    </div>
  );
}
