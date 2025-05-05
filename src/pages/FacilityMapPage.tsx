
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Building, Star, Navigation, 
  Phone, Globe, Filter, Info, ChevronDown, Loader2,
  ExternalLink
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StorepointMap } from '@/components/map/StorepointMap';
import { useFacilitySearch } from '@/hooks/useFacilities';
import { type Facility } from '@/services/facilityService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const FacilityMapPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityType, setFacilityType] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Set default values for search
  const initialSearchParams = {
    limit: 20,
  };
  
  // Use React Query to fetch facilities
  const { 
    data: facilities = [], 
    isLoading, 
    isError, 
    refetch 
  } = useFacilitySearch(
    initialSearchParams,
    true // Start with enabled to show some initial data
  );

  // Handle search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = {
      query: searchQuery,
      type: facilityType !== 'all' ? facilityType : undefined,
      limit: 50
    };
    
    try {
      await refetch();
      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Error searching facilities');
    }
  };

  // Handle opening Google Maps with all facilities
  const handleOpenInMaps = () => {
    // Create a query string with all facility addresses
    const locations = displayFacilities.map(f => f.address).join('|');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('senior living')}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening Google Maps with facility locations');
  };

  // If no facilities are present in the database, use the hardcoded demo data
  const useDemoData = facilities.length === 0;
  
  // Hardcoded demo data for when DB is empty
  const demoFacilities: Facility[] = [
    {
      id: '1',
      name: 'Sunny Pines Care Center',
      address: '123 Pine Street, Phoenix, AZ 85001',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Assisted Living',
      phone: '(602) 555-1234',
      website: 'sunnypines.com',
      rating: 4.5,
      latitude: 33.4484,
      longitude: -112.074,
      price_min: 3500,
      price_max: 5500
    },
    {
      id: '2',
      name: 'Golden Years Retirement Home',
      address: '456 Oak Avenue, Phoenix, AZ 85004',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Independent Living',
      phone: '(602) 555-5678',
      website: 'goldenyears.com',
      rating: 4.2,
      latitude: 33.4539,
      longitude: -112.0691,
      price_min: 2800,
      price_max: 4000
    },
    {
      id: '3',
      name: 'Serene Valley Care Facility',
      address: '789 Maple Road, Phoenix, AZ 85006',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Memory Care',
      phone: '(602) 555-9012',
      website: 'serenevalley.com',
      rating: 4.7,
      latitude: 33.4602,
      longitude: -112.0645,
      price_min: 4200,
      price_max: 6200
    },
    {
      id: '4',
      name: 'Tranquil Gardens Senior Living',
      address: '101 Elm Street, Phoenix, AZ 85008',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Assisted Living',
      phone: '(602) 555-3456',
      website: 'tranquilgardens.com',
      rating: 4.0,
      latitude: 33.4484,
      longitude: -112.0599,
      price_min: 3200,
      price_max: 4800
    },
    {
      id: '5',
      name: 'Sunset Manor',
      address: '202 Willow Lane, Phoenix, AZ 85020',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Nursing Home',
      phone: '(602) 555-7890',
      website: 'sunsetmanor.com',
      rating: 3.9,
      latitude: 33.4637,
      longitude: -112.0822,
      price_min: 5200,
      price_max: 7500
    },
    {
      id: '6',
      name: 'Riverside Retirement Community',
      address: '303 River Road, Phoenix, AZ 85040',
      city: 'Phoenix',
      state: 'AZ',
      type: 'Independent Living',
      phone: '(602) 555-2345',
      website: 'riversideretirement.com',
      rating: 4.3,
      latitude: 33.4246,
      longitude: -112.0684,
      price_min: 2500,
      price_max: 3800
    }
  ];

  // Choose which facilities to display based on database content
  const displayFacilities = useDemoData ? demoFacilities : facilities;
  
  // If we're using demo data and there's no error loading, show a message
  useEffect(() => {
    if (useDemoData && !isLoading && !isError && hasSearched) {
      toast.info("Using demo data - no facilities found in database");
    }
  }, [useDemoData, isLoading, isError, hasSearched]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Care Facilities</h1>
        <p className="text-gray-600">
          Search our database of over 30,000 senior care facilities to find the perfect match for your needs.
        </p>
      </div>
      
      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by facility name, location, or zip code" 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select value={facilityType} onValueChange={setFacilityType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Facility Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Facility Types</SelectItem>
                    <SelectItem value="Assisted Living">Assisted Living</SelectItem>
                    <SelectItem value="Independent Living">Independent Living</SelectItem>
                    <SelectItem value="Memory Care">Memory Care</SelectItem>
                    <SelectItem value="Nursing Home">Nursing Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="px-8" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search Facilities"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Search criteria summary if searched */}
      {hasSearched && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Search Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Location/Name:</span>
              <p className="text-gray-800">{searchQuery || "Any"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Facility Type:</span>
              <p className="text-gray-800">{facilityType === 'all' ? 'All Types' : facilityType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Results:</span>
              <p className="text-gray-800">{displayFacilities.length} facilities found</p>
            </div>
          </div>

          {displayFacilities.length > 0 && (
            <div className="mt-4">
              <Button 
                onClick={handleOpenInMaps}
                variant="outline"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                <span>View All Facilities in Google Maps</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Facility List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Facilities</h2>
          <span className="text-sm text-muted-foreground">
            Showing {displayFacilities.length} {hasSearched ? "results" : "facilities"}
            {useDemoData && " (demo data)"}
          </span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading facilities...</span>
          </div>
        ) : displayFacilities.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No Facilities Found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Try adjusting your search criteria or adding new facilities to the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayFacilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-100 h-40 flex items-center justify-center">
                  <Building className="h-16 w-16 text-slate-400" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{facility.address}</span>
                      </div>
                    </div>
                    {facility.rating && (
                      <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                        <span className="text-xs font-medium">{facility.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex mt-3">
                    <Badge className="mr-2">{facility.type}</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Senior living facility offering personalized care and amenities.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div>
                      {facility.price_min && facility.price_max ? (
                        <>
                          <p className="text-sm font-medium">${facility.price_min?.toLocaleString()} - ${facility.price_max?.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Price unavailable</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => {
                        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`;
                        window.open(mapUrl, '_blank', 'noopener,noreferrer');
                      }}>
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        Map
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-sm">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need personalized assistance?</h2>
              <p className="text-gray-600 mb-6">
                Our care advisors can help you navigate the process of finding the perfect facility for your loved one. 
                We offer free consultations and tours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="sm:w-auto">
                  <Phone className="h-4 w-4 mr-2" />
                  Request a Call
                </Button>
                <Button variant="outline" className="sm:w-auto" onClick={() => navigate('/assessment')}>
                  <Info className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-md max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">HealthPro Assist Reviews</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-sm ml-2">4.9/5 (250+ reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm italic text-gray-600">
                  "HealthPro Assist made finding care for my mother so much easier. Their team was compassionate and helped us every step of the way."
                </p>
                <p className="text-sm font-medium mt-2">- Maria S., Phoenix</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default FacilityMapPage;
