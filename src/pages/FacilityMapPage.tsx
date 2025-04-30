
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StorepointMap from '@/components/map/StorepointMap';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquare, Filter, MapPin, Save, RefreshCw, Loader2 } from 'lucide-react';

const FacilityMapPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  useEffect(() => {
    setIsLoading(true);
    const storedData = localStorage.getItem('assessmentData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAssessmentData(parsedData);
        setIsLoading(false);
        
        // We'll get the count from the StorePoint map once it loads
        // This is just a placeholder until then
        setTotalResults(0);
      } catch (error) {
        console.error("Error parsing assessment data:", error);
        setIsLoading(false);
      }
    } else {
      toast({
        title: "No Assessment Data",
        description: "Please complete an assessment first.",
        variant: "destructive",
      });
      navigate('/assessment');
    }
    
    // Add an event listener for when StorePoint loads
    const checkSP = setInterval(() => {
      if (window.SP && window.SP.locations) {
        setTotalResults(window.SP.locations.length);
        clearInterval(checkSP);
      }
    }, 1000);
    
    return () => clearInterval(checkSP);
  }, [navigate, toast]);
  
  const handleNewSearch = () => {
    navigate('/assessment');
  };
  
  const handleSaveResults = () => {
    toast({
      title: "Results Saved",
      description: "Your search results have been saved to your dashboard.",
    });
    navigate('/portal/dashboard');
  };

  const handleOpenChat = () => {
    navigate('/portal/ava');
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
                onClick={handleOpenChat}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Ava
              </Button>
            </div>
          </div>
          
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
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">Matching Facilities</h2>
                      <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {totalResults} Results
                      </span>
                    </div>
                  </div>
                  
                  {/* StorePoint map will handle the actual list of facilities */}
                  <div className="p-4 text-center text-muted-foreground">
                    <p>Select a facility on the map to view details</p>
                    {!window.SP && (
                      <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2">Loading facilities...</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacilityMapPage;
