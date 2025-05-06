
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentFormData } from '@/types/assessment';

interface AdditionalInformationStepProps {
  formData: AssessmentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const AdditionalInformationStep: React.FC<AdditionalInformationStepProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="insuranceInfo">Insurance Information</Label>
        <Textarea 
          id="insuranceInfo" 
          name="insuranceInfo" 
          value={formData.insuranceInfo}
          onChange={handleInputChange}
          placeholder="List any insurance details or coverage information"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="legalDocuments">Legal Documents</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="legalDocuments-privacyPolicy" 
              checked={formData.legalDocuments.includes("privacyPolicy")} 
              onCheckedChange={(checked) => handleCheckboxChange("legalDocuments-privacyPolicy", checked === true)}
            />
            <label htmlFor="legalDocuments-privacyPolicy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Privacy Policy
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="legalDocuments-termsOfService" 
              checked={formData.legalDocuments.includes("termsOfService")} 
              onCheckedChange={(checked) => handleCheckboxChange("legalDocuments-termsOfService", checked === true)}
            />
            <label htmlFor="legalDocuments-termsOfService" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Terms of Service
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="legalDocuments-privacyStatement" 
              checked={formData.legalDocuments.includes("privacyStatement")} 
              onCheckedChange={(checked) => handleCheckboxChange("legalDocuments-privacyStatement", checked === true)}
            />
            <label htmlFor="legalDocuments-privacyStatement" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Privacy Statement
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="legalDocuments-acknowledgment" 
              checked={formData.legalDocuments.includes("acknowledgment")} 
              onCheckedChange={(checked) => handleCheckboxChange("legalDocuments-acknowledgment", checked === true)}
            />
            <label htmlFor="legalDocuments-acknowledgment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Acknowledgment
            </label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
        <Input 
          id="emergencyContactName" 
          name="emergencyContactName" 
          value={formData.emergencyContactName}
          onChange={handleInputChange}
          placeholder="Enter emergency contact name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
        <Input 
          id="emergencyContactPhone" 
          name="emergencyContactPhone" 
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
          placeholder="(555) 123-4567"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="emergencyContactRelationship">Emergency Contact Relationship</Label>
        <Input 
          id="emergencyContactRelationship" 
          name="emergencyContactRelationship" 
          value={formData.emergencyContactRelationship}
          onChange={handleInputChange}
          placeholder="Enter emergency contact relationship"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea 
          id="additionalNotes" 
          name="additionalNotes" 
          value={formData.additionalNotes}
          onChange={handleInputChange}
          placeholder="Any additional notes or comments"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AdditionalInformationStep;
