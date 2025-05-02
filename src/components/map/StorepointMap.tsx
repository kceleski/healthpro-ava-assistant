
import React from 'react';

<div id="storepoint-container" data-map-id="1645a775a8a422"></div><script>(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);}());</script>// This component is a placeholder for a map that will show facilities
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
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg">
      <div className="text-center p-6">
        <div className="text-4xl mb-2">🗺️</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Map Component</h3>
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
