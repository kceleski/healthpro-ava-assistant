import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Facility object type
interface Facility {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type?: string;
  phone?: string;
  website?: string;
  rating?: number;
  photo?: string;
}

const FacilityMapPage = () => {
  // Sample facilities data
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: '1',
      name: 'Sunny Pines Care Center',
      address: '123 Pine Street, Phoenix, AZ 85001',
      latitude: 33.4484,
      longitude: -112.074,
      type: 'Assisted Living',
      phone: '(602) 555-1234',
      website: 'sunnypines.com',
      rating: 4.5,
      photo: 'https://placehold.co/300x200?text=Sunny+Pines'
    },
    {
      id: '2',
      name: 'Golden Years Retirement Home',
      address: '456 Oak Avenue, Phoenix, AZ 85004',
      latitude: 33.4539,
      longitude: -112.0691,
      type: 'Independent Living',
      phone: '(602) 555-5678',
      website: 'goldenyears.com',
      rating: 4.2,
      photo: 'https://placehold.co/300x200?text=Golden+Years'
    },
    {
      id: '3',
      name: 'Serene Valley Care Facility',
      address: '789 Maple Road, Phoenix, AZ 85006',
      latitude: 33.4602,
      longitude: -112.0645,
      type: 'Memory Care',
      phone: '(602) 555-9012',
      website: 'serenevalley.com',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Tranquil Gardens Senior Living',
      address: '101 Elm Street, Phoenix, AZ 85008',
      latitude: 33.4484,
      longitude: -112.0599,
      type: 'Assisted Living',
      phone: '(602) 555-3456',
      website: 'tranquilgardens.com',
      rating: 4.0,
      photo: 'https://placehold.co/300x200?text=Tranquil+Gardens'
    },
    {
      id: '5',
      name: 'Sunset Manor',
      address: '202 Willow Lane, Phoenix, AZ 85020',
      latitude: 33.4637,
      longitude: -112.0822,
      type: 'Nursing Home',
      phone: '(602) 555-7890',
      website: 'sunsetmanor.com',
      rating: 3.9
    },
    {
      id: '6',
      name: 'Riverside Retirement Community',
      address: '303 River Road, Phoenix, AZ 85040',
      latitude: 33.4246,
      longitude: -112.0684,
      type: 'Independent Living',
      phone: '(602) 555-2345',
      website: 'riversideretirement.com',
      rating: 4.3,
      photo: 'https://placehold.co/300x200?text=Riverside'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true); // Set to true to show the map by default
  const storepointContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Storepoint map
  useEffect(() => {
    if (storepointContainerRef.current) {
      // Create script element dynamically
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.storepoint.co/api/v1/js/1645a775a8a422.js';
      
      // Append script to the container
      storepointContainerRef.current.appendChild(script);
      
      // Clean up function to remove script when component unmounts
      return () => {
        if (storepointContainerRef.current && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Care Facilities</h1>
      
      {/* Search criteria summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Search Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Care Type:</span>
            <p className="text-gray-800">Assisted Living</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Location:</span>
            <p className="text-gray-800">Phoenix, AZ (within 15 miles)</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Budget:</span>
            <p className="text-gray-800">$4,000 - $5,000 / month</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.slice(0, 6).map((facility) => (
            <Card key={facility.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                {facility.photo && (
                  <img
                    src={facility.photo}
                    alt={facility.name}
                    className="w-full h-40 object-cover rounded mb-3"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image';
                    }}
                  />
                )}
                <h3 className="text-lg font-semibold text-blue-700">{facility.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                <p className="text-sm text-gray-500 mb-1">Type: {facility.type || 'N/A'}</p>
                {facility.rating && <p className="text-sm text-yellow-600 mb-1">★ {facility.rating}</p>}
                <a
                  href={facility.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-sm text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Interactive Map */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Facility Map</h2>
        <div className="bg-white rounded-xl shadow-sm p-2">
          {/* Storepoint Map Container */}
          <div className="h-[600px]">
            <div 
              id="storepoint-container" 
              data-tags="subscribed" 
              data-map-id="1645a775a8a422"
              ref={storepointContainerRef}
              className="w-full h-full"
            ></div>
            <style>
              {`
                #storepoint-tag-dropdown {
                  display: none !important;
                }
              `}
            </style>
          </div>
        </div>
      </div>
    </main>
  );
};

// Add default export
export default FacilityMapPage;
