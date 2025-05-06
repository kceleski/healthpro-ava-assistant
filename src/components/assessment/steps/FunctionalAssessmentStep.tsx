
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentFormData } from '@/types/assessment';

interface FunctionalAssessmentStepProps {
  formData: AssessmentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const FunctionalAssessmentStep: React.FC<FunctionalAssessmentStepProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mobilityStatus">Mobility Status</Label>
        <Input 
          id="mobilityStatus" 
          name="mobilityStatus" 
          value={formData.mobilityStatus}
          onChange={handleInputChange}
          placeholder="Describe the client's mobility limitations"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="adlAssistance">Activities of Daily Living (ADL) Assistance</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-bathing" 
              checked={formData.adlAssistance.includes("bathing")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-bathing", checked === true)}
            />
            <label htmlFor="adlAssistance-bathing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Bathing
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-dressing" 
              checked={formData.adlAssistance.includes("dressing")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-dressing", checked === true)}
            />
            <label htmlFor="adlAssistance-dressing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Dressing
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-toileting" 
              checked={formData.adlAssistance.includes("toileting")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-toileting", checked === true)}
            />
            <label htmlFor="adlAssistance-toileting" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Toileting
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-feeding" 
              checked={formData.adlAssistance.includes("feeding")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-feeding", checked === true)}
            />
            <label htmlFor="adlAssistance-feeding" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Feeding
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-transferring" 
              checked={formData.adlAssistance.includes("transferring")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-transferring", checked === true)}
            />
            <label htmlFor="adlAssistance-transferring" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Transferring
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adlAssistance-walking" 
              checked={formData.adlAssistance.includes("walking")}
              onCheckedChange={(checked) => handleCheckboxChange("adlAssistance-walking", checked === true)}
            />
            <label htmlFor="adlAssistance-walking" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Walking
            </label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cognitiveFunctioning">Cognitive Functioning</Label>
        <Input 
          id="cognitiveFunctioning" 
          name="cognitiveFunctioning" 
          value={formData.cognitiveFunctioning}
          onChange={handleInputChange}
          placeholder="Describe the client's cognitive abilities"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="behavioralConsiderations">Behavioral Considerations</Label>
        <Textarea 
          id="behavioralConsiderations" 
          name="behavioralConsiderations" 
          value={formData.behavioralConsiderations}
          onChange={handleInputChange}
          placeholder="List any behavioral concerns or issues"
          rows={3}
        />
      </div>
    </div>
  );
};

export default FunctionalAssessmentStep;
