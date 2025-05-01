import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar'; // Assuming these exist
import Footer from '@/components/layout/Footer';
import GoogleMapsView from '@/components/MapView'; // Import the GoogleMapsView component
import { Card, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Assuming react-router
import { useToast } from "@/hooks/use-toast"; // Assuming custom hook
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming custom hook
import { MessageSquare, Filter, MapPin, Save, RefreshCw, Loader2, List } from 'lucide-react'; // Added List icon
import { PageHeader } from "@/components/PageHeader"; // Assuming this exists

// Define Facility type (should match backend response and GoogleMapsView prop)
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
  // Add any other fields returned by your backend/SerpApi function
}

// Placeholder Facility Card component - Implement this based on your design
const FacilityCard = ({ facility }: { facility: Facility }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
            {facility.photo && (
                <img src={facility.photo} alt={facility.name} className="w-full h-32 object-cover rounded mb-3" onError={(e) => (e.currentTarget.style.display = 'none')} />
            )}
            <h3 className="font-semibold text-base mb-1 text-blue-800">{facility.name}</h3>
            <p className="text-xs text-gray-600 mb-2">{facility.address}</p>
            {facility.type && <p className="text-xs text-gray-500 mb-1">Type: {facility.type}</p>}
            {facility.rating && <p className="text-xs text-gray-500 mb-1">Rating: {facility.rating} ★</p>}
            {facility.priceRange && <p className="text-xs text-gray-500 mb-3">Price: {facility.priceRange}</p>}
            {/* Add buttons for details, call, website etc. */}
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-500 text-blue-700 hover:bg-blue-50">View Details</Button>
        </CardContent>
    </Card>
);


// --- Backend Function URL (Replace with your actual deployed URL) ---
// Using the SerpApi function example URL
const SEARCH_FACILITIES_URL = '/api/search-facilities-serpapi'; // Or '/api/ai-search' etc.


const FacilityMapPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [assessmentData, setAssessmentData] = useState<any>(null); // Criteria from previous step
  const [facilities, setFacilities] = useState<Facility[]>([]); // Results from backend
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial assessment + search
  const [hasSearched, setHasSearched] = useState(false); // Track if search was triggered
  const [showMap, setShowMap] = useState(true); // Show map by default

  // Fetch assessment data and trigger initial search
  useEffect(() => {
    setIsLoading(true);
    setHasSearched(false); // Reset search status on mount
    const storedData = localStorage.getItem('assessmentData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAssessmentData(parsedData);
        // Trigger search immediately after getting assessment data
        triggerSearch(parsedData);
      } catch (error) {
        console.error("Error parsing assessment data:", error);
        toast({ title: "Error", description: "Could not load search criteria.", variant: "destructive" });
        setIsLoading(false);
        // Optionally navigate back if data is crucial
        // navigate('/assessment');
      }
    } else {
      toast({
        title: "No Assessment Data",
        description: "Please complete an assessment first.",
        variant: "destructive",
      });
      navigate('/assessment'); // Redirect if no data
    }
    // No cleanup needed for this effect's dependencies
  }, [navigate, toast]); // Run only once on mount

  // --- Backend Search Function ---
  const triggerSearch = useCallback(async (criteria: any) => {
    if (!criteria) {
        console.warn("Search triggered without criteria.");
        setIsLoading(false); // Stop loading if no criteria
        return;
    }

    setIsLoading(true);
    setHasSearched(true); // Mark that a search is being performed
    setFacilities([]); // Clear previous results
    console.log("Triggering backend search with criteria:", criteria);

    // Construct the payload expected by your backend function
    // Adapt this based on the specific keys your assessment page saves
    const searchPayload = {
        location: criteria.preferredLocation, // Example mapping
        careType: criteria.careType,         // Example mapping
        budget: criteria.monthlyBudget,     // Example mapping
        // Map other fields like amenities, assistanceLevel if needed
    };

    try {
      console.log(`Calling backend: ${SEARCH_FACILITIES_URL}`);
      const response = await fetch(SEARCH_FACILITIES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add Auth header if needed
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || `Search failed: ${response.statusText}`);
      }

      const data: Facility[] = await response.json(); // Expecting array of Facility
      console.log("Backend results received:", data);
      setFacilities(data); // Update state with results
      if (data.length === 0) {
        toast({ title: "No Results", description: "No facilities found matching your criteria." });
      } else {
        toast({ title: "Search Complete", description: `Found ${data.length} facilities.` });
      }

    } catch (error) {
      console.error("Error fetching facilities:", error);
      toast({
          title: "Search Error",
          description: error instanceof Error ? error.message : 'Could not fetch facilities.',
          variant: "destructive"
        });
      setFacilities([]); // Clear results on error
    } finally {
      setIsLoading(false); // Ensure loading stops
    }
  }, [toast]); // Include dependencies used inside useCallback

  // --- Event Handlers ---
  const handleNewSearch = () => {
    navigate('/assessment'); // Navigate back to the assessment/form page
  };

  const handleSaveResults = () => {
    // Implement saving logic (e.g., save 'facilities' state to user profile via API)
    toast({
      title: "Results Saved (Placeholder)",
      description: "Your search results have been saved.", // Update when implemented
    });
    // Optionally navigate to dashboard
    // navigate('/portal/dashboard');
  };

  const handleOpenChat = () => {
    // Implement logic to open chat interface, potentially passing current context
    navigate('/portal/ava'); // Example navigation
  };

  const toggleView = () => {
      setShowMap(prev => !prev);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> {/* Light gray background */}
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header and Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-0 text-red-700"> {/* Red Header */}
              Matching Facilities
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleNewSearch}
                className="border-red-500 text-red-600 hover:bg-red-50" // Red outline button
              >
                <RefreshCw className="h-4 w-4 mr-2" /> New Search
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleSaveResults}
                className="border-blue-500 text-blue-600 hover:bg-blue-50" // Blue outline button
              >
                <Save className="h-4 w-4 mr-2" /> Save Results
              </Button>
               <Button
                variant="default" // Primary button for main actions
                size={isMobile ? "sm" : "default"}
                onClick={toggleView}
                className="bg-blue-600 hover:bg-blue-700" // Blue primary button
              >
                 {showMap ? <List className="h-4 w-4 mr-2" /> : <MapPin className="h-4 w-4 mr-2" />}
                 {showMap ? "List View" : "Map View"}
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                onClick={handleOpenChat}
                className="bg-red-600 hover:bg-red-700" // Red primary button
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Chat with Ava
              </Button>
            </div>
          </div>

          {/* Search Criteria Summary Card */}
          {assessmentData && !isLoading && ( // Show only if data loaded and not loading search results
            <Card className="mb-6 bg-white shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">Your Search Criteria</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm">
                      <p><strong className="text-gray-600">Care:</strong> {assessmentData.careType || 'Any'}</p>
                      <p><strong className="text-gray-600">Location:</strong> {assessmentData.preferredLocation || 'Any'}</p>
                      <p><strong className="text-gray-600">Budget:</strong> {assessmentData.monthlyBudget || 'Any'}</p>
                      {/* Add more criteria display if needed */}
                    </div>
                  </div>
                  {/* Optional: Add edit/filter button */}
                  {/* <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                    <Filter className="h-4 w-4" />
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map or List View Area */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
             {showMap ? (
                <GoogleMapsView
                    facilities={facilities}
                    isLoading={isLoading} // Pass loading state to map
                    hasSearched={hasSearched}
                />
             ) : (
                <div className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        {isLoading ? 'Loading Results...' : `Showing ${facilities.length} Facilities`}
                    </h3>
                    {isLoading && (
                         <div className="flex items-center justify-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                         </div>
                    )}
                    {!isLoading && facilities.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                            {facilities.map((facility) => (
                                <FacilityCard key={facility.id} facility={facility} />
                            ))}
                        </div>
                    )}
                     {!isLoading && hasSearched && facilities.length === 0 && (
                        <div className="text-center py-16 text-gray-500">
                            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            No facilities found matching your criteria. Try adjusting your search.
                        </div>
                    )}
                     {!isLoading && !hasSearched && (
                         <div className="text-center py-16 text-gray-500">
                             Loading search criteria...
                         </div>
                     )}
                </div>
             )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FacilityMapPage;
