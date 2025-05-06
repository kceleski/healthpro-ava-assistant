
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, Phone } from 'lucide-react';

interface AssessmentSidebarProps {
  currentStep: number;
}

// Assistant Avatar for the helper sidebar
const AssistantAvatar = () => (
  <Avatar className="h-10 w-10">
    <AvatarImage src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" alt="Ava" />
    <AvatarFallback>AVA</AvatarFallback>
  </Avatar>
);

const AssessmentSidebar: React.FC<AssessmentSidebarProps> = ({ currentStep }) => {
  return (
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
  );
};

export default AssessmentSidebar;
