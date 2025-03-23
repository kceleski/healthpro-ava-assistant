
import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, Filter, MapPin, Building, Star, Phone, Mail, 
  Users, Bed, DollarSign, Check, X, ArrowUpDown, ChevronDown, Clock
} from 'lucide-react';

const Facilities = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(true);
  
  // Dummy data for Arizona facilities
  const arizonaFacilities = [
    {
      id: 1,
      name: 'Desert Bloom Senior Living',
      address: '123 Palm Avenue, Phoenix, AZ 85001',
      type: 'Assisted Living',
      availableBeds: 3,
      rating: 4.8,
      pricing: '$3,500 - $5,200/month',
      amenities: ['24/7 Staff', 'Memory Care', 'Transportation', 'Pool', 'Fitness Center'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,1',
      acceptsMedicaid: true,
      acceptsMedicare: false,
      minDistance: 0,
      maxDistance: 5,
      contactPhone: '(602) 555-1234',
      contactEmail: 'info@desertbloomsl.com',
    },
    {
      id: 2,
      name: 'Sunrise of Scottsdale',
      address: '456 Camelback Road, Scottsdale, AZ 85251',
      type: 'Memory Care',
      availableBeds: 2,
      rating: 4.6,
      pricing: '$4,800 - $6,500/month',
      amenities: ['Memory Care Specialists', 'Secured Areas', 'Art Therapy', 'Garden', 'Private Dining'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,2',
      acceptsMedicaid: false,
      acceptsMedicare: true,
      minDistance: 5,
      maxDistance: 10,
      contactPhone: '(480) 555-5678',
      contactEmail: 'care@sunrisescottsdale.com',
    },
    {
      id: 3,
      name: 'Mesa Gardens',
      address: '789 Cactus Lane, Mesa, AZ 85213',
      type: 'Independent Living',
      availableBeds: 5,
      rating: 4.9,
      pricing: '$2,800 - $4,200/month',
      amenities: ['Community Events', 'Golf Course', 'Fitness Center', 'Library', 'Hobby Rooms'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,3',
      acceptsMedicaid: false,
      acceptsMedicare: false,
      minDistance: 10,
      maxDistance: 15,
      contactPhone: '(480) 555-9012',
      contactEmail: 'residents@mesagardens.com',
    },
    {
      id: 4,
      name: 'Arizona Sunset Care',
      address: '321 Desert Drive, Tempe, AZ 85281',
      type: 'Nursing Home',
      availableBeds: 1,
      rating: 4.7,
      pricing: '$5,200 - $7,800/month',
      amenities: ['24/7 Nursing', 'Physical Therapy', 'Occupational Therapy', 'Special Diets', 'Pain Management'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,4',
      acceptsMedicaid: true,
      acceptsMedicare: true,
      minDistance: 0,
      maxDistance: 5,
      contactPhone: '(480) 555-3456',
      contactEmail: 'care@arizonasunset.com',
    },
    {
      id: 5,
      name: 'Grand Canyon Village',
      address: '555 Mountain View Ave, Flagstaff, AZ 86001',
      type: 'Assisted Living',
      availableBeds: 4,
      rating: 4.5,
      pricing: '$3,800 - $5,500/month',
      amenities: ['Mountain Views', 'Transportation', 'Wellness Programs', 'Pet Friendly', 'Religious Services'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,5',
      acceptsMedicaid: true,
      acceptsMedicare: false,
      minDistance: 20,
      maxDistance: 30,
      contactPhone: '(928) 555-7890',
      contactEmail: 'info@gcvillage.com',
    },
    {
      id: 6,
      name: 'Tucson Retirement Oasis',
      address: '888 Saguaro Street, Tucson, AZ 85701',
      type: 'Independent Living',
      availableBeds: 7,
      rating: 4.4,
      pricing: '$2,500 - $4,000/month',
      amenities: ['Swimming Pool', 'Desert Gardens', 'Art Studio', 'Movie Theater', 'Community Kitchen'],
      imageSrc: 'https://source.unsplash.com/random/300x200/?senior-living,6',
      acceptsMedicaid: false,
      acceptsMedicare: false,
      minDistance: 30,
      maxDistance: 40,
      contactPhone: '(520) 555-2345',
      contactEmail: 'living@tucsonoasis.com',
    },
  ];
  
  const facilityTypes = [
    { id: 'assisted', label: 'Assisted Living' },
    { id: 'memory', label: 'Memory Care' },
    { id: 'nursing', label: 'Nursing Home' },
    { id: 'independent', label: 'Independent Living' },
  ];
  
  return (
    <PortalLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Arizona Facilities</h1>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="border rounded-md flex overflow-hidden">
              <Button 
                size="sm" 
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => setViewMode('map')}
              >
                Map
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filterOpen && (
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your facility search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Facility Type</label>
                  <div className="space-y-2">
                    {facilityTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox id={type.id} />
                        <label htmlFor={type.id} className="text-sm">{type.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="py-4">
                    <Slider defaultValue={[2500, 6000]} min={1500} max={8000} step={100} />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">$1,500</span>
                      <span className="text-xs text-muted-foreground">$8,000+</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Distance (miles)</label>
                  <div className="py-4">
                    <Slider defaultValue={[20]} min={0} max={50} step={5} />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">0 mi</span>
                      <span className="text-xs text-muted-foreground">50 mi</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Accepted</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="medicaid" />
                      <label htmlFor="medicaid" className="text-sm">Medicaid</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="medicare" />
                      <label htmlFor="medicare" className="text-sm">Medicare</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="private" />
                      <label htmlFor="private" className="text-sm">Private Pay</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="longterm" />
                      <label htmlFor="longterm" className="text-sm">Long-term Care Insurance</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Amenities</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pool" />
                      <label htmlFor="pool" className="text-sm">Swimming Pool</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fitness" />
                      <label htmlFor="fitness" className="text-sm">Fitness Center</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transport" />
                      <label htmlFor="transport" className="text-sm">Transportation</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pets" />
                      <label htmlFor="pets" className="text-sm">Pet Friendly</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="memory" />
                      <label htmlFor="memory" className="text-sm">Memory Care</label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Reset Filters</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className={`${filterOpen ? 'md:col-span-3' : 'md:col-span-4'}`}>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search facilities by name, location, or amenities..." 
                      className="w-full" 
                      prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline">
                      Ask Ava <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Facilities</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="available">Available Now</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Rating <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="all" className="m-0">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {arizonaFacilities.map((facility) => (
                      <Card key={facility.id} className="overflow-hidden">
                        <div className="relative h-40">
                          <img 
                            src={facility.imageSrc} 
                            alt={facility.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-white text-primary hover:bg-white">
                              {facility.availableBeds} beds available
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{facility.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {facility.address}
                              </div>
                            </div>
                            <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                              <Star className="h-3 w-3 text-amber-500 mr-1" />
                              <span className="text-sm font-medium text-amber-700">{facility.rating}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <Badge variant="outline">{facility.type}</Badge>
                            <div className="flex items-center mt-2">
                              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                              <span className="text-sm">{facility.pricing}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {facility.amenities.slice(0, 3).map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {facility.amenities.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{facility.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between p-4 pt-0">
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">View Details</Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>{facility.name}</DialogTitle>
                                  <DialogDescription>{facility.address}</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <img 
                                      src={facility.imageSrc} 
                                      alt={facility.name}
                                      className="w-full h-64 object-cover rounded-md"
                                    />
                                    <div className="mt-4 space-y-3">
                                      <div className="flex items-center">
                                        <Building className="h-5 w-5 text-muted-foreground mr-2" />
                                        <span>{facility.type}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Star className="h-5 w-5 text-amber-500 mr-2" />
                                        <span>{facility.rating} out of 5</span>
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                                        <span>{facility.pricing}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Bed className="h-5 w-5 text-blue-600 mr-2" />
                                        <span>{facility.availableBeds} beds available</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-red-600 mr-2" />
                                        <span>{facility.minDistance}-{facility.maxDistance} miles from Phoenix</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="font-medium mb-2">Amenities</h3>
                                      <div className="grid grid-cols-2 gap-2">
                                        {facility.amenities.map((amenity, index) => (
                                          <div key={index} className="flex items-center">
                                            <Check className="h-4 w-4 text-green-600 mr-2" />
                                            <span className="text-sm">{amenity}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-medium mb-2">Payment Options</h3>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center">
                                          {facility.acceptsMedicaid ? (
                                            <Check className="h-4 w-4 text-green-600 mr-2" />
                                          ) : (
                                            <X className="h-4 w-4 text-red-600 mr-2" />
                                          )}
                                          <span className="text-sm">Medicaid</span>
                                        </div>
                                        <div className="flex items-center">
                                          {facility.acceptsMedicare ? (
                                            <Check className="h-4 w-4 text-green-600 mr-2" />
                                          ) : (
                                            <X className="h-4 w-4 text-red-600 mr-2" />
                                          )}
                                          <span className="text-sm">Medicare</span>
                                        </div>
                                        <div className="flex items-center">
                                          <Check className="h-4 w-4 text-green-600 mr-2" />
                                          <span className="text-sm">Private Pay</span>
                                        </div>
                                        <div className="flex items-center">
                                          <Check className="h-4 w-4 text-green-600 mr-2" />
                                          <span className="text-sm">Insurance</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-medium mb-2">Contact Information</h3>
                                      <div className="space-y-2">
                                        <div className="flex items-center">
                                          <Phone className="h-4 w-4 text-blue-600 mr-2" />
                                          <span className="text-sm">{facility.contactPhone}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <Mail className="h-4 w-4 text-blue-600 mr-2" />
                                          <span className="text-sm">{facility.contactEmail}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                      <Button className="flex-1">Contact Facility</Button>
                                      <Button variant="outline" className="flex-1">Schedule Tour</Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button size="sm">Add Client</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="space-y-4">
                    {arizonaFacilities.map((facility) => (
                      <Card key={facility.id}>
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-48 h-40 md:h-auto">
                            <img 
                              src={facility.imageSrc} 
                              alt={facility.name}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{facility.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {facility.address}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                                  <Star className="h-3 w-3 text-amber-500 mr-1" />
                                  <span className="text-sm font-medium text-amber-700">{facility.rating}</span>
                                </div>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  {facility.availableBeds} beds
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex items-center gap-4">
                              <Badge variant="outline">{facility.type}</Badge>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                                <span className="text-sm">{facility.pricing}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-1">
                              {facility.amenities.map((amenity, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              <div className="flex gap-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">View Details</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    {/* Same dialog content as in the grid view */}
                                  </DialogContent>
                                </Dialog>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                              <Button size="sm">Add Client</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="overflow-hidden">
                    <div className="relative h-[600px]">
                      <img 
                        src="/lovable-uploads/79c83ee5-aaa8-4443-9d81-23afc44f40cd.png" 
                        alt="Arizona Facilities Map" 
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                      
                      {/* Facility Map Pins (positioned absolutely) */}
                      <div className="absolute top-1/4 left-1/3 bg-primary text-white rounded-full p-1 cursor-pointer">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="absolute top-1/3 left-1/2 bg-primary text-white rounded-full p-1 cursor-pointer">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="absolute top-1/2 left-1/4 bg-primary text-white rounded-full p-1 cursor-pointer">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="absolute bottom-1/3 right-1/3 bg-primary text-white rounded-full p-1 cursor-pointer">
                        <MapPin className="h-5 w-5" />
                      </div>
                      
                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2">
                        <div className="flex flex-col gap-2">
                          <Button size="icon" variant="ghost">+</Button>
                          <Button size="icon" variant="ghost">−</Button>
                        </div>
                      </div>
                      
                      {/* Facility Card Preview */}
                      <div className="absolute bottom-4 left-4 max-w-md">
                        <Card>
                          <div className="flex gap-4 p-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden">
                              <img 
                                src={arizonaFacilities[0].imageSrc} 
                                alt={arizonaFacilities[0].name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{arizonaFacilities[0].name}</h3>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {arizonaFacilities[0].address}
                              </div>
                              <div className="flex items-center mt-1">
                                <Star className="h-3 w-3 text-amber-500 mr-1" />
                                <span className="text-xs">{arizonaFacilities[0].rating}</span>
                              </div>
                              <div className="mt-2">
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="recommended" className="m-0">
                <div className="p-4 text-center">
                  <p>Ava's recommendations for your current clients will appear here.</p>
                  <Button variant="outline" className="mt-4">Select a client</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="available" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {arizonaFacilities
                    .filter(f => f.availableBeds > 2)
                    .map((facility) => (
                      <Card key={facility.id} className="overflow-hidden">
                        {/* Same card content as in grid view */}
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="m-0">
                <div className="p-4 text-center">
                  <p>Your favorite facilities will appear here.</p>
                  <Button variant="outline" className="mt-4">Browse facilities</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Facilities;
