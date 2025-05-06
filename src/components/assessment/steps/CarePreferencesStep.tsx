
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentFormData } from '@/types/assessment';

interface CarePreferencesStepProps {
  formData: AssessmentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const CarePreferencesStep: React.FC<CarePreferencesStepProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
}) => {
  return (
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
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-pets" 
              checked={formData.amenities.includes("pets")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-pets", checked === true)}
            />
            <label htmlFor="amenities-pets" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Pets
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-parking" 
              checked={formData.amenities.includes("parking")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-parking", checked === true)}
            />
            <label htmlFor="amenities-parking" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Parking
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-gym" 
              checked={formData.amenities.includes("gym")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-gym", checked === true)}
            />
            <label htmlFor="amenities-gym" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Gym
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-restaurant" 
              checked={formData.amenities.includes("restaurant")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-restaurant", checked === true)}
            />
            <label htmlFor="amenities-restaurant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Restaurant
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-wifi" 
              checked={formData.amenities.includes("wifi")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-wifi", checked === true)}
            />
            <label htmlFor="amenities-wifi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Wi-Fi
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="amenities-pool" 
              checked={formData.amenities.includes("pool")} 
              onCheckedChange={(checked) => handleCheckboxChange("amenities-pool", checked === true)}
            />
            <label htmlFor="amenities-pool" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Pool
            </label>
          </div>
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
  );
};

export default CarePreferencesStep;
