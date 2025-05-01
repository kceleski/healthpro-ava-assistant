
import React from 'react';
import { Loader2, Map as MapIcon } from 'lucide-react';
import StorepointMap from './map/StorepointMap';

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
  facilities: Facility[];
  isLoading: boolean;
  hasSearched: boolean;
}

const GoogleMapsView = ({ facilities, isLoading, hasSearched }: GoogleMapsViewProps) => {
  return (
    <div className="relative w-full h-[600px]">
      {/* Storepoint Map wrapper */}
      {!isLoading && hasSearched && (
        <StorepointMap />
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
            <p className="mt-2 text-muted-foreground text-center">Loading facilities...</p>
          </div>
        </div>
      )}
      
      {/* No search performed yet */}
      {!isLoading && !hasSearched && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 rounded-lg">
          <MapIcon className="h-16 w-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-600">Search for facilities to see them on the map</p>
          <p className="text-sm text-gray-500">Your search results will appear here</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsView;
