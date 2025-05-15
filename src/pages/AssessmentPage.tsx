import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, Save } from 'lucide-react';
import { AssessmentFormData } from '@/types/assessment';

// Import components
import PersonalInformationStep from '@/components/assessment/steps/PersonalInformationStep';
import MedicalInformationStep from '@/components/assessment/steps/MedicalInformationStep';
import FunctionalAssessmentStep from '@/components/assessment/steps/FunctionalAssessmentStep';
import CarePreferencesStep from '@/components/assessment/steps/CarePreferencesStep';
import AdditionalInformationStep from '@/components/assessment/steps/AdditionalInformationStep';
import AssessmentSidebar from '@/components/assessment/AssessmentSidebar';
import AssessmentHelpDialog from '@/components/assessment/AssessmentHelpDialog';
import AssessmentSubmitDialog from '@/components/assessment/AssessmentSubmitDialog';
import { toast } from "sonner";

const AssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  // Form state - would be more comprehensive in a real app
  const [formData, setFormData] = useState<AssessmentFormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Medical Information
    primaryDiagnosis: "",
    secondaryDiagnoses: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
    
    // Functional Assessment
    mobilityStatus: "",
    adlAssistance: [],
    cognitiveFunctioning: "",
    behavioralConsiderations: "",
    
    // Care Preferences
    careType: "",
    budgetRange: "",
    locationPreference: "",
    amenities: [],
    specialRequirements: "",
    
    // Additional Information
    insuranceInfo: "",
    legalDocuments: [],
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    additionalNotes: ""
  });
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name.startsWith('adlAssistance-')) {
      const [prefix, value] = name.split('-');
      setFormData(prev => {
        const currentArray = [...prev.adlAssistance];
        if (checked) {
          if (!currentArray.includes(value)) {
            return { ...prev, adlAssistance: [...currentArray, value] };
          }
        } else {
          return { ...prev, adlAssistance: currentArray.filter(item => item !== value) };
        }
        return prev;
      });
    } else if (name.startsWith('amenities-')) {
      const [prefix, value] = name.split('-');
      setFormData(prev => {
        const currentArray = [...prev.amenities];
        if (checked) {
          if (!currentArray.includes(value)) {
            return { ...prev, amenities: [...currentArray, value] };
          }
        } else {
          return { ...prev, amenities: currentArray.filter(item => item !== value) };
        }
        return prev;
      });
    } else if (name.startsWith('legalDocuments-')) {
      const [prefix, value] = name.split('-');
      setFormData(prev => {
        const currentArray = [...prev.legalDocuments];
        if (checked) {
          if (!currentArray.includes(value)) {
            return { ...prev, legalDocuments: [...currentArray, value] };
          }
        } else {
          return { ...prev, legalDocuments: currentArray.filter(item => item !== value) };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };
  
  // Handle form navigation
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setShowSubmitDialog(true);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle final form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Save draft of assessment data to localStorage as backup
      try {
        localStorage.setItem('assessmentDraft', JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving draft to localStorage:", error);
      }
      // Redirect to success page or show success message
      toast.success("Assessment submitted successfully!");
      window.location.href = "/portal/dashboard";
    }, 2000);
  };
  
  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformationStep 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSelectChange={handleSelectChange} 
               />;
      case 2:
        return <MedicalInformationStep 
                formData={formData} 
                handleInputChange={handleInputChange} 
               />;
      case 3:
        return <FunctionalAssessmentStep 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleCheckboxChange={handleCheckboxChange} 
               />;
      case 4:
        return <CarePreferencesStep 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSelectChange={handleSelectChange} 
                handleCheckboxChange={handleCheckboxChange} 
               />;
      case 5:
        return <AdditionalInformationStep 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleCheckboxChange={handleCheckboxChange} 
               />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Client Assessment</CardTitle>
                    <CardDescription>
                      Step {currentStep} of {totalSteps}: {
                        currentStep === 1 ? "Personal Information" :
                        currentStep === 2 ? "Medical Information" :
                        currentStep === 3 ? "Functional Assessment" :
                        currentStep === 4 ? "Care Preferences" :
                        "Additional Information"
                      }
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setShowHelpDialog(true)}>
                      Need Help?
                    </Button>
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Start</span>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {getCurrentStepComponent()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button onClick={goToNextStep}>
                  {currentStep < totalSteps ? (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Submit
                      <Check className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Helper Sidebar */}
          <div className="hidden lg:block">
            <AssessmentSidebar currentStep={currentStep} />
          </div>
        </div>
      </div>
      
      {/* Help Dialog */}
      <AssessmentHelpDialog open={showHelpDialog} onOpenChange={setShowHelpDialog} />
      
      {/* Submission Confirmation Dialog */}
      <AssessmentSubmitDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formData={formData}
      />
    </div>
  );
};

export default AssessmentPage;
