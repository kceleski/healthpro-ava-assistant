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
import { MessageSquare, Search, Send, Map, Building } from 'lucide-react';

const AvaPortal = () => {
  const [messageInput, setMessageInput] = useState('');
  
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
      priceRange: "$3,500 - $5,500"
    },
    {
      id: 2,
      name: "Sunrise of Scottsdale",
      type: "Assisted Living",
      location: "Scottsdale, AZ",
      rating: 4.5,
      description: "Upscale assisted living with compassionate staff.",
      amenities: ["Restaurant-style Dining", "Wellness Programs", "Transportation"],
      priceRange: "$4,200 - $6,200"
    },
    {
      id: 3,
      name: "Mesa Gardens",
      type: "Independent Living",
      location: "Mesa, AZ",
      rating: 4.2,
      description: "Active senior living with resort-style amenities.",
      amenities: ["Swimming Pool", "Fitness Center", "Social Events"],
      priceRange: "$2,800 - $4,000"
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
  
  return (
    <PortalLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <h1 className="text-2xl font-bold mb-6">Ava Assistant</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Main Chat Area */}
          <div className="md:col-span-2 flex flex-col h-full">
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
          </div>
          
          {/* Sidebar - Facility Information */}
          <div className="md:col-span-1">
            <Tabs defaultValue="facilities">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="facilities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Facilities</CardTitle>
                    <CardDescription>Based on your requirements</CardDescription>
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
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-3">
                        <h3 className="font-medium">Understanding Memory Care</h3>
                        <p className="text-sm text-muted-foreground mt-1">A guide to memory care facilities and services</p>
                        <Button variant="link" className="px-0 mt-1">Read More</Button>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <h3 className="font-medium">Financial Assistance Options</h3>
                        <p className="text-sm text-muted-foreground mt-1">Government and private programs that can help</p>
                        <Button variant="link" className="px-0 mt-1">Read More</Button>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <h3 className="font-medium">Choosing the Right Facility</h3>
                        <p className="text-sm text-muted-foreground mt-1">Important factors to consider</p>
                        <Button variant="link" className="px-0 mt-1">Read More</Button>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <h3 className="font-medium">Caregiver Support</h3>
                        <p className="text-sm text-muted-foreground mt-1">Resources for family caregivers</p>
                        <Button variant="link" className="px-0 mt-1">Read More</Button>
                      </div>
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
