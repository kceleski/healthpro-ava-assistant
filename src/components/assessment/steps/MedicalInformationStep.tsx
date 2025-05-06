
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AssessmentFormData } from '@/types/assessment';

interface MedicalInformationStepProps {
  formData: AssessmentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const MedicalInformationStep: React.FC<MedicalInformationStepProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryDiagnosis">Primary Diagnosis</Label>
        <Input 
          id="primaryDiagnosis" 
          name="primaryDiagnosis" 
          value={formData.primaryDiagnosis}
          onChange={handleInputChange}
          placeholder="e.g., Alzheimer's Disease, Dementia, etc."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="secondaryDiagnoses">Secondary Diagnoses</Label>
        <Textarea 
          id="secondaryDiagnoses" 
          name="secondaryDiagnoses" 
          value={formData.secondaryDiagnoses}
          onChange={handleInputChange}
          placeholder="List any secondary diagnoses"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea 
          id="allergies" 
          name="allergies" 
          value={formData.allergies}
          onChange={handleInputChange}
          placeholder="List any allergies (medications, food, environmental)"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medications">Current Medications</Label>
        <Textarea 
          id="medications" 
          name="medications" 
          value={formData.medications}
          onChange={handleInputChange}
          placeholder="List current medications, dosages, and frequency"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea 
          id="medicalHistory" 
          name="medicalHistory" 
          value={formData.medicalHistory}
          onChange={handleInputChange}
          placeholder="Brief summary of relevant medical history"
          rows={4}
        />
      </div>
    </div>
  );
};

export default MedicalInformationStep;
