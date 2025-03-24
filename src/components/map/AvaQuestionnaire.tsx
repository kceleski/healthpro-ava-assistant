
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define the form schema
const formSchema = z.object({
  careType: z.enum(["assisted", "memory", "independent", "nursing"], {
    required_error: "Please select what type of care you're looking for.",
  }),
  budget: z.enum(["low", "medium", "high"], {
    required_error: "Please select your budget range.",
  }),
  location: z.enum(["urban", "suburban", "rural"], {
    required_error: "Please select your preferred location type.",
  }),
});

export type QuestionnaireData = z.infer<typeof formSchema>;

interface AvaQuestionnaireProps {
  open: boolean;
  onComplete: (data: QuestionnaireData) => void;
}

const AvaQuestionnaire = ({ open, onComplete }: AvaQuestionnaireProps) => {
  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careType: undefined,
      budget: undefined,
      location: undefined,
    },
  });

  function onSubmit(data: QuestionnaireData) {
    onComplete(data);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" alt="Ava" />
              <AvatarFallback>AVA</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-xl">Help me find the right facility</DialogTitle>
          </div>
          <DialogDescription>
            Answer a few questions to help me highlight facilities that match your needs.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="careType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">What type of care are you looking for?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="independent" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Independent Living
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="assisted" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Assisted Living
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="memory" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Memory Care
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nursing" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Nursing Home
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">What is your monthly budget range?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          $2,000 - $4,000
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          $4,000 - $6,000
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          $6,000+
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">What type of location do you prefer?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="urban" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Urban (City Center)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="suburban" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Suburban
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rural" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Rural
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Search for Matching Facilities
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AvaQuestionnaire;
