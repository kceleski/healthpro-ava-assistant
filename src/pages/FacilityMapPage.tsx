import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar'; // Assuming these exist
import Footer from '@/components/layout/Footer';
// *** IMPORT THE CORRECT MAP COMPONENT ***
import GoogleMapsView from '@/components/MapView'; // Make sure this path is correct for your GoogleMapsView component file
import { Card, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Assuming react-router
import { useToast } from "@/hooks/use-toast"; // Assuming custom hook
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming custom hook
import { MessageSquare, Filter, MapPin, Save, RefreshCw, Loader2, List } from 'lucide-react'; // Added List icon
import { PageHeader } from "@/components/PageHeader"; // Assuming this exists

// Define Facility type (should match backend response and GoogleMapsView prop)
// Make sure this aligns with the data structure your backend function returns
interface Facility {
  id: string; // Expecting Google Place ID from backend
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  phone?: string;
  website?: string;
  rating?: number;
  photo?: string; // URL from backend (e.g., constructed from Places API)
  priceRange?: string; // Note: Google Places API doesn't reliably provide this
  // Add any other relevant fields returned by your backend
}

// Placeholder Facility Card component - Implement this based on your design
// This is needed for the List View
const FacilityCard = ({ facility }: { facility: Facility }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"> {/* Ensure card takes full height */}
        <CardContent className="p-4 flex flex-col flex-grow"> {/* Allow content to grow */}
            {facility.photo && (
                <img
                    src={facility.photo}
                    alt={facility.name}
                    className="w-full h-32 object-cover rounded mb-3 flex-shrink-0" // Prevent image shrinking
                    onError={(e) => {
                        // Hide image on error and prevent infinite loops if placeholder also fails
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
            <div className="text-xs text-gray-500 space-y-1 mb-3 flex-grow"> {/* Allow details to take space */}
                {facility.type && <p>Type: {facility.type}</p>}
                {facility.rating && <p>Rating: {facility.rating} ★</p>}
                {facility.priceRange && <p>Price: {facility.priceRange}</p>}
            </div>
            {/* Add buttons for details, call, website etc. */}
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-500 text-blue-700 hover:bg-blue-50 mt-auto flex-shrink-0">
                View Details {/* Add onClick handler */}
            </Button>
        </CardContent>
    </Card>
);


// --- Backend Function URL (Replace with your actual deployed URL) ---
// *** UPDATED to point to the Google Places API function endpoint ***
const SEARCH_FACILITIES_URL = '/api/search-facilities'; // Or your specific deployed name


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
        navigate('/assessment'); // Navigate back if data is corrupted
      }
    } else {
      toast({
        title: "No Assessment Data",
        description: "Please complete an assessment first.",
        variant: "destructive",
      });
      navigate('/assessment'); // Redirect if no data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, toast]); // Run only once on mount

  // --- Backend Search Function ---
  const triggerSearch = useCallback(async (criteria: any) => {
    if (!criteria) {
        console.warn("Search triggered without criteria.");
        setIsLoading(false);
        setHasSearched(true); // Mark as searched even if no criteria
        setFacilities([]); // Ensure facilities are empty
        return;
    }

    setIsLoading(true);
    setHasSearched(true); // Mark that a search is being performed
    setFacilities([]); // Clear previous results
    console.log("Triggering backend search with criteria:", criteria);

    // Construct the payload expected by your backend function
    // *** IMPORTANT: Adjust these keys to match what your assessment page saves ***
    const searchPayload = {
        location: criteria.preferredLocation || criteria.location, // Use preferredLocation or fallback
        careType: criteria.careType,
        budget: criteria.monthlyBudget,
        assistanceLevel: criteria.assistanceLevel,
        amenities: criteria.amenities,
        // Add other relevant criteria your backend expects
    };
     // Clean payload: remove undefined/null keys before sending
     Object.keys(searchPayload).forEach(key => (searchPayload[key] == null || searchPayload[key] === '') && delete searchPayload[key]);
     if (searchPayload.amenities && searchPayload.amenities.length === 0) {
         delete searchPayload.amenities;
     }

    try {
      // Using the updated SEARCH_FACILITIES_URL which points to the Google Places backend function
      console.log(`Calling backend: ${SEARCH_FACILITIES_URL} with payload:`, searchPayload);
      const response = await fetch(SEARCH_FACILITIES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add Auth header if needed
            // 'Authorization': `Bearer YOUR_SUPABASE_ACCESS_TOKEN`
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Request failed with status ${response.status}` }));
        throw new Error(errorData.error || `Search failed: ${response.statusText}`);
      }

      const data: Facility[] = await response.json();
      console.log("Backend results received:", data);

      // Basic validation of received data (optional)
      if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server.");
      }

       // --- Geocoding Results (Client-Side) ---
       // Add this step IF your backend function doesn't return lat/lng
       // Otherwise, remove this if coords come directly from the backend
       const geocodedData = await geocodeResultsIfNeeded(data);
       setFacilities(geocodedData); // Update state with potentially geocoded results
       // --- End Geocoding Step ---

      // setFacilities(data); // Update state with results (use this line if backend returns coords)

      if (geocodedData.length === 0) { // Check geocodedData length
        toast({ title: "No Results", description: "No facilities found matching your criteria." });
      } else {
        toast({ title: "Search Complete", description: `Found ${geocodedData.length} facilities.` });
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


   // --- Client-Side Geocoding (Optional) ---
   // Use this only if your backend function doesn't return latitude/longitude
   const geocodeResultsIfNeeded = async (results: Facility[]): Promise<Facility[]> => {
       if (!results || results.length === 0) return [];

       // Check if the first result already has coordinates
       if (typeof results[0].latitude === 'number' && typeof results[0].longitude === 'number') {
           console.log("Coordinates already provided by backend.");
           return results; // Assume all have coords if the first one does
       }

       console.log("Geocoding results on client-side...");
       const geocoder = new window.google.maps.Geocoder();
       const geocodedResults = await Promise.all(
           results.map(async (facility) => {
               if ((!facility.latitude || !facility.longitude) && facility.address) {
                   try {
                       const response = await geocoder.geocode({ address: facility.address });
                       if (response.results && response.results[0]) {
                           const location = response.results[0].geometry.location;
                           return {
                               ...facility,
                               latitude: location.lat(),
                               longitude: location.lng(),
                           };
                       } else {
                           console.warn(`Geocoding failed for: ${facility.address}`);
                           return facility; // Return original if geocoding fails
                       }
                   } catch (error) {
                       console.error(`Geocoding error for ${facility.address}:`, error);
                       return facility; // Return original on error
                   }
               }
               return facility; // Return original if address missing or coords exist
           })
       );
       console.log("Client-side geocoding complete.");
       return geocodedResults;
   };
   // --- End Client-Side Geocoding ---


  // --- Event Handlers ---
  const handleNewSearch = () => { /* Keep as is */ localStorage.removeItem('assessmentData'); navigate('/assessment'); };
  const handleSaveResults = () => { /* Keep as is */ toast({ title: "Results Saved (Placeholder)", description: "Save functionality not yet implemented.", }); };
  const handleOpenChat = () => { /* Keep as is */ navigate('/portal/ava'); };
  const toggleView = () => { /* Keep as is */ setShowMap(prev => !prev); }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> {/* Light gray background */}
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header and Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
             {/* Keep Header/Buttons As Is */}
             <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-0 text-red-700">Matching Facilities</h1>
             <div className="flex flex-wrap items-center gap-2"><Button variant="outline" size={isMobile?"sm":"default"} onClick={handleNewSearch} className="border-red-500 text-red-600 hover:bg-red-50"><RefreshCw className="h-4 w-4 mr-2"/> New Search</Button><Button variant="outline" size={isMobile?"sm":"default"} onClick={handleSaveResults} className="border-blue-500 text-blue-600 hover:bg-blue-50"><Save className="h-4 w-4 mr-2"/> Save Results</Button><Button variant="default" size={isMobile?"sm":"default"} onClick={toggleView} className="bg-blue-600 hover:bg-blue-700">{showMap?<List className="h-4 w-4 mr-2"/>:<MapPin className="h-4 w-4 mr-2"/>}{showMap?"List View":"Map View"}</Button><Button size={isMobile?"sm":"default"} onClick={handleOpenChat} className="bg-red-600 hover:bg-red-700"><MessageSquare className="h-4 w-4 mr-2"/> Chat with Ava</Button></div>
          </div>

          {/* Search Criteria Summary Card */}
          {!isLoading && assessmentData && (
             /* Keep Criteria Card As Is */
             <Card className="mb-6 bg-white shadow"><CardContent className="p-4 md:p-6"><div className="flex justify-between items-start"><div><h2 className="text-lg font-semibold mb-3 text-gray-700">Your Search Criteria</h2><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm"><p><strong className="text-gray-600">Care:</strong> {assessmentData.careType||'Any'}</p><p><strong className="text-gray-600">Location:</strong> {assessmentData.preferredLocation||assessmentData.location||'Any'}</p><p><strong className="text-gray-600">Budget:</strong> {assessmentData.monthlyBudget||'Any'}</p></div></div></div></CardContent></Card>
          )}

          {/* Loading Indicator for initial load */}
          {isLoading && (
              /* Keep Loading Indicator As Is */
              <Card className="mb-6"><CardContent className="p-4 md:p-6 flex items-center justify-center h-24"><Loader2 className="h-6 w-6 animate-spin text-blue-600"/><span className="ml-3 text-gray-600">Loading initial data and searching...</span></CardContent></Card>
          )}

          {/* Map or List View Area - Show only after initial load */}
          {!isLoading && (
              <div className="bg-white rounded-lg shadow overflow-hidden min-h-[600px]"> {/* Ensure container has min height */}
                 {showMap ? (
                    <GoogleMapsView
                        facilities={facilities} // Pass potentially geocoded facilities
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
                             /* Keep No Results View As Is */
                             <div className="text-center py-16 text-gray-500"><MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400"/>No facilities found matching your criteria.<Button variant="link" className="text-blue-600 block mx-auto mt-2" onClick={handleNewSearch}>Try a new search?</Button></div>
                         )}
                         {!hasSearched && (
                              /* Keep Initial State View As Is */
                              <div className="text-center py-16 text-gray-500">Please wait, searching based on assessment...</div>
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
