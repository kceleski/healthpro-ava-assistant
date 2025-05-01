
import React from 'react';

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
      </div>
    </div>
  );
}
