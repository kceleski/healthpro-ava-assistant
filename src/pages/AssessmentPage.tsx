
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
         
(Content truncated due to size limit. Use line ranges to read in chunks)