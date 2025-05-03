import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Building, Star, Navigation, 
  Phone, Globe, Filter, Info, ChevronDown 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleMapsView from '@/components/MapView';

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
  priceRange?: string;
  isFeatured?: boolean;
  description?: string;
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
      photo: 'https://placehold.co/300x200?text=Sunny+Pines',
      priceRange: "$3,500 - $5,500",
      isFeatured: true,
      description: "A vibrant community offering personalized care in a comfortable setting. Features include beautiful gardens, social activities, and a dedicated care staff."
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
      photo: 'https://placehold.co/300x200?text=Golden+Years',
      priceRange: "$2,800 - $4,000",
      isFeatured: true,
      description: "An active senior community with resort-style amenities. Residents enjoy independence with optional support services as needed."
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
      rating: 4.7,
      priceRange: "$4,200 - $6,200",
      isFeatured: false,
      description: "Specialized memory care in a secure, nurturing environment with a high staff-to-resident ratio for personalized attention."
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
      photo: 'https://placehold.co/300x200?text=Tranquil+Gardens',
      priceRange: "$3,200 - $4,800",
      isFeatured: false,
      description: "Comfortable assisted living with a focus on wellness and independence. Features restaurant-style dining and engaging activities."
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
      rating: 3.9,
      priceRange: "$5,200 - $7,500",
      isFeatured: true,
      description: "Comprehensive skilled nursing care with rehabilitation services and 24/7 medical supervision."
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
      photo: 'https://placehold.co/300x200?text=Riverside',
      priceRange: "$2,500 - $3,800",
      isFeatured: false,
      description: "A vibrant community for active seniors with social events, fitness programs, and beautiful riverside views."
    }
  ]);

  const [currentView, setCurrentView] = useState('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityType, setFacilityType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);

  // Filter facilities based on search
  useEffect(() => {
    if (hasSearched) {
      const filtered = facilities.filter(facility => {
        // Filter by search query
        const matchesSearch = 
          searchQuery === '' || 
          facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.type?.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filter by facility type
        const matchesType = 
          facilityType === 'all' || 
          facility.type?.toLowerCase().includes(facilityType.toLowerCase());
        
        return matchesSearch && matchesType;
      });
      
      setFilteredFacilities(filtered);
    } else {
      // Show featured facilities when no search performed
      setFilteredFacilities(facilities.filter(f => f.isFeatured));
    }
  }, [searchQuery, facilityType, facilities, hasSearched]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setHasSearched(true);
      setIsLoading(false);
    }, 500);
  };

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
                    <SelectItem value="assisted living">Assisted Living</SelectItem>
                    <SelectItem value="independent living">Independent Living</SelectItem>
                    <SelectItem value="memory care">Memory Care</SelectItem>
                    <SelectItem value="nursing home">Nursing Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="px-8" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search Facilities"}
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
              <p className="text-gray-800">{filteredFacilities.length} facilities found</p>
            </div>
          </div>
        </div>
      )}
      
      {/* View Toggle */}
      <div className="mb-6">
        <Tabs defaultValue="cards" onValueChange={setCurrentView}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <span className="text-sm text-muted-foreground">
              Showing {filteredFacilities.length} {hasSearched ? "results" : "featured facilities"}
            </span>
          </div>
          
          {/* Card View */}
          <TabsContent value="cards" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-slate-100 h-40 flex items-center justify-center">
                    {facility.photo ? (
                      <img 
                        src={facility.photo} 
                        alt={facility.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image';
                        }}
                      />
                    ) : (
                      <Building className="h-16 w-16 text-slate-400" />
                    )}
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
                      <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                        <span className="text-xs font-medium">{facility.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex mt-3">
                      <Badge className="mr-2">{facility.type}</Badge>
                      {facility.isFeatured && (
                        <Badge variant="outline" className="bg-amber-50">Featured</Badge>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {facility.description || "Senior living facility offering personalized care and amenities."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium">{facility.priceRange}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Map View */}
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardContent className="p-0 h-[600px]">
                <GoogleMapsView
                  facilities={filteredFacilities}
                  isLoading={isLoading}
                  hasSearched={hasSearched || filteredFacilities.length > 0}
                  isVisible={currentView === 'map'}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
                <Button variant="outline" className="sm:w-auto">
                  <Info className="h-4 w-4 mr-2" />
                  Learn More
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
