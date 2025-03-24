import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  User, Phone, Mail, MapPin, Calendar, Clock, FileText, 
  FileCheck, Buildings, MessageSquare, Activity, Heart, 
  BarChart, Clipboard, CheckCircle, Home, Send, Edit, 
  PlusCircle, Trash, Download, Building
} from 'lucide-react';

const ClientDetails = () => {
  const { id } = useParams();
  const [sendMessageOpen, setSendMessageOpen] = useState(false);
  const [messageType, setMessageType] = useState("custom");
  const [messageText, setMessageText] = useState("Hello Mary, I'm following up about your tour of Desert Bloom Senior Living. Would you like to schedule a second visit? Let me know what times work best for you.");
  const [sendEmail, setSendEmail] = useState(true);
  const [sendSMS, setSendSMS] = useState(true);
  
  // Dummy client data
  const client = {
    id: 1,
    name: 'Mary Johnson',
    age: 78,
    phone: '(602) 555-1234',
    email: 'mary.johnson@example.com',
    address: '123 Cactus Lane, Phoenix, AZ 85001',
    status: 'Active',
    dateAdded: 'June 10, 2023',
    careNeeds: ['Memory Care', 'Medication Management', 'Mobility Assistance'],
    avatar: null,
    budget: {
      min: 3000,
      max: 5000,
      paymentMethod: 'Private Pay + Long-term Care Insurance'
    },
    preferredLocations: ['Phoenix', 'Scottsdale', 'Mesa'],
    healthIssues: ['Early Stage Dementia', 'Diabetes Type 2', 'Arthritis'],
    medications: ['Donepezil', 'Metformin', 'Lisinopril'],
    emergencyContact: {
      name: 'David Johnson',
      relationship: 'Son',
      phone: '(602) 555-5678',
      email: 'david.johnson@example.com'
    },
    notes: [
      { date: 'Jul 15, 2023', text: 'Initial consultation. Mary is looking for memory care with a homey atmosphere.', author: 'John Placement' },
      { date: 'Jul 20, 2023', text: 'Toured Desert Bloom Senior Living. Mary liked the garden areas and activities program.', author: 'John Placement' },
      { date: 'Jul 27, 2023', text: "Follow-up call with Mary's son David. Discussing financial options and insurance coverage.", author: 'Ava Assistant' },
      { date: 'Aug 3, 2023', text: 'Mary has narrowed choices to Desert Bloom and Sunrise of Scottsdale. Scheduling second visits.', author: 'John Placement' },
    ],
    progressSteps: [
      { id: 1, name: 'Initial Consultation', completed: true, date: 'Jul 15, 2023' },
      { id: 2, name: 'Facility Tours', completed: true, date: 'Jul 20, 2023' },
      { id: 3, name: 'Financial Assessment', completed: true, date: 'Jul 27, 2023' },
      { id: 4, name: 'Final Selection', completed: false, date: '' },
      { id: 5, name: 'Application Submission', completed: false, date: '' },
      { id: 6, name: 'Move-in Coordination', completed: false, date: '' },
    ],
    appointments: [
      { id: 1, title: 'Second Tour - Desert Bloom', date: 'Aug 10, 2023', time: '2:30 PM', location: 'Desert Bloom Senior Living', status: 'upcoming' },
      { id: 2, title: 'Second Tour - Sunrise Scottsdale', date: 'Aug 12, 2023', time: '11:00 AM', location: 'Sunrise of Scottsdale', status: 'upcoming' },
      { id: 3, title: 'Financial Planning Meeting', date: 'Aug 15, 2023', time: '10:00 AM', location: 'Virtual (Zoom)', status: 'upcoming' },
    ],
    documents: [
      { id: 1, name: 'Medical Assessment.pdf', date: 'Jul 18, 2023', type: 'Medical' },
      { id: 2, name: 'Insurance Policy.pdf', date: 'Jul 25, 2023', type: 'Financial' },
      { id: 3, name: 'Tour Preferences.docx', date: 'Jul 22, 2023', type: 'Placement' },
    ],
    recommendedFacilities: [
      { id: 1, name: 'Desert Bloom Senior Living', type: 'Memory Care', match: 95 },
      { id: 2, name: 'Sunrise of Scottsdale', type: 'Memory Care', match: 89 },
      { id: 3, name: 'Arizona Sunset Care', type: 'Memory Care', match: 78 },
    ]
  };
  
  // Calculate active step and progress percentage
  const activeStep = client.progressSteps.findIndex(step => !step.completed);
  const progressPercentage = ((activeStep) / client.progressSteps.length) * 100;
  
  // Handle message sending
  const handleSendMessage = () => {
    // In a real app, you would send the message here
    console.log("Sending message:", {
      type: messageType,
      text: messageText,
      email: sendEmail,
      sms: sendSMS
    });
    
    // Close the dialog after sending
    setSendMessageOpen(false);
  };
  
  return (
    <PortalLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={client.avatar || ''} alt={client.name} />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{client.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={client.status === 'Active' ? 'default' : 'outline'}>
                  {client.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Client since {client.dateAdded}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => setSendMessageOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm" variant="default">
              <FileCheck className="h-4 w-4 mr-2" />
              Start Application
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Client Information */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p>{client.age}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{client.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{client.address}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Emergency Contact</h3>
                  <div className="space-y-2">
                    <p className="text-sm">{client.emergencyContact.name} ({client.emergencyContact.relationship})</p>
                    <p className="text-sm">{client.emergencyContact.phone}</p>
                    <p className="text-sm">{client.emergencyContact.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Budget</h3>
                  <p className="text-sm">${client.budget.min.toLocaleString()} - ${client.budget.max.toLocaleString()}/month</p>
                  <p className="text-sm text-muted-foreground mt-1">{client.budget.paymentMethod}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Preferred Locations</h3>
                  <div className="flex flex-wrap gap-1">
                    {client.preferredLocations.map((location, index) => (
                      <Badge key={index} variant="outline">{location}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Information
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Care Needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Care Level</h3>
                  <div className="flex flex-wrap gap-1">
                    {client.careNeeds.map((need, index) => (
                      <Badge key={index} variant="secondary">{need}</Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Health Conditions</h3>
                  <ul className="space-y-1">
                    {client.healthIssues.map((issue, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Medications</h3>
                  <ul className="space-y-1">
                    {client.medications.map((med, index) => (
                      <li key={index} className="text-sm">{med}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Care Summary
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Facilities</CardTitle>
                <CardDescription>Ava's recommendations based on client profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.recommendedFacilities.map((facility) => (
                  <div key={facility.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{facility.name}</p>
                      <p className="text-sm text-muted-foreground">{facility.type}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {facility.match}% match
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Buildings className="h-4 w-4 mr-2" />
                  View All Matches
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right Column - Tabs with detailed content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="p-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Placement Progress</h3>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      Current Step: {activeStep + 1 > client.progressSteps.length 
                        ? 'Complete' 
                        : client.progressSteps[activeStep]?.name || 'Complete'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(progressPercentage)}% Complete
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid grid-cols-7 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Placement Journey</CardTitle>
                    <CardDescription>Track the client's placement process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.progressSteps.map((step) => (
                        <div key={step.id} className="flex items-start">
                          <div className={`rounded-full p-1 ${step.completed ? 'bg-green-100' : 'bg-slate-100'}`}>
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-slate-300"></div>
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`font-medium ${step.completed ? 'text-green-700' : ''}`}>{step.name}</p>
                              {step.completed && <p className="text-sm text-muted-foreground">{step.date}</p>}
                            </div>
                            {!step.completed && activeStep === client.progressSteps.findIndex(s => s.id === step.id) && (
                              <Button size="sm" className="mt-2">Start This Step</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-60 overflow-y-auto">
                        {client.notes.slice(0, 3).map((note, index) => (
                          <div key={index} className="border-l-4 border-primary pl-4 py-1">
                            <p className="text-sm">{note.text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{note.author}</p>
                              <p className="text-xs text-muted-foreground">{note.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">View All Notes</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {client.appointments.slice(0, 2).map((appointment) => (
                          <div key={appointment.id} className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-md">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{appointment.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  {appointment.date}, {appointment.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{appointment.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">View All Appointments</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for this client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 space-y-2">
                        <Buildings className="h-6 w-6" />
                        <span>Schedule Tour</span>
                      </Button>
                      
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 space-y-2">
                        <FileText className="h-6 w-6" />
                        <span>Add Document</span>
                      </Button>
                      
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 space-y-2">
                        <MessageSquare className="h-6 w-6" />
                        <span>Contact Family</span>
                      </Button>
                      
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 space-y-2">
                        <Activity className="h-6 w-6" />
                        <span>Update Status</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Client Notes</CardTitle>
                      <CardDescription>All notes and updates for this client</CardDescription>
                    </div>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {client.notes.map((note, index) => (
                        <div key={index} className="border rounded-md p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="" alt={note.author} />
                                <AvatarFallback>{note.author[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{note.author}</p>
                                <p className="text-sm text-muted-foreground">{note.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="icon" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-4">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Appointments</CardTitle>
                      <CardDescription>Scheduled meetings and facility tours</CardDescription>
                    </div>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.appointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-md">
                                  <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{appointment.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.date}, {appointment.time}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">{appointment.location}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Client records and paperwork</CardDescription>
                    </div>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-md">
                              <FileText className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-muted-foreground">{document.date}</p>
                                <Badge variant="outline" className="text-xs">{document.type}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="facilities" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Facilities Considered</CardTitle>
                      <CardDescription>Facilities the client has viewed or is interested in</CardDescription>
                    </div>
                    <Button>
                      <Buildings className="h-4 w-4 mr-2" />
                      Add Facility
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.recommendedFacilities.map((facility) => (
                        <Card key={facility.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="bg-slate-100 p-2 rounded-md">
                                  <Building className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{facility.name}</h3>
                                  <p className="text-sm text-muted-foreground">{facility.type}</p>
                                  <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                                    {facility.match}% match
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Button size="sm">Schedule Tour</Button>
                                <Button size="sm" variant="outline">Contact</Button>
                                <Button size="sm" variant="outline">View Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>