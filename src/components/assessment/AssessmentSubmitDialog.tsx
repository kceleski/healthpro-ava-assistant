
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AssessmentSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const AssessmentSubmitDialog: React.FC<AssessmentSubmitDialogProps> = ({ 
  open, onOpenChange, onSubmit, isSubmitting 
}) => {
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
            onClick={onSubmit} 
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
