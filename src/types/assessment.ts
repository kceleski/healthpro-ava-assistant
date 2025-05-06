
export interface AssessmentFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Medical Information
  primaryDiagnosis: string;
  secondaryDiagnoses: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
  
  // Functional Assessment
  mobilityStatus: string;
  adlAssistance: string[];
  cognitiveFunctioning: string;
  behavioralConsiderations: string;
  
  // Care Preferences
  careType: string;
  budgetRange: string;
  locationPreference: string;
  amenities: string[];
  specialRequirements: string;
  
  // Additional Information
  insuranceInfo: string;
  legalDocuments: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  additionalNotes: string;
}
