
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';
import GoogleMapsView from '@/components/MapView'; // Make sure this path is correct
import { Card, CardContent } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; 
import { useIsMobile } from "@/hooks/use-mobile"; 
import { MessageSquare, Filter, MapPin, Save, RefreshCw, Loader2, List } from 'lucide-react';

// Define Facility type
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

// Placeholder Facility Card component
const FacilityCard = ({ facility }: { facility: Facility }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardContent className="p-4 flex flex-col flex-grow">
            {facility.photo && (
                <img
                    src={facility.photo}
                    alt={facility.name}
                    className="w-full h-32 object-cover rounded mb-3 flex-shrink-0"
                    onError={(e) => {
                        if (!e.currentTarget.src.includes('placehold.co')) {
                            e.currentTarget.src='https://placehold.co/300x200/cccccc/999999?text=No+Image';
                        } else {
                             e.currentTarget.style.display = 'none';
                        }
                    }}
                 />
            )}
            <h3 className="font-semibold text-base mb-1 text-blue-800 flex-shrink-0">{facility.name}</h3>
            <p className="text-xs text-gray-600 mb-2 flex-shrink-0">{facility.address}</p>
            <div className="text-xs text-gray-500 space-y-1 mb-3 flex-grow">
                {facility.type && <p>Type: {facility.type}</p>}
                {facility.rating && <p>Rating: {facility.rating} ★</p>}
                {facility.priceRange && <p>Price: {facility.priceRange}</p>}
            </div>
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-500 text-blue-700 hover:bg-blue-50 mt-auto flex-shrink-0">
                View Details
            </Button>
        </CardContent>
    </Card>
);

const SEARCH_FACILITIES_URL = '/api/search-facilities';

const FacilityMapPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // Fetch assessment data and trigger initial search
  useEffect(() => {
    setIsLoading(true);
    setHasSearched(false);
    const storedData = localStorage.getItem('assessmentData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAssessmentData(parsedData);
        console.log("Assessment data loaded:", parsedData);
        // Trigger search immediately after getting assessment data
        triggerSearch(parsedData);
      } catch (error) {
        console.error("Error parsing assessment data:", error);
        toast({ title: "Error", description: "Could not load search criteria.", variant: "destructive" });
        setIsLoading(false);
        navigate('/assessment');
      }
    } else {
      toast({
        title: "No Assessment Data",
        description: "Please complete an assessment first.",
        variant: "destructive",
      });
      navigate('/assessment');
    }
  }, [navigate, toast]);

  // Backend Search Function
  const triggerSearch = useCallback(async (criteria: any) => {
    if (!criteria) {
        console.warn("Search triggered without criteria.");
        setIsLoading(false);
        setHasSearched(true);
        setFacilities([]);
        return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setFacilities([]);
    console.log("Triggering backend search with criteria:", criteria);

    const searchPayload = {
        location: criteria.preferredLocation || criteria.location,
        careType: criteria.careType,
        budget: criteria.monthlyBudget,
        assistanceLevel: criteria.assistanceLevel,
        amenities: criteria.amenities,
    };
     
     Object.keys(searchPayload).forEach(key => (searchPayload[key] == null || searchPayload[key] === '') && delete searchPayload[key]);
     if (searchPayload.amenities && searchPayload.amenities.length === 0) {
         delete searchPayload.amenities;
     }

    try {
      console.log(`Calling backend: ${SEARCH_FACILITIES_URL} with payload:`, searchPayload);
      const response = await fetch(SEARCH_FACILITIES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Request failed with status ${response.status}` }));
        throw new Error(errorData.error || `Search failed: ${response.statusText}`);
      }

      const data: Facility[] = await response.json();
      console.log("Backend results received:", data);

      if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server.");
      }

      // For demo purposes, set mock facilities if none returned
      const facilitiesData = data.length ? data : getMockFacilities();
      setFacilities(facilitiesData);

      if (facilitiesData.length === 0) {
        toast({ title: "No Results", description: "No facilities found matching your criteria." });
      } else {
        toast({ title: "Search Complete", description: `Found ${facilitiesData.length} facilities.` });
      }

    } catch (error) {
      console.error("Error fetching facilities:", error);
      toast({
          title: "Search Error",
          description: error instanceof Error ? error.message : 'Could not fetch facilities.',
          variant: "destructive"
        });
      
      // For demo purposes, set mock facilities on error
      const mockData = getMockFacilities();
      setFacilities(mockData);
      toast({ title: "Using Demo Data", description: "Showing sample facilities for demonstration." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Function to get mock facilities for demonstration
  const getMockFacilities = (): Facility[] => {
    return [
      {
        id: "mock-1",
        name: "Golden Years Retirement Home",
        address: "123 Elder Ave, Phoenix, AZ 85001",
        latitude: 33.4484,
        longitude: -112.0740,
        type: "Assisted Living",
        rating: 4.5,
        phone: "(602) 555-1234"
      },
      {
        id: "mock-2",
        name: "Sunset Memory Care",
        address: "456 Senior Blvd, Scottsdale, AZ 85251",
        latitude: 33.5123,
        longitude: -111.9292,
        type: "Memory Care",
        rating: 4.2,
        phone: "(480) 555-2345"
      },
      {
        id: "mock-3",
        name: "Valley Independent Living",
        address: "789 Comfort Lane, Tempe, AZ 85281",
        latitude: 33.4255,
        longitude: -111.9400,
        type: "Independent Living",
        rating: 4.7,
        phone: "(480) 555-3456"
      }
    ];
  };

  // Event Handlers
  const handleNewSearch = () => {
    localStorage.removeItem('assessmentData');
    navigate('/assessment');
  };
  
  const handleSaveResults = () => {
    toast({ title: "Results Saved (Placeholder)", description: "Save functionality not yet implemented." });
  };
  
  const handleOpenChat = () => {
    navigate('/portal/ava');
  };
  
  const toggleView = () => {
    setShowMap(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header and Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
             <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-0 text-red-700">Matching Facilities</h1>
             <div className="flex flex-wrap items-center gap-2">
               <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={handleNewSearch} className="border-red-500 text-red-600 hover:bg-red-50">
                 <RefreshCw className="h-4 w-4 mr-2"/> New Search
               </Button>
               <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={handleSaveResults} className="border-blue-500 text-blue-600 hover:bg-blue-50">
                 <Save className="h-4 w-4 mr-2"/> Save Results
               </Button>
               <Button variant="default" size={isMobile ? "sm" : "default"} onClick={toggleView} className="bg-blue-600 hover:bg-blue-700">
                 {showMap ? <List className="h-4 w-4 mr-2"/> : <MapPin className="h-4 w-4 mr-2"/>}
                 {showMap ? "List View" : "Map View"}
               </Button>
               <Button size={isMobile ? "sm" : "default"} onClick={handleOpenChat} className="bg-red-600 hover:bg-red-700">
                 <MessageSquare className="h-4 w-4 mr-2"/> Chat with Ava
               </Button>
             </div>
          </div>

          {/* Search Criteria Summary Card */}
          {!isLoading && assessmentData && (
             <Card className="mb-6 bg-white shadow">
               <CardContent className="p-4 md:p-6">
                 <div className="flex justify-between items-start">
                   <div>
                     <h2 className="text-lg font-semibold mb-3 text-gray-700">Your Search Criteria</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm">
                       <p><strong className="text-gray-600">Care:</strong> {assessmentData.careType || 'Any'}</p>
                       <p><strong className="text-gray-600">Location:</strong> {assessmentData.preferredLocation || assessmentData.location || 'Any'}</p>
                       <p><strong className="text-gray-600">Budget:</strong> {assessmentData.monthlyBudget || 'Any'}</p>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
          )}

          {/* Loading Indicator for initial load */}
          {isLoading && (
              <Card className="mb-6">
                <CardContent className="p-4 md:p-6 flex items-center justify-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600"/>
                  <span className="ml-3 text-gray-600">Loading initial data and searching...</span>
                </CardContent>
              </Card>
          )}

          {/* Map or List View Area - Show only after initial load */}
          {!isLoading && (
              <div className="bg-white rounded-lg shadow overflow-hidden min-h-[600px]">
                {showMap ? (
                  <GoogleMapsView
                    facilities={facilities}
                    isLoading={false}
                    hasSearched={hasSearched}
                  />
                ) : (
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      {hasSearched ? `Showing ${facilities.length} Facilities` : 'Results List'}
                    </h3>
                    {hasSearched && facilities.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {facilities.map((facility) => (
                          <FacilityCard key={facility.id} facility={facility} />
                        ))}
                      </div>
                    )}
                    {hasSearched && facilities.length === 0 && (
                      <div className="text-center py-16 text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400"/>
                        No facilities found matching your criteria.
                        <Button variant="link" className="text-blue-600 block mx-auto mt-2" onClick={handleNewSearch}>
                          Try a new search?
                        </Button>
                      </div>
                    )}
                    {!hasSearched && (
                      <div className="text-center py-16 text-gray-500">
                        Please wait, searching based on assessment...
                      </div>
                    )}
                  </div>
                )}
              </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FacilityMapPage;
