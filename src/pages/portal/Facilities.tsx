
import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Building, Search, MapPin, Users, Star, Phone, Mail, ArrowUpDown, 
  Filter, Plus, Check, Heart, Map, ChevronRight, Info, Bed, Ban, 
  Clock, DollarSign, Leaf, Utensils, Dumbbell, Wifi, Parking
} from 'lucide-react';

const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [facilityTypeFilter, setFacilityTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([2000, 8000]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [availability, setAvailability] = useState('any');

  // Toggle an amenity in the filter list
  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  
  // Sample facility data
  const facilities = [
    {
      id: 1,
      name: "Desert Bloom Senior Living",
      type: "Memory Care & Assisted Living",
      location: "Phoenix, AZ",
      address: "2215 W Bethany Home Rd, Phoenix, AZ 85015",
      phone: "(602) 555-1234",
      email: "info@desertbloom.com",
      website: "www.desertbloom.com",
      rating: 4.8,
      reviews: 42,
      beds: {
        total: 120,
        available: 3
      },
      pricing: {
        min: 3500,
        max: 5500,
        privateRoom: 4500,
        sharedRoom: 3500,
        memoryCareSupplement: 1000,
        level1Care: 500,
        level2Care: 1000,
        level3Care: 1500
      },
      amenities: ["24/7 Staffing", "Medication Management", "Physical Therapy", "Garden", "Dining", "Activities", "Housekeeping", "Transportation", "Wifi", "Laundry"],
      careLevels: ["Independent Living", "Assisted Living", "Memory Care"],
      images: ["facility1.jpg"],
      description: "Desert Bloom Senior Living offers a comfortable and supportive environment for seniors, with specialized programs for memory care needs. Our beautiful facility features serene garden spaces and a dedicated staff.",
      partnership: {
        status: "Premium Partner",
        since: "2018",
        placementsFee: "85%"
      },
      notes: [
        { date: "2023-05-15", text: "Updated room availability, now have 3 private rooms open." },
        { date: "2023-03-22", text: "New memory care wing opened, adding 20 additional beds." }
      ]
    },
    {
      id: 2,
      name: "Sunrise of Scottsdale",
      type: "Assisted Living & Memory Care",
      location: "Scottsdale, AZ",
      address: "7370 E Gold Dust Ave, Scottsdale, AZ 85258",
      phone: "(480) 555-2345",
      email: "info@sunrisescottsdale.com",
      website: "www.sunriseseniorliving.com/scottsdale",
      rating: 4.5,
      reviews: 38,
      beds: {
        total: 85,
        available: 2
      },
      pricing: {
        min: 4200,
        max: 6200,
        privateRoom: 5200,
        sharedRoom: 4200,
        memoryCareSupplement: 1200,
        level1Care: 600,
        level2Care: 1200,
        level3Care: 1800
      },
      amenities: ["24/7 Staffing", "Restaurant-style Dining", "Wellness Programs", "Beauty Salon", "Housekeeping", "Transportation", "Activities", "Garden", "Library", "Wifi"],
      careLevels: ["Assisted Living", "Memory Care"],
      images: ["facility2.jpg"],
      description: "Sunrise of Scottsdale provides personalized care in an upscale environment. Their Reminiscence neighborhood is specially designed for residents with memory impairments.",
      partnership: {
        status: "Standard Partner",
        since: "2020",
        placementsFee: "75%"
      },
      notes: [
        { date: "2023-06-10", text: "New director hired, very responsive to placement inquiries." },
        { date: "2023-04-05", text: "Renovations completed on main common areas." }
      ]
    },
    {
      id: 3,
      name: "Arizona Sunset Care",
      type: "Memory Care",
      location: "Mesa, AZ",
      address: "1510 S Dobson Rd, Mesa, AZ 85202",
      phone: "(480) 555-3456",
      email: "info@azsunsetcare.com",
      website: "www.azsunsetcare.com",
      rating: 4.3,
      reviews: 25,
      beds: {
        total: 64,
        available: 1
      },
      pricing: {
        min: 3800,
        max: 5200,
        privateRoom: 5200,
        sharedRoom: 3800,
        memoryCareSupplement: 0,
        level1Care: 400,
        level2Care: 800,
        level3Care: 1200
      },
      amenities: ["Specialized Memory Programs", "Secure Environment", "Therapy Services", "Home-cooked Meals", "Housekeeping", "Laundry", "Activities", "Transportation", "Garden"],
      careLevels: ["Memory Care"],
      images: ["facility3.jpg"],
      description: "A smaller, more intimate community focused exclusively on memory care. Their high staff-to-resident ratio ensures personalized attention and care.",
      partnership: {
        status: "Premium Partner",
        since: "2019",
        placementsFee: "85%"
      },
      notes: [
        { date: "2023-06-20", text: "Only one private room available, likely to fill quickly." },
        { date: "2023-05-12", text: "New memory engagement program launched with positive feedback." }
      ]
    },
    {
      id: 4,
      name: "Mesa Gardens Retirement",
      type: "Independent Living",
      location: "Mesa, AZ",
      address: "525 E Brown Rd, Mesa, AZ 85203",
      phone: "(480) 555-4567",
      email: "info@mesagardens.com",
      website: "www.mesagardens.com",
      rating: 4.7,
      reviews: 56,
      beds: {
        total: 150,
        available: 8
      },
      pricing: {
        min: 2800,
        max: 4000,
        privateRoom: 3500,
        sharedRoom: 2800,
        memoryCareSupplement: 0,
        level1Care: 0,
        level2Care: 0,
        level3Care: 0
      },
      amenities: ["Swimming Pool", "Fitness Center", "Restaurant-style Dining", "Social Activities", "Transportation", "Housekeeping", "Library", "Garden", "Wifi", "Parking"],
      careLevels: ["Independent Living"],
      images: ["facility4.jpg"],
      description: "Mesa Gardens offers active seniors a vibrant community with numerous amenities. Residents enjoy independent living with optional services as needed.",
      partnership: {
        status: "Standard Partner",
        since: "2021",
        placementsFee: "70%"
      },
      notes: [
        { date: "2023-07-01", text: "New one-bedroom apartments now available after renovation." },
        { date: "2023-05-15", text: "Added new transportation service for medical appointments." }
      ]
    }
  ];
  
  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityIcons: Record<string, React.ReactNode> = {
      "24/7 Staffing": <Clock className="h-4 w-4" />,
      "Medication Management": <Check className="h-4 w-4" />,
      "Restaurant-style Dining": <Utensils className="h-4 w-4" />,
      "Dining": <Utensils className="h-4 w-4" />,
      "Home-cooked Meals": <Utensils className="h-4 w-4" />,
      "Physical Therapy": <Dumbbell className="h-4 w-4" />,
      "Wellness Programs": <Leaf className="h-4 w-4" />,
      "Garden": <Leaf className="h-4 w-4" />,
      "Swimming Pool": <Leaf className="h-4 w-4" />,
      "Fitness Center": <Dumbbell className="h-4 w-4" />,
      "Transportation": <Parking className="h-4 w-4" />,
      "Wifi": <Wifi className="h-4 w-4" />,
      "Parking": <Parking className="h-4 w-4" />
    };
    
    return amenityIcons[amenity] || <Check className="h-4 w-4" />;
  };
  
  // Filter facilities based on search and filters
  const filteredFacilities = facilities.filter(facility => {
    // Search query filter
    if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !facility.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Facility type filter
    if (facilityTypeFilter !== 'all' && !facility.careLevels.includes(facilityTypeFilter)) {
      return false;
    }
    
    // Price range filter
    if (facility.pricing.min > priceRange[1] || facility.pricing.max < priceRange[0]) {
      return false;
    }
    
    // Amenities filter
    if (amenities.length > 0 && !amenities.every(a => facility.amenities.includes(a))) {
      return false;
    }
    
    // Availability filter
    if (availability === 'available' && facility.beds.available === 0) {
      return false;
    }
    
    return true;
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Facilities Database</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search facilities by name or location" 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <span className="text-sm text-muted-foreground">
              Showing {filteredFacilities.length} of {facilities.length} facilities
            </span>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id} className="overflow-hidden">
                  <div className="bg-slate-100 h-40 flex items-center justify-center">
                    <Building className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{facility.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{facility.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                        <span className="text-xs font-medium">{facility.rating}</span>
                      </div>
                    </div>
                    
                    <Badge className="mt-3">{facility.type}</Badge>
                    
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">{facility.description}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {facility.amenities.slice(0, 5).map((amenity, idx) => (
                        <div key={idx} className="flex items-center text-xs bg-slate-100 px-2 py-1 rounded-full">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                      {facility.amenities.length > 5 && (
                        <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                          +{facility.amenities.length - 5} more
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium">${facility.pricing.min.toLocaleString()} - ${facility.pricing.max.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={facility.beds.available > 0 ? "success" : "destructive"} className="mr-2">
                          {facility.beds.available > 0 ? `${facility.beds.available} Available` : "Full"}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 px-6 py-3 flex justify-between">
                    <div className="flex items-center">
                      <Badge variant="outline">{facility.partnership.status}</Badge>
                    </div>
                    <Button size="sm">
                      View Details
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Price Range</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Partner Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFacilities.map((facility) => (
                      <TableRow key={facility.id}>
                        <TableCell className="font-medium">{facility.name}</TableCell>
                        <TableCell>{facility.type}</TableCell>
                        <TableCell>{facility.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 mr-1 fill-amber-400 text-amber-400" />
                            <span>{facility.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>${facility.pricing.min.toLocaleString()} - ${facility.pricing.max.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={facility.beds.available > 0 ? "success" : "destructive"}>
                            {facility.beds.available > 0 ? `${facility.beds.available} Available` : "Full"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{facility.partnership.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium mt-4">Map View Coming Soon</h3>
                  <p className="text-muted-foreground mt-2">
                    We're working on an interactive map view of all facilities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Facilities</DialogTitle>
            <DialogDescription>
              Narrow down facilities based on your criteria.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Facility Type</Label>
              <Select 
                value={facilityTypeFilter} 
                onValueChange={setFacilityTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Independent Living">Independent Living</SelectItem>
                  <SelectItem value="Assisted Living">Assisted Living</SelectItem>
                  <SelectItem value="Memory Care">Memory Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Price Range (monthly)</Label>
              <div className="px-2">
                <Slider 
                  value={priceRange}
                  min={2000}
                  max={10000}
                  step={100}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Availability</SelectItem>
                  <SelectItem value="available">Has Available Beds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2">
                {["24/7 Staffing", "Dining", "Transportation", "Fitness Center", "Garden", "Wifi", "Medication Management", "Wellness Programs"].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`} 
                      checked={amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setFacilityTypeFilter('all');
              setPriceRange([2000, 8000]);
              setAmenities([]);
              setAvailability('any');
            }}>
              Reset
            </Button>
            <Button type="submit" onClick={() => setFilterDialogOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
};

export default Facilities;
