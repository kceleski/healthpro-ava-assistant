
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssessmentHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssessmentHelpDialog: React.FC<AssessmentHelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Contact Support</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentHelpDialog;
