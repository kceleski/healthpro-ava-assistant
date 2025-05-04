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
                      <Label>Mobility Status</Label>
                      <RadioGroup 
                        value={formData.mobilityStatus}
                        onValueChange={(value) => handleSelectChange("mobilityStatus", value)}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="independent" id="mobility-independent" />
                            <Label htmlFor="mobility-independent">Fully Independent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cane" id="mobility-cane" />
                            <Label htmlFor="mobility-cane">Uses Cane/Walker</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="wheelchair" id="mobility-wheelchair" />
                            <Label htmlFor="mobility-wheelchair">Uses Wheelchair</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bedridden" id="mobility-bedridden" />
                            <Label htmlFor="mobility-bedridden">Bedridden</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Activities of Daily Living (ADL) Assistance Needed</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {["Bathing", "Dressing", "Toileting", "Eating", "Medication Management", "Mobility Assistance", "Transportation"].map((adl) => (
                          <div key={adl} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`adl-${adl}`} 
                              checked={formData.adlAssistance.includes(adl)}
                              onCheckedChange={(checked) => handleCheckboxChange(`adlAssistance-${adl}`, !!checked)}
                            />
                            <Label htmlFor={`adl-${adl}`} className="text-sm">{adl}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cognitive Functioning</Label>
                      <RadioGroup 
                        value={formData.cognitiveFunctioning}
                        onValueChange={(value) => handleSelectChange("cognitiveFunctioning", value)}
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="cognitive-normal" />
                            <Label htmlFor="cognitive-normal">Normal Cognition</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id="cognitive-mild" />
                            <Label htmlFor="cognitive-mild">Mild Cognitive Impairment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="cognitive-moderate" />
                            <Label htmlFor="cognitive-moderate">Moderate Cognitive Impairment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id="cognitive-severe" />
                            <Label htmlFor="cognitive-severe">Severe Cognitive Impairment</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="behavioralConsiderations">Behavioral Considerations</Label>
                      <Textarea 
                        id="behavioralConsiderations" 
                        name="behavioralConsiderations" 
                        value={formData.behavioralConsiderations}
                        onChange={handleInputChange}
                        placeholder="Note any behavioral considerations (wandering, agitation, etc.)"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 4: Care Preferences */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Type of Care Needed</Label>
                      <RadioGroup 
                        value={formData.careType}
                        onValueChange={(value) => handleSelectChange("careType", value)}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="independent" id="care-independent" />
                            <Label htmlFor="care-independent">Independent Living</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="assisted" id="care-assisted" />
                            <Label htmlFor="care-assisted">Assisted Living</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="memory" id="care-memory" />
                            <Label htmlFor="care-memory">Memory Care</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nursing" id="care-nursing" />
                            <Label htmlFor="care-nursing">Nursing Home</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Monthly Budget Range</Label>
                      <RadioGroup 
                        value={formData.budgetRange}
                        onValueChange={(value) => handleSelectChange("budgetRange", value)}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2000-3000" id="budget-2000-3000" />
                            <Label htmlFor="budget-2000-3000">$2,000 - $3,000</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3000-4000" id="budget-3000-4000" />
                            <Label htmlFor="budget-3000-4000">$3,000 - $4,000</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4000-5000" id="budget-4000-5000" />
                            <Label htmlFor="budget-4000-5000">$4,000 - $5,000</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5000+" id="budget-5000+" />
                            <Label htmlFor="budget-5000+">$5,000+</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="locationPreference">Location Preference</Label>
                      <Input 
                        id="locationPreference" 
                        name="locationPreference" 
                        value={formData.locationPreference}
                        onChange={handleInputChange}
                        placeholder="City, neighborhood, or area"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Desired Amenities and Features</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {["Private Room", "Pet-Friendly", "Outdoor Spaces", "Activities Program", "Physical Therapy", "Transportation Services", "Religious Services", "Beauty Salon"].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`amenity-${amenity}`} 
                              checked={formData.amenities.includes(amenity)}
                              onCheckedChange={(checked) => handleCheckboxChange(`amenities-${amenity}`, !!checked)}
                            />
                            <Label htmlFor={`amenity-${amenity}`} className="text-sm">{amenity}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea 
                        id="specialRequirements" 
                        name="specialRequirements" 
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        placeholder="Any special requirements or preferences"
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
                        placeholder="Medicare, Medicaid, Private Insurance details"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Legal Documents Available</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {["Power of Attorney", "Advanced Directive", "Living Will", "DNR Order", "Guardianship Papers"].map((doc) => (
                          <div key={doc} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`doc-${doc}`} 
                              checked={formData.legalDocuments.includes(doc)}
                              onCheckedChange={(checked) => handleCheckboxChange(`legalDocuments-${doc}`, !!checked)}
                            />
                            <Label htmlFor={`doc-${doc}`} className="text-sm">{doc}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input 
                          id="emergencyContactName" 
                          name="emergencyContactName" 
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                        <Input 
                          id="emergencyContactRelationship" 
                          name="emergencyContactRelationship" 
                          value={formData.emergencyContactRelationship}
                          onChange={handleInputChange}
                          placeholder="e.g., Son, Daughter, Spouse"
                        />
                      </div>
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
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea 
                        id="additionalNotes" 
                        name="additionalNotes" 
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Any additional information that may be helpful"
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
                  {currentStep < totalSteps ? 'Next' : 'Complete Assessment'}
                  {currentStep < totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Sidebar Helpers */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Assessment Guide */}
              <Card>
                <CardHeader className="bg-slate-50">
                  <div className="flex items-center gap-3">
                    <AssistantAvatar />
                    <CardTitle>Assessment Guide</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Tabs defaultValue={currentStep.toString()}>
                      <TabsList className="grid grid-cols-5">
                        <TabsTrigger value="1" onClick={() => setCurrentStep(1)}>1</TabsTrigger>
                        <TabsTrigger value="2" onClick={() => setCurrentStep(2)}>2</TabsTrigger>
                        <TabsTrigger value="3" onClick={() => setCurrentStep(3)}>3</TabsTrigger>
                        <TabsTrigger value="4" onClick={() => setCurrentStep(4)}>4</TabsTrigger>
                        <TabsTrigger value="5" onClick={() => setCurrentStep(5)}>5</TabsTrigger>
                      </TabsList>
                      <TabsContent value="1">
                        <div className="pt-4 space-y-3">
                          <h3 className="font-medium">Personal Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Basic contact details and demographic information to identify the client.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>All fields are required</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="2">
                        <div className="pt-4 space-y-3">
                          <h3 className="font-medium">Medical Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Current medical conditions, medications, and health history to determine appropriate care level.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span>Be as specific as possible</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="3">
                        <div className="pt-4 space-y-3">
                          <h3 className="font-medium">Functional Assessment</h3>
                          <p className="text-sm text-muted-foreground">
                            Evaluation of physical and cognitive abilities to determine assistance needs.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span>Select all applicable assistance needs</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="4">
                        <div className="pt-4 space-y-3">
                          <h3 className="font-medium">Care Preferences</h3>
                          <p className="text-sm text-muted-foreground">
                            Location, budget, and facility preferences to find the best match.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Home className="h-4 w-4 text-purple-500" />
                            <span>Help us find the perfect facility match</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="5">
                        <div className="pt-4 space-y-3">
                          <h3 className="font-medium">Additional Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Insurance, legal documents, and emergency contacts to complete the assessment.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span>Final details before submission</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Step Progress</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          {currentStep > 1 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentStep === 1 ? (
                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className={currentStep === 1 ? "font-medium" : ""}>
                            Personal Information
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          {currentStep > 2 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentStep === 2 ? (
                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className={currentStep === 2 ? "font-medium" : ""}>
                            Medical Information
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          {currentStep > 3 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentStep === 3 ? (
                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className={currentStep === 3 ? "font-medium" : ""}>
                            Functional Assessment
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          {currentStep > 4 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentStep === 4 ? (
                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className={currentStep === 4 ? "font-medium" : ""}>
                            Care Preferences
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          {currentStep > 5 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentStep === 5 ? (
                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className={currentStep === 5 ? "font-medium" : ""}>
                            Additional Information
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50">
                  <Button variant="outline" className="w-full" onClick={() => setShowHelpDialog(true)}>
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Assessment Guidelines
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-purple-500 mt-1" />
                      <p className="text-sm">
                        For memory care, provide detailed information about cognitive functioning and specific behaviors.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Activity className="h-4 w-4 text-blue-500 mt-1" />
                      <p className="text-sm">
                        Be specific about ADL needs to ensure proper staffing and care planning.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <PlusCircle className="h-4 w-4 text-green-500 mt-1" />
                      <p className="text-sm">
                        Note any special dietary requirements in the Additional Notes section.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Need Help */}
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AssistantAvatar />
                    <div>
                      <h3 className="font-medium">Need Help?</h3>
                      <p className="text-sm text-muted-foreground">Our team is here to assist</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    If you have questions or need assistance completing this assessment, our care advisors are ready to help.
                  </p>
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact an Advisor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
};

export default AssessmentPage;
