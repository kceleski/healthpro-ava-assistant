
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FacilityRequestForm from '@/components/forms/FacilityRequestForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFormSubmit = (formData: any) => {
    // Save form data to local storage or state management for use on the results page
    localStorage.setItem('assessmentData', JSON.stringify(formData));
    
    // Show success toast
    toast({
      title: "Assessment Submitted",
      description: "Redirecting you to matching facilities...",
    });
    
    // Navigate to the facilities map page
    setTimeout(() => {
      navigate('/facilities-map');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Senior Care Assessment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Assessment form */}
          <div className="order-2 lg:order-1">
            <FacilityRequestForm onSubmit={handleFormSubmit} />
          </div>
          
          {/* Right column - Ava chat widget container */}
          <div className="order-1 lg:order-2 relative min-h-[400px] lg:min-h-[600px]">
            <div className="sticky top-8">
              <div className="bg-slate-50 rounded-lg p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-3">How Ava Can Help</h2>
                <p className="text-muted-foreground">
                  Ava is your personal healthcare placement assistant. As you complete the form, 
                  Ava will provide guidance and answer any questions you might have about 
                  senior care options, facility types, or the assessment process.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Ask about different care types and which is right for your situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Get help understanding care costs and payment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Learn about required documentation for facility applications</span>
                  </li>
                </ul>
              </div>
              
              {/* Ava chat widget will appear in the bottom right on mobile and fill the right column on desktop */}
              <div className="lg:absolute lg:bottom-0 lg:right-0 lg:w-full">
                {/* This is where the Ava chat widget will render */}
                {/* For now using a placeholder, we'll implement the actual widget later */}
                <div className="bg-white rounded-lg shadow-lg p-4 border border-slate-200 h-[400px]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">A</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Ava Assistant</h3>
                      <p className="text-xs text-muted-foreground">Healthcare Placement Specialist</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mb-2 max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm Ava, your healthcare placement assistant. I'll help guide you through the assessment process. 
                      Feel free to ask me any questions as you complete the form!
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <p className="text-xs text-center text-muted-foreground">
                      Ava chat widget placeholder - will be implemented with ElevenLabs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssessmentPage;
