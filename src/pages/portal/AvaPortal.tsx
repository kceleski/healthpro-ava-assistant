
import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import NotesTemplate from '@/components/portal/NotesTemplate';
import { 
  MessageSquare, Search, Send, Map, Building, Calendar, FileText, Settings, 
  Clock, Database, User, Bell, Home, Filter, List, Grid3X3, Sparkles, 
  InfoIcon, CreditCard, Upload, Download, BarChart3, RefreshCw, Mic, 
  Landmark, Lightbulb, X, Wand2, CircleHelp, Copy, Edit, Trash
} from 'lucide-react';

const AvaPortal = () => {
  const [messageInput, setMessageInput] = useState('');
  const [aiMode, setAiMode] = useState("balanced");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autocompleteEnabled, setAutocompleteEnabled] = useState(true);
  const [proactiveEnabled, setProactiveEnabled] = useState(true);
  const [activeContentTab, setActiveContentTab] = useState("chat");
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };
  
  const facilities = [
    {
      id: 1,
      name: "Desert Bloom Senior Living",
      type: "Assisted Living & Memory Care",
      location: "Phoenix, AZ",
      rating: 4.8,
      description: "A vibrant community offering personalized care.",
      amenities: ["24/7 Staffing", "Medication Management", "Social Activities"],
      priceRange: "$3,500 - $5,500",
      availableBeds: 7,
      acceptingNew: true
    },
    {
      id: 2,
      name: "Sunrise of Scottsdale",
      type: "Assisted Living",
      location: "Scottsdale, AZ",
      rating: 4.5,
      description: "Upscale assisted living with compassionate staff.",
      amenities: ["Restaurant-style Dining", "Wellness Programs", "Transportation"],
      priceRange: "$4,200 - $6,200",
      availableBeds: 3,
      acceptingNew: true
    },
    {
      id: 3,
      name: "Mesa Gardens",
      type: "Independent Living",
      location: "Mesa, AZ",
      rating: 4.2,
      description: "Active senior living with resort-style amenities.",
      amenities: ["Swimming Pool", "Fitness Center", "Social Events"],
      priceRange: "$2,800 - $4,000",
      availableBeds: 0,
      acceptingNew: false
    },
    {
      id: 4,
      name: "Tempe Senior Village",
      type: "Memory Care",
      location: "Tempe, AZ",
      rating: 4.7,
      description: "Specialized memory care in a secure, nurturing environment.",
      amenities: ["Secured Building", "Memory Therapy", "Outdoor Gardens"],
      priceRange: "$5,200 - $6,800",
      availableBeds: 4,
      acceptingNew: true
    },
    {
      id: 5,
      name: "Chandler Retreat",
      type: "Assisted Living & Skilled Nursing",
      location: "Chandler, AZ",
      rating: 4.4,
      description: "Comprehensive care with skilled nursing on site.",
      amenities: ["24/7 Nursing", "Rehabilitation Services", "Dining Options"],
      priceRange: "$4,800 - $7,200",
      availableBeds: 2,
      acceptingNew: true
    }
  ];
  
  const conversation = [
    {
      sender: "ava",
      message: "Hello! How can I assist you today?",
      timestamp: "10:30 AM"
    },
    {
      sender: "user",
      message: "I'm looking for a memory care facility for my mother.",
      timestamp: "10:32 AM"
    },
    {
      sender: "ava",
      message: "Okay, I can help with that. What is her preferred location?",
      timestamp: "10:33 AM"
    },
    {
      sender: "user",
      message: "Phoenix, Arizona",
      timestamp: "10:34 AM"
    },
    {
      sender: "ava",
      message: "I recommend Desert Bloom Senior Living. It has specialized memory care programs.",
      timestamp: "10:35 AM"
    }
  ];
  
  const suggestedPrompts = [
    "Find assisted living facilities in Scottsdale",
    "What are the best memory care options?",
    "Can you show me facilities with a garden?",
    "What are the costs associated with senior living?"
  ];
  
  const resources = [
    {
      title: "Understanding Memory Care",
      description: "A guide to memory care facilities and services",
      category: "Educational",
      url: "#"
    },
    {
      title: "Financial Assistance Options",
      description: "Government and private programs that can help",
      category: "Financial",
      url: "#"
    },
    {
      title: "Choosing the Right Facility",
      description: "Important factors to consider",
      category: "Decision Making",
      url: "#"
    },
    {
      title: "Caregiver Support",
      description: "Resources for family caregivers",
      category: "Support",
      url: "#"
    },
    {
      title: "Moving Day Checklist",
      description: "Prepare for a smooth transition",
      category: "Practical",
      url: "#"
    },
    {
      title: "Understanding Medicare Coverage",
      description: "What Medicare does and doesn't cover for senior living",
      category: "Financial",
      url: "#"
    }
  ];
  
  const appointments = [
    {
      id: 1,
      title: "Tour with Mary Johnson",
      facility: "Desert Bloom Senior Living",
      date: "Aug 10, 2023",
      time: "2:30 PM",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Follow-up Call with David Smith",
      facility: "Phone",
      date: "Aug 12, 2023",
      time: "11:00 AM",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Assessment for James Wilson",
      facility: "Sunrise of Scottsdale",
      date: "Aug 15, 2023",
      time: "10:00 AM",
      status: "upcoming"
    }
  ];
  
  const clients = [
    {
      id: 1,
      name: "Mary Johnson",
      careNeeds: "Memory Care",
      stage: "Tour Scheduled",
      dateAdded: "Jul 15, 2023"
    },
    {
      id: 2,
      name: "James Wilson",
      careNeeds: "Assisted Living",
      stage: "Assessment",
      dateAdded: "Jul 20, 2023"
    },
    {
      id: 3,
      name: "Elizabeth Brown",
      careNeeds: "Independent Living",
      stage: "Application",
      dateAdded: "Jul 24, 2023"
    },
    {
      id: 4,
      name: "Robert Davis",
      careNeeds: "Memory Care",
      stage: "Initial Contact",
      dateAdded: "Aug 2, 2023"
    },
    {
      id: 5,
      name: "Susan Miller",
      careNeeds: "Skilled Nursing",
      stage: "Placed",
      dateAdded: "Jun 12, 2023"
    }
  ];
  
  return (
    <PortalLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Ava Assistant</h1>
          
          <div className="flex gap-2">
            <Tabs value={activeContentTab} onValueChange={setActiveContentTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="clients" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Clients</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Notes</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Main Content Area */}
          <div className="md:col-span-2 flex flex-col h-full">
            <TabsContent value="chat" className="flex-1 flex flex-col">
              <Card className="flex-1 flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                      <AvatarFallback>AVA</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Ava Assistant</CardTitle>
                      <CardDescription>AI placement specialist</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {conversation.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p>{msg.message}</p>
                            <p className={`text-xs mt-1 ${
                              msg.sender === 'user' 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>{msg.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t p-3">
                  <div className="flex w-full items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Input 
                      placeholder="Type your message..." 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Suggested Questions</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setMessageInput(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Clients Overview</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Add Client
                      </Button>
                      <div className="flex border rounded-md overflow-hidden">
                        <Button variant="ghost" size="icon" className="rounded-none h-8 w-8 border-r">
                          <List className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-none h-8 w-8">
                          <Grid3X3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    View and manage your current client placements
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Search clients..." className="max-w-sm" />
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {clients.map((client) => (
                        <div key={client.id} className="border rounded-md p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{client.name}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{client.careNeeds}</Badge>
                                <Badge 
                                  variant={
                                    client.stage === "Placed" 
                                      ? "default" 
                                      : client.stage === "Initial Contact" 
                                        ? "secondary" 
                                        : "outline"
                                  }
                                >
                                  {client.stage}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">Added {client.dateAdded}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <p className="text-sm text-muted-foreground">Showing 5 of 12 clients</p>
                    <Button variant="outline" size="sm">
                      View All Clients
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Insights</CardTitle>
                    <CardDescription>AI-generated recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Mary Johnson might prefer Desert Bloom</p>
                          <p className="text-sm text-muted-foreground">Based on her care needs and family proximity</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <InfoIcon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">James Wilson's assessment is due</p>
                          <p className="text-sm text-muted-foreground">Scheduled for tomorrow at Sunrise Scottsdale</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">New memory care opening in Phoenix</p>
                          <p className="text-sm text-muted-foreground">Might be suitable for Robert Davis's needs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Follow-ups and appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full">
                            {appointment.facility === "Phone" ? (
                              <MessageSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <Building className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{appointment.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                {appointment.date}, {appointment.time}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{appointment.facility}</p>
                          </div>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-6">
              <NotesTemplate
                clientName="Mary Johnson"
                careType="Memory Care"
                facilityName="Desert Bloom Senior Living"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notes</CardTitle>
                  <CardDescription>Access your past placement notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-start gap-3 p-4 border rounded-lg">
                          <div className="bg-muted p-2 rounded-md">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">
                                {item === 1 ? "Tour Summary - Desert Bloom" : 
                                 item === 2 ? "Care Assessment - James Wilson" :
                                 item === 3 ? "Follow-up Call - Elizabeth Brown" :
                                 item === 4 ? "Placement Note - Susan Miller" :
                                 "Initial Contact - Robert Davis"}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {item === 1 ? "Aug 3, 2023" : 
                                 item === 2 ? "Jul 29, 2023" :
                                 item === 3 ? "Jul 25, 2023" :
                                 item === 4 ? "Jul 18, 2023" :
                                 "Aug 2, 2023"}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item === 1 ? "Mary Johnson toured Desert Bloom Senior Living today..." : 
                               item === 2 ? "Completed initial care assessment for James Wilson..." :
                               item === 3 ? "Follow-up call with Elizabeth's daughter regarding..." :
                               item === 4 ? "Susan Miller has been successfully placed at..." :
                               "Initial consultation with Robert Davis and his son..."}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="sm" variant="ghost">
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    View All Notes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Appointments & Tours</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        New Event
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Manage your schedule and client tours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Today - August 7, 2023</h3>
                      <Button variant="ghost" size="sm">View in Calendar</Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">Team Meeting</h3>
                              <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
                              <p className="text-sm">Conference Room A</p>
                            </div>
                            <Badge variant="outline">In 1 hour</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="bg-green-50 p-2 rounded-full">
                          <Building className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">Tour with Robert Davis</h3>
                              <p className="text-sm text-muted-foreground">2:30 PM - 4:00 PM</p>
                              <p className="text-sm">Desert Bloom Senior Living</p>
                            </div>
                            <Badge variant="outline">Today</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" variant="outline">Confirm</Button>
                            <Button size="sm" variant="outline">Directions</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <h3 className="font-medium">Tomorrow - August 8, 2023</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="bg-purple-50 p-2 rounded-full">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">Follow-up Call with Elizabeth Brown</h3>
                              <p className="text-sm text-muted-foreground">11:00 AM - 11:30 AM</p>
                              <p className="text-sm">Phone</p>
                            </div>
                            <Badge variant="outline">Tomorrow</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" variant="outline">Prepare Notes</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="bg-amber-50 p-2 rounded-full">
                          <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">New Client Assessment</h3>
                              <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                              <p className="text-sm">Office</p>
                            </div>
                            <Badge variant="outline">Tomorrow</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" variant="outline">Prepare Forms</Button>
                            <Button size="sm" variant="ghost" className="text-red-500">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Availability</CardTitle>
                    <CardDescription>Current bed availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-3">
                        {facilities.map((facility) => (
                          <div key={facility.id} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{facility.name}</p>
                              <p className="text-sm text-muted-foreground">{facility.type}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={facility.availableBeds > 0 ? "default" : "outline"}>
                                {facility.availableBeds} beds
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {facility.acceptingNew ? "Accepting new residents" : "Waitlist only"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tour Statistics</CardTitle>
                    <CardDescription>Conversion rates and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">Tours This Month</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            +12% from last month
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-2xl font-bold">32%</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            -3% from last month
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">Placements</p>
                          <p className="text-2xl font-bold">7</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            +1 from last month
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ava Assistant Settings</CardTitle>
                  <CardDescription>Customize your AI assistant experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voice-responses">Voice Responses</Label>
                        <p className="text-sm text-muted-foreground">Enable spoken responses from Ava</p>
                      </div>
                      <Switch 
                        id="voice-responses" 
                        checked={voiceEnabled}
                        onCheckedChange={setVoiceEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-complete">Auto-Complete</Label>
                        <p className="text-sm text-muted-foreground">Suggest completions as you type</p>
                      </div>
                      <Switch 
                        id="auto-complete" 
                        checked={autocompleteEnabled}
                        onCheckedChange={setAutocompleteEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="proactive">Proactive Suggestions</Label>
                        <p className="text-sm text-muted-foreground">Allow Ava to make suggestions based on your work</p>
                      </div>
                      <Switch 
                        id="proactive" 
                        checked={proactiveEnabled}
                        onCheckedChange={setProactiveEnabled}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Behavior</h3>
                    
                    <div className="space-y-3">
                      <Label>Response Style</Label>
                      <RadioGroup defaultValue={aiMode} onValueChange={setAiMode}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="precise" id="precise" />
                          <Label htmlFor="precise">Precise & Factual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced">Balanced (Recommended)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="creative" id="creative" />
                          <Label htmlFor="creative">Creative & Conversational</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Response Length</Label>
                        <span className="text-sm text-muted-foreground">Medium</span>
                      </div>
                      <Slider 
                        defaultValue={[50]} 
                        max={100} 
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Concise</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data & Privacy</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="history" defaultChecked />
                        <label
                          htmlFor="history"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Save conversation history
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        Conversations will be saved to improve your experience
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="usage" defaultChecked />
                        <label
                          htmlFor="usage"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Allow usage analytics
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        Help us improve Ava by sharing anonymous usage data
                      </p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Recalibrate Ava's Recommendations
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <Trash className="h-4 w-4 mr-2" />
                    Clear Conversation History
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account & Subscription</CardTitle>
                  <CardDescription>Manage your account and payment settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Premium Plan</p>
                        <p className="text-sm text-muted-foreground">Unlimited queries, priority support</p>
                      </div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Usage This Month</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Queries</span>
                        <span>473 / Unlimited</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Connected Integrations</h3>
                      <p className="text-sm text-muted-foreground">CRM, EHR, and documentation systems</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="default">
                    <Landmark className="h-4 w-4 mr-2" />
                    Billing History
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-center">
                <Button variant="link" className="text-muted-foreground">
                  <CircleHelp className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </TabsContent>
          </div>
          
          {/* Sidebar - Information */}
          <div className="md:col-span-1">
            <Tabs defaultValue="facilities">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="facilities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Facilities</CardTitle>
                    <CardDescription>Based on your requirements</CardDescription>
                    <div className="flex w-full items-center space-x-2 mt-2">
                      <Input placeholder="Search facilities..." />
                      <Button size="icon" variant="ghost">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-1">
                        {facilities.map((facility) => (
                          <div key={facility.id} className="p-4 border-b hover:bg-muted/50 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{facility.name}</h3>
                              <Badge>{facility.rating} ★</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{facility.type}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Map className="h-3 w-3 mr-1" />
                              <span>{facility.location}</span>
                            </div>
                            <p className="text-sm mt-2">{facility.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {facility.amenities.slice(0, 3).map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {facility.amenities.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{facility.amenities.length - 3} more
                                </Badge>
                              )}
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-sm">{facility.priceRange}/mo</span>
                              <Button size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Senior Care Resources</CardTitle>
                    <CardDescription>Helpful information</CardDescription>
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                      <Button variant="outline" size="sm" className="rounded-full">All</Button>
                      <Button variant="outline" size="sm" className="rounded-full">Educational</Button>
                      <Button variant="outline" size="sm" className="rounded-full">Financial</Button>
                      <Button variant="outline" size="sm" className="rounded-full">Support</Button>
                      <Button variant="outline" size="sm" className="rounded-full">Practical</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4">
                        {resources.map((resource, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{resource.title}</h3>
                              <Badge variant="outline">{resource.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                            <Button variant="link" className="px-0 mt-1">Read More</Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                    <CardDescription>Data-driven recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Trending Care Needs</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Memory Care</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Assisted Living</span>
                            <span>31%</span>
                          </div>
                          <Progress value={31} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Independent Living</span>
                            <span>18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Skilled Nursing</span>
                            <span>9%</span>
                          </div>
                          <Progress value={9} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Client Success Factors</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-3xl font-bold text-blue-600">94%</p>
                          <p className="text-sm text-muted-foreground">Tour Satisfaction</p>
                        </div>
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-3xl font-bold text-green-600">82%</p>
                          <p className="text-sm text-muted-foreground">Placement Rate</p>
                        </div>
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-3xl font-bold text-amber-600">3.2</p>
                          <p className="text-sm text-muted-foreground">Tours to Place</p>
                        </div>
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-3xl font-bold text-purple-600">12d</p>
                          <p className="text-sm text-muted-foreground">Avg Decision Time</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Market Insights</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
                          <BarChart3 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Pricing Trends</p>
                            <p className="text-sm">
                              Memory care costs have increased 6% since last quarter, outpacing 
                              other care types in the Phoenix metro area.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-md">
                          <Building className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Facility Expansion</p>
                            <p className="text-sm">
                              Three new assisted living communities are scheduled to open in 
                              Scottsdale in the next 6 months, adding 240+ new beds.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
                          <Landmark className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Policy Changes</p>
                            <p className="text-sm">
                              New state regulations for memory care facilities take effect next 
                              month, requiring enhanced staffing ratios during night shifts.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Market Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AvaPortal;
