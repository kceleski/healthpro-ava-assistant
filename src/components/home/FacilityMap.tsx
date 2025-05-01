import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Eye, Building } from 'lucide-react';
import {GoogleMap} from "@react-google-maps/api";

const FacilityMap = () => {
  return (
    <section id="facility-map" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
            Nationwide Facility Network
          </h2>
          <p className="text-xl text-gray-600">
            Access thousands of senior care facilities across the country with our interactive map
          </p>
        </div>
        
        <div className="relative">
          <div className="relative z-10 glass-card p-6 sm:p-8 rounded-xl shadow-elevation max-w-4xl mx-auto opacity-0 animate-fade-in animation-delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-hpa-dark">Find the Perfect Fit</h3>
                <p className="text-gray-600 mb-6">
                  Our database includes over 30,000 licensed facilities nationwide, providing options for every budget, location preference, and care need.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location-Based Search</h4>
                      <p className="text-sm text-gray-600">Find facilities near you or in specific regions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Building className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Detailed Facility Profiles</h4>
                      <p className="text-sm text-gray-600">Explore amenities, care levels, pricing and more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Eye className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Virtual Tours</h4>
                      <p className="text-sm text-gray-600">See facilities before visiting in person</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/facilities-map">
                    <Button size="lg" className="w-full sm:w-auto">
                      <MapPin className="h-4 w-4 mr-2" />
                      Explore Interactive Map
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-subtle">
                  <img 
                    src="/lovable-uploads/79c83ee5-aaa8-4443-9d81-23afc44f40cd.png" 
                    alt="Facility Map" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold">30,000+ Facilities Nationwide</p>
                    <p className="text-sm">Find your perfect match with our interactive map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-100 rounded-full opacity-40 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default FacilityMap;
