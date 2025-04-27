
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FacilityRequestForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {step === 1 && "Basic Information"}
          {step === 2 && "Health & Care Needs"}
          {step === 3 && "Preferences & Budget"}
          {step === 4 && "Document Upload"}
          {step === 5 && "Review & Submit"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Let's start with some basic information"}
          {step === 2 && "Tell us about health conditions and care requirements"}
          {step === 3 && "Share your preferences and budget constraints"}
          {step === 4 && "Upload relevant documents to help us better assist you"}
          {step === 5 && "Review your information before submitting"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Form content will be added based on the current step */}
        <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
          Form content for step {step} will go here
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={step === totalSteps}
        >
          {step === totalSteps ? 'Submit' : 'Next'}
          {step !== totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FacilityRequestForm;
