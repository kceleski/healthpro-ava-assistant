import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StorepointMap from '@/components/map/StorepointMap';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquare, Filter, MapPin, Save, RefreshCw, X, Loader2 } from 'lucide-react';

const FacilityMapPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch assessment data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const storedData = localStorage.getItem('assessmentData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAssessmentData(parsedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing assessment data:", error);
        setIsLoading(false);
      }
    } else {
      // If no assessment data, redirect to assessment page
      toast({
        title: "No Assessment Data",
        description: "Please complete an assessment first.",
        variant: "destructive",
      });
      navigate('/assessment');
    }
  }, [navigate, toast]);
  
  // Function to start a new search
  const handleNewSearch = () => {
    // Navigate to assessment page
    navigate('/assessment');
  };
  
  // Function to save search results
  const handleSaveResults = () => {
    toast({
      title: "Results Saved",
      description: "Your search results have been saved.",
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0 text-hpa-dark">
              Matching Facilities
            </h1>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={handleNewSearch}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Search
              </Button>
              
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={handleSaveResults}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Results
              </Button>
              
              <Button 
                size={isMobile ? "sm" : "default"}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Ava
              </Button>
            </div>
          </div>
          
          {/* Search Criteria Summary */}
          {isLoading ? (
            <Card className="mb-6">
              <CardContent className="p-4 md:p-6 flex items-center justify-center h-24">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading search criteria...</span>
              </CardContent>
            </Card>
          ) : assessmentData && (
            <Card className="mb-6">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium mb-2">Search Criteria</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Care Type:</p>
                        <p className="text-sm">
                          {assessmentData.careType === 'independent' ? 'Independent Living' :
                           assessmentData.careType === 'assisted' ? 'Assisted Living' :
                           assessmentData.careType === 'memory' ? 'Memory Care' : 'Nursing Home'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Location:</p>
                        <p className="text-sm">
                          {assessmentData.preferredLocation || 'Not specified'} 
                          <span className="text-xs text-muted-foreground ml-1">
                            (within {assessmentData.locationRadius} miles)
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Budget:</p>
                        <p className="text-sm">{assessmentData.monthlyBudget || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => {}}>
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Facility Map and List Section */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Facility List (Left Column) */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">Matching Facilities</h2>
                      <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        28 Results
                      </span>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Loading facilities...</span>
                    </div>
                  ) : (
                    <div className="overflow-auto max-h-[600px]">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                        <div 
                          key={id} 
                          className="p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors"
                          onClick={() => {
                            console.log(`Facility ${id} selected`);
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">Sunrise Senior Living #{id}</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Available
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>Phoenix, AZ • 3.2 miles away</span>
                          </div>
                          
                          <div className="text-sm mb-2">
                            <span className="font-medium">$3,500 - $5,800</span>
                            <span className="text-muted-foreground text-xs ml-1">per month</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                              Memory Care
                            </span>
                            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                              Assisted Living
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Interactive Map (Right Column) */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <div className="h-[600px]">
                    <StorepointMap />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Facility Detail Popup (shows when a marker is clicked) */}
          <div className="hidden">
            <Card className="fixed bottom-24 right-8 w-80 z-30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Sunrise Senior Living</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-sm space-y-2">
                  <p className="flex items-center text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>1234 Main St, Phoenix, AZ</span>
                  </p>
                  <p><span className="font-medium">Price:</span> $3,500 - $5,800 /month</p>
                  <p><span className="font-medium">Care Types:</span> Memory Care, Assisted Living</p>
                  <p><span className="font-medium">Availability:</span> 3 rooms available</p>
                </div>
                
                <div className="mt-3 flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    Call
                  </Button>
                  <Button size="sm" className="w-[48%]">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacilityMapPage;
