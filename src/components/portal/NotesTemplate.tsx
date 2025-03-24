
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, ThumbsUp, Wand2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface NotesTemplateProps {
  clientName?: string;
  careType?: string;
  facilityName?: string;
}

const NotesTemplate: React.FC<NotesTemplateProps> = ({ 
  clientName = "Client", 
  careType = "Memory Care",
  facilityName = "Desert Bloom Senior Living"
}) => {
  const [noteType, setNoteType] = useState("tour");
  const [generatedNote, setGeneratedNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const noteTemplates = {
    tour: `${clientName} toured ${facilityName} today. The client was accompanied by their daughter and seemed engaged during the tour. ${clientName} particularly liked the dining area and community spaces. We discussed the ${careType} options available at this facility, including care levels, staffing ratios, and activities specifically designed for residents with similar needs. The family had questions about medication management and the facility's approach to memory care. They are considering this as one of their top options but plan to tour two more facilities before making a decision.`,
    
    assessment: `Completed initial care assessment for ${clientName}. Based on our evaluation, ${clientName} requires ${careType} with particular attention to medication management, mobility assistance, and structured daily activities. Cognitive function assessment indicates moderate impairment with short-term memory, but long-term memory remains intact. Client can perform basic ADLs with minimal assistance but requires supervision for safety. Recommended care plan includes regular cognitive stimulation activities, medication management, and fall prevention measures. ${facilityName} would be an appropriate placement given their specialized ${careType} programs.`,
    
    followup: `Follow-up call with ${clientName}'s family regarding placement at ${facilityName}. They have narrowed their choices down to two facilities, with ${facilityName} being their top choice due to the ${careType} program and proximity to family members. We discussed financial considerations, including their long-term care insurance coverage and what additional out-of-pocket expenses they might expect. The family plans to make a final decision by the end of the week. I've provided them with the application documents for ${facilityName} and offered assistance with completing the paperwork once they're ready to move forward.`,
    
    placement: `${clientName} has been successfully placed at ${facilityName}. Move-in date is scheduled for next Monday. The facility has been provided with all necessary medical records, medication lists, and care plans. The ${careType} team at ${facilityName} will conduct their own assessment on arrival, but we've shared our comprehensive assessment to facilitate a smooth transition. Family members have been advised on what to bring and what items are not permitted. We've also scheduled a 72-hour follow-up call to ensure that ${clientName} is settling in well and that the care being provided meets expectations.`
  };
  
  const generateNote = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      setGeneratedNote(noteTemplates[noteType as keyof typeof noteTemplates]);
      setIsGenerating(false);
      
      toast({
        title: "Note Generated",
        description: "Your placement note has been created successfully",
      });
    }, 1500);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the note into your system",
    });
  };
  
  const downloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedNote], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${clientName.replace(/\s+/g, '_')}_${noteType}_note.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Note downloaded",
      description: "Your note has been saved as a text file",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Placement Notes</CardTitle>
        <CardDescription>
          Let Ava create professional documentation based on client interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Note Type</label>
          <Select defaultValue={noteType} onValueChange={setNoteType}>
            <SelectTrigger>
              <SelectValue placeholder="Select note type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tour">Tour Summary</SelectItem>
              <SelectItem value="assessment">Care Assessment</SelectItem>
              <SelectItem value="followup">Family Follow-up</SelectItem>
              <SelectItem value="placement">Placement Confirmation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={generateNote} 
          className="w-full" 
          disabled={isGenerating}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Note"}
        </Button>
        
        {generatedNote && (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/20">
              <Textarea 
                value={generatedNote}
                onChange={(e) => setGeneratedNote(e.target.value)}
                className="min-h-[200px] bg-transparent border-0 focus-visible:ring-0 p-0 resize-none"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="secondary" className="flex-1" onClick={downloadNote}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4 inline-block mr-2" />
          Rate Ava's note to help improve future suggestions
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotesTemplate;
