
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AssessmentSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  formData: any;
}

const AssessmentSubmitDialog: React.FC<AssessmentSubmitDialogProps> = ({ 
  open, onOpenChange, onSubmit, isSubmitting, formData 
}) => {
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      // Call the original onSubmit handler
      onSubmit();
      
      // Only proceed if we have a user ID
      if (user?.id) {
        // Call the Supabase edge function to save the assessment
        const response = await fetch("https://fktcmikrsgutyicluegr.supabase.co/functions/v1/supabase-save-assessment-fn-v1", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            formData,
            userId: user.id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to save assessment:", errorData);
          // Don't throw an error here since the UI flow already proceeded
          toast.error("Your assessment was submitted but there was an issue saving your data.");
        } else {
          toast.success("Assessment saved successfully!");
        }
      } else {
        console.warn("No user ID available, assessment not saved to database");
        toast.info("Assessment submitted. Create an account to save your assessments.");
      }
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("There was a problem saving your assessment data.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  );
};

export default AssessmentSubmitDialog;
