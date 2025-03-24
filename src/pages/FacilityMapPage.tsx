
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StorepointMap from '@/components/map/StorepointMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FacilityMapPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
            Find Senior Care Facilities
          </h1>
          <p className="text-xl text-gray-600">
            Browse our nationwide database of quality senior care facilities
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Search by city, state, or zip code..." 
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="whitespace-nowrap">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  <MapPin className="h-4 w-4 mr-2" />
                  Use My Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Map Container */}
        <StorepointMap />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Find the Perfect Match</CardTitle>
                <CardDescription>Based on your loved one's needs</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our database includes assisted living, memory care, nursing homes, and independent living communities nationwide.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Tour With Confidence</CardTitle>
                <CardDescription>Schedule guided tours at top facilities</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our healthcare placement specialists can arrange and accompany you on tours to help evaluate each option.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Get Expert Guidance</CardTitle>
                <CardDescription>Free personalized assistance</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Not sure where to start? Our Ava AI assistant and human specialists can help narrow down your options based on your specific needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacilityMapPage;
