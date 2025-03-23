
import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Send, Mic, Paperclip, Download, ChevronRight, 
  UserPlus, FileText, Calendar, Clock, Settings, 
  BarChart, Bot, MessageSquare, CheckCircle, Users, 
  Building, Phone, FileCheck, Mail, Play, Pause, Trash,
  Plus, Bell, Volume2, Zap, ArrowRight
} from 'lucide-react';

const AvaPortal = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  // Dummy conversation data
  const conversations = [
    {
      id: 1, 
      time: '10:23 AM', 
      message: "Good morning John! I've prepared a summary of your day. You have 3 appointments, 2 pending client applications, and 5 facilities with new availability in the Phoenix area. What would you like me to help you with today?",
      sender: 'ava'
    },
    {
      id: 2, 
      time: '10:24 AM', 
      message: "Can you tell me about the available beds at Desert Bloom Senior Living?",
      sender: 'user'
    },
    {
      id: 3, 
      time: '10:24 AM', 
      message: "Desert Bloom Senior Living currently has 3 available beds:\n\n• 1 private room in their Memory Care unit\n• 2 companion suites in their Assisted Living wing\n\nThe private room is $5,200/month and includes specialized memory care services. The companion suites are $3,500-$4,000/month depending on the level of care needed.\n\nWould you like me to check availability for any specific clients you're working with?",
      sender: 'ava'
    },
    {
      id: 4, 
      time: '10:26 AM', 
      message: "Yes, check if any would be a good fit for Mary Johnson.",
      sender: 'user'
    },
    {
      id: 5, 
      time: '10:26 AM', 
      message: "I've analyzed Mary Johnson's care needs and preferences. The private memory care room at Desert Bloom would be a 95% match for her needs due to:\n\n✓ Her early stage dementia diagnosis\n✓ Her budget range ($3,000-$5,000/month)\n✓ Her preference for Phoenix as a location\n✓ The medication management services offered\n\nShould I prepare an email to her son David about this option? I can also schedule a tour for them if you'd like.",
      sender: 'ava'
    },
    {
      id: 6, 
      time: '10:27 AM', 
      message: "That sounds great. Please draft an email to David about this option and suggest some available tour times for next week.",
      sender: 'user'
    },
    {
      id: 7, 
      time: '10:27 AM', 
      message: "I've drafted an email to David Johnson regarding the memory care room at Desert Bloom Senior Living. I've included information about why it's a good match for Mary, the pricing, and suggested tour times for next Monday, Tuesday, and Wednesday afternoon.\n\nWould you like to review the email before I send it?",
      sender: 'ava',
      attachment: {
        type: 'email',
        name: 'Email to David Johnson.pdf',
        preview: true
      }
    },
  ];
  
  const tasks = [
    { id: 1, title: 'Draft follow-up email for Robert Smith', status: 'completed', dueDate: 'Today' },
    { id: 2, title: 'Schedule second tour at Sunrise of Scottsdale', status: 'in_progress', dueDate: 'Today' },
    { id: 3, title: 'Complete application for Mary Johnson', status: 'pending', dueDate: 'Tomorrow' },
    { id: 4, title: 'Update facility database with new pricing', status: 'pending', dueDate: 'Jul 21' },
    { id: 5, title: 'Generate monthly client report', status: 'pending', dueDate: 'Jul 25' },
  ];
  
  const insights = [
    { id: 1, title: 'Memory Care Demand Increasing', description: 'Memory care requests up 15% in Phoenix area this month', type: 'trend' },
    { id: 2, title: 'Placement Timeline Optimization', description: 'Average placement time reduced to 12 days (from 18)', type: 'improvement' },
    { id: 3, title: 'High Conversion Phrases', description: '3 key phrases identified that improve client conversion by 27%', type: 'analysis' },
    { id: 4, title: 'Tour Scheduling Peak Times', description: 'Optimal tour scheduling: Tue-Thu between 10-2pm', type: 'recommendation' },
  ];
  
  const liveLeads = [
    { id: 1, name: 'James Wilson', location: 'Mesa, AZ', careType: 'Assisted Living', timeActive: '5 min ago', stage: 'Browsing Facilities' },
    { id: 2, name: 'Sarah Thompson', location: 'Scottsdale, AZ', careType: 'Memory Care', timeActive: '12 min ago', stage: 'Started Assessment' },
    { id: 3, name: 'Michael Garcia', location: 'Phoenix, AZ', careType: 'Independent Living', timeActive: '28 min ago', stage: 'Requested Information' },
  ];
  
  const handleSend = () => {
    if (message.trim()) {
      // Logic to send message would go here
      setMessage('');
    }
  };
  
  const handleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  return (
    <PortalLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="md:col-span-2">
          <Card className="flex flex-col h-[calc(100vh-13rem)]">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Ava Assistant</h3>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-auto space-y-4">
              {conversations.map((conv) => (
                <div key={conv.id} className={`flex ${conv.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${conv.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                      : 'bg-muted rounded-tl-lg rounded-tr-lg rounded-br-lg'
                    } p-3 max-w-[80%]`}
                  >
                    {conv.sender === 'ava' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Ava • {conv.time}</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm">{conv.message}</div>
                    
                    {conv.attachment && (
                      <div className="mt-2 p-3 bg-background rounded-md border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{conv.attachment.name}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {conv.attachment.preview && (
                          <div className="mt-2 border rounded-md p-3 text-xs">
                            <p className="font-medium">Subject: Memory Care Room Available at Desert Bloom Senior Living</p>
                            <p className="mt-2">Dear David,</p>
                            <p className="mt-1">I hope this email finds you well. I wanted to let you know about an excellent memory care option for your mother, Mary, at Desert Bloom Senior Living in Phoenix...</p>
                            <p className="mt-1">[Preview truncated]</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {conv.sender === 'user' && (
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium">{conv.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <div className="flex items-center w-full gap-2">
                <Button size="icon" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="Type a message or ask Ava a question..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" variant={isRecording ? 'destructive' : 'outline'} onClick={handleRecording}>
                  {isRecording ? <Pause className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Ava Tools & Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ava Tools</CardTitle>
              <CardDescription>Quick access to Ava's capabilities</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <FileText className="h-5 w-5 mb-2" />
                <span className="text-sm">Draft Email</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <Calendar className="h-5 w-5 mb-2" />
                <span className="text-sm">Schedule Tour</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <FileCheck className="h-5 w-5 mb-2" />
                <span className="text-sm">Create Application</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <Mail className="h-5 w-5 mb-2" />
                <span className="text-sm">Send Updates</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <Users className="h-5 w-5 mb-2" />
                <span className="text-sm">Client Report</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <Building className="h-5 w-5 mb-2" />
                <span className="text-sm">Facility Search</span>
              </Button>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="tasks">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="leads">Live Leads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Ava Tasks</CardTitle>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <CardDescription>Tasks that Ava is working on</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50">
                      <div className="pt-0.5">
                        <Checkbox checked={task.status === 'completed'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge 
                            variant="outline" 
                            className={`
                              text-xs 
                              ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                                'bg-slate-100 text-slate-800'}
                            `}
                          >
                            {task.status === 'completed' ? 'Completed' : 
                              task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                          </Badge>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task for Ava
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Ava Insights</CardTitle>
                    <Button variant="ghost" size="sm">
                      <BarChart className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                  <CardDescription>AI-powered business intelligence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm">{insight.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`
                            text-xs 
                            ${insight.type === 'trend' ? 'bg-blue-100 text-blue-800' : 
                              insight.type === 'improvement' ? 'bg-green-100 text-green-800' : 
                              insight.type === 'analysis' ? 'bg-purple-100 text-purple-800' :
                              'bg-amber-100 text-amber-800'}
                          `}
                        >
                          {insight.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                      <Button size="sm" variant="ghost" className="mt-2 h-7 px-2 text-xs">
                        View Details
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="leads">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Live Leads</CardTitle>
                    <Badge className="bg-green-100 text-green-800">3 Active Now</Badge>
                  </div>
                  <CardDescription>Website visitors who need assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liveLeads.map((lead) => (
                    <div key={lead.id} className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sm">{lead.name}</h3>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">{lead.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{lead.careType}</Badge>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{lead.timeActive}</span>
                        </div>
                        <span className="text-xs">{lead.stage}</span>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Claim Lead
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ava Skills</CardTitle>
              <CardDescription>What Ava can do for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Conversational AI</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Client Communication</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Task Automation</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Analytics & Insights</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Voice Recognition</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Predictive Matching</span>
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore More Skills
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AvaPortal;
