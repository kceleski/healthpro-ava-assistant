import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import {
  Check, ChevronRight, User, Phone, Mail, Calendar, Save,
  FileText, ArrowRight, AlertCircle, CheckCircle, X, XCircle, Circle,
  ClipboardList, BookOpen, Activity, Brain, Heart, PlusCircle, Home
} from 'lucide-react';

// Assistant Avatar for the helper sidebar
const AssistantAvatar = () => (
  <Avatar className="h-10 w-10">
    <AvatarImage src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" alt="Ava" />
    <AvatarFallback>AVA</AvatarFallback>
  </Avatar>
);

const AssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  // Form state - would be more comprehensive in a real app
  const [formData, setFormData] = useState({
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
    adlAssistance: [] as string[],
    cognitiveFunctioning: "",
    behavioralConsiderations: "",
    
    // Care Preferences
    careType: "",
    budgetRange: "",
    locationPreference: "",
    amenities: [] as string[],
    specialRequirements: "",
    
    // Additional Information
    insuranceInfo: "",
    legalDocuments: [] as string[],
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
      // Redirect to success page or show success message
      window.location.href = "/portal/dashboard";
    }, 2000);
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
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input 
                          id="dateOfBirth" 
                          name="dateOfBirth" 
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={formData.gender} 
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Medical Information */}
                {currentStep === 2 && (
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
                )}
                
                {/* Step 3: Functional Assessment */}
                {currentStep === 3 && (
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
                        <Checkbox 
                          id="adlAssistance-bathing" 
                          name="adlAssistance-bathing" 
                          checked={formData.adlAssistance.includes("bathing")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-bathing", checked)}
                        >
                          Bathing
                        </Checkbox>
                        <Checkbox 
                          id="adlAssistance-dressing" 
                          name="adlAssistance-dressing" 
                          checked={formData.adlAssistance.includes("dressing")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-dressing", checked)}
                        >
                          Dressing
                        </Checkbox>
                        <Checkbox 
                          id="adlAssistance-toileting" 
                          name="adlAssistance-toileting" 
                          checked={formData.adlAssistance.includes("toileting")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-toileting", checked)}
                        >
                          Toileting
                        </Checkbox>
                        <Checkbox 
                          id="adlAssistance-feeding" 
                          name="adlAssistance-feeding" 
                          checked={formData.adlAssistance.includes("feeding")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-feeding", checked)}
                        >
                          Feeding
                        </Checkbox>
                        <Checkbox 
                          id="adlAssistance-transferring" 
                          name="adlAssistance-transferring" 
                          checked={formData.adlAssistance.includes("transferring")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-transferring", checked)}
                        >
                          Transferring
                        </Checkbox>
                        <Checkbox 
                          id="adlAssistance-walking" 
                          name="adlAssistance-walking" 
                          checked={formData.adlAssistance.includes("walking")} 
                          onChange={(checked) => handleCheckboxChange("adlAssistance-walking", checked)}
                        >
                          Walking
                        </Checkbox>
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
                )}
                
                {/* Step 4: Care Preferences */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="careType">Care Type</Label>
                      <Select 
                        value={formData.careType} 
                        onValueChange={(value) => handleSelectChange("careType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select care type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-home">In-Home Care</SelectItem>
                          <SelectItem value="residential">Residential Care</SelectItem>
                          <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <Select 
                        value={formData.budgetRange} 
                        onValueChange={(value) => handleSelectChange("budgetRange", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low ($0 - $10,000)</SelectItem>
                          <SelectItem value="medium">Medium ($10,001 - $20,000)</SelectItem>
                          <SelectItem value="high">High ($20,001 - $50,000)</SelectItem>
                          <SelectItem value="very-high">Very High ($50,001+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="locationPreference">Location Preference</Label>
                      <Select 
                        value={formData.locationPreference} 
                        onValueChange={(value) => handleSelectChange("locationPreference", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nearby">Nearby</SelectItem>
                          <SelectItem value="within-50-miles">Within 50 Miles</SelectItem>
                          <SelectItem value="within-100-miles">Within 100 Miles</SelectItem>
                          <SelectItem value="within-200-miles">Within 200 Miles</SelectItem>
                          <SelectItem value="anywhere">Anywhere</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amenities">Amenities</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Checkbox 
                          id="amenities-pets" 
                          name="amenities-pets" 
                          checked={formData.amenities.includes("pets")} 
                          onChange={(checked) => handleCheckboxChange("amenities-pets", checked)}
                        >
                          Pets
                        </Checkbox>
                        <Checkbox 
                          id="amenities-parking" 
                          name="amenities-parking" 
                          checked={formData.amenities.includes("parking")} 
                          onChange={(checked) => handleCheckboxChange("amenities-parking", checked)}
                        >
                          Parking
                        </Checkbox>
                        <Checkbox 
                          id="amenities-gym" 
                          name="amenities-gym" 
                          checked={formData.amenities.includes("gym")} 
                          onChange={(checked) => handleCheckboxChange("amenities-gym", checked)}
                        >
                          Gym
                        </Checkbox>
                        <Checkbox 
                          id="amenities-restaurant" 
                          name="amenities-restaurant" 
                          checked={formData.amenities.includes("restaurant")} 
                          onChange={(checked) => handleCheckboxChange("amenities-restaurant", checked)}
                        >
                          Restaurant
                        </Checkbox>
                        <Checkbox 
                          id="amenities-wifi" 
                          name="amenities-wifi" 
                          checked={formData.amenities.includes("wifi")} 
                          onChange={(checked) => handleCheckboxChange("amenities-wifi", checked)}
                        >
                          Wi-Fi
                        </Checkbox>
                        <Checkbox 
                          id="amenities-pool" 
                          name="amenities-pool" 
                          checked={formData.amenities.includes("pool")} 
                          onChange={(checked) => handleCheckboxChange("amenities-pool", checked)}
                        >
                          Pool
                        </Checkbox>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea 
                        id="specialRequirements" 
                        name="specialRequirements" 
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        placeholder="List any special requirements or preferences"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 5: Additional Information */}
                {currentStep === 5 && (
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
                        <Checkbox 
                          id="legalDocuments-privacyPolicy" 
                          name="legalDocuments-privacyPolicy" 
                          checked={formData.legalDocuments.includes("privacyPolicy")} 
                          onChange={(checked) => handleCheckboxChange("legalDocuments-privacyPolicy", checked)}
                        >
                          Privacy Policy
                        </Checkbox>
                        <Checkbox 
                          id="legalDocuments-termsOfService" 
                          name="legalDocuments-termsOfService" 
                          checked={formData.legalDocuments.includes("termsOfService")} 
                          onChange={(checked) => handleCheckboxChange("legalDocuments-termsOfService", checked)}
                        >
                          Terms of Service
                        </Checkbox>
                        <Checkbox 
                          id="legalDocuments-privacyStatement" 
                          name="legalDocuments-privacyStatement" 
                          checked={formData.legalDocuments.includes("privacyStatement")} 
                          onChange={(checked) => handleCheckboxChange("legalDocuments-privacyStatement", checked)}
                        >
                          Privacy Statement
                        </Checkbox>
                        <Checkbox 
                          id="legalDocuments-acknowledgment" 
                          name="legalDocuments-acknowledgment" 
                          checked={formData.legalDocuments.includes("acknowledgment")} 
                          onChange={(checked) => handleCheckboxChange("legalDocuments-acknowledgment", checked)}
                        >
                          Acknowledgment
                        </Checkbox>
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
                )}
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
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <AssistantAvatar />
                <div>
                  <CardTitle className="text-lg">Assessment Helper</CardTitle>
                  <CardDescription>Ava is here to help</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Tips for current step
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentStep === 1 && (
                      "Provide accurate contact information to ensure we can reach out if needed."
                    )}
                    {currentStep === 2 && (
                      "List all medical conditions, even if they seem minor. They can be important for proper care planning."
                    )}
                    {currentStep === 3 && (
                      "Be specific about mobility limitations and assistance needed for daily activities."
                    )}
                    {currentStep === 4 && (
                      "Consider both current care needs and potential future requirements when selecting preferences."
                    )}
                    {currentStep === 5 && (
                      "Providing detailed emergency contact information is essential for any care plan."
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Common Questions</h4>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-left justify-start text-sm">
                        How is this information used?
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-left justify-start text-sm">
                        Can I update this later?
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-left justify-start text-sm">
                        Who will see my medical information?
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-left justify-start text-sm">
                        What if I'm not sure about care preferences?
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-green-500" />
                    Need assistance?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our care advisors are available to help you complete this assessment.
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Assessment Help</DialogTitle>
            <DialogDescription>
              How to complete the client assessment form
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <ScrollArea className="h-72">
              <div className="space-y-4 p-1">
                <div>
                  <h3 className="font-medium">Getting Started</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This assessment helps us understand the client's needs and preferences 
                    to find the most suitable care options. Complete each section with as 
                    much detail as possible.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Step 1: Personal Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Provide basic contact and identification information for the client.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Step 2: Medical Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Include all relevant health conditions, medications, and allergies.
                    This information is crucial for proper care planning.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Step 3: Functional Assessment</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detail the client's ability to perform daily activities and 
                    any assistance required for mobility, eating, bathing, etc.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Step 4: Care Preferences</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Specify what type of care environment and services the client 
                    prefers, including budget considerations and location preferences.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Step 5: Additional Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Provide emergency contacts, insurance details, and any other 
                    information relevant to the client's care needs.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHelpDialog(false)}>Close</Button>
            <Button>Contact Support</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Submission Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assessment</DialogTitle>
            <DialogDescription>
              Are you ready to submit this client assessment?
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Once submitted, a care advisor will review the assessment and contact you 
            to discuss next steps and potential care options. You'll be able to make 
            updates to this information later if needed.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Go Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>Submit Assessment</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentPage;
