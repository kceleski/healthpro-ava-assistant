
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
        
        <div className="flex justify-center">
          {/* Assessment form - now takes full width */}
          <div className="w-full max-w-2xl">
            <FacilityRequestForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssessmentPage;
