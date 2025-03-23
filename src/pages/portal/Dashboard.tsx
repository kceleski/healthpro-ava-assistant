
import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, Building, DollarSign, ChevronRight, Calendar, MessageSquare, Bell } from 'lucide-react';

const Dashboard = () => {
  // Dummy data for visualization
  const placementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Placements',
        data: [4, 6, 8, 5, 10, 12],
        backgroundColor: '#2563eb',
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 18000, 22000, 25000],
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const facilityTypeData = {
    labels: ['Assisted Living', 'Memory Care', 'Nursing Home', 'Independent Living'],
    datasets: [
      {
        label: 'Facilities by Type',
        data: [42, 28, 15, 35],
        backgroundColor: ['#2563eb', '#16a34a', '#9333ea', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const upcomingClients = [
    { id: 1, name: 'Mary Johnson', location: 'Phoenix, AZ', date: 'Today, 2:30 PM', type: 'Initial Consultation', avatar: null },
    { id: 2, name: 'Robert Smith', location: 'Scottsdale, AZ', date: 'Tomorrow, 11:00 AM', type: 'Facility Tour', avatar: null },
    { id: 3, name: 'Susan Brown', location: 'Mesa, AZ', date: 'Jul 20, 3:15 PM', type: 'Paperwork Review', avatar: null },
  ];

  const activeFacilities = [
    { id: 1, name: 'Desert Bloom Senior Living', location: 'Phoenix, AZ', type: 'Assisted Living', availableBeds: 3 },
    { id: 2, name: 'Sunrise of Scottsdale', location: 'Scottsdale, AZ', type: 'Memory Care', availableBeds: 2 },
    { id: 3, name: 'Mesa Gardens', location: 'Mesa, AZ', type: 'Independent Living', availableBeds: 5 },
    { id: 4, name: 'Arizona Sunset Care', location: 'Tempe, AZ', type: 'Nursing Home', availableBeds: 1 },
  ];

  return (
    <PortalLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              July 2023
            </Button>
            <Button size="icon" variant="outline">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Placements</p>
                  <h3 className="text-2xl font-bold mt-1">45</h3>
                  <p className="text-xs text-green-500 mt-1">↑ 12% from last month</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <h3 className="text-2xl font-bold mt-1">28</h3>
                  <p className="text-xs text-green-500 mt-1">↑ 8% from last month</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Partner Facilities</p>
                  <h3 className="text-2xl font-bold mt-1">120</h3>
                  <p className="text-xs text-green-500 mt-1">↑ 5 new this month</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue (YTD)</p>
                  <h3 className="text-2xl font-bold mt-1">$112K</h3>
                  <p className="text-xs text-green-500 mt-1">↑ 15% from last year</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>View your placement and revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="placements">
                <TabsList className="mb-4">
                  <TabsTrigger value="placements">Placements</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
                <TabsContent value="placements">
                  <div className="h-80">
                    <BarChart data={placementData} />
                  </div>
                </TabsContent>
                <TabsContent value="revenue">
                  <div className="h-80">
                    <LineChart data={revenueData} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Facility Distribution</CardTitle>
              <CardDescription>Breakdown by facility type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <PieChart data={facilityTypeData} />
              </div>
              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                    <span className="text-sm">Assisted Living</span>
                  </div>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-600 mr-2"></div>
                    <span className="text-sm">Memory Care</span>
                  </div>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-600 mr-2"></div>
                    <span className="text-sm">Nursing Home</span>
                  </div>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Independent Living</span>
                  </div>
                  <span className="font-medium">35</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClients.map((client) => (
                  <div key={client.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || ''} alt={client.name} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.location}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{client.date}</p>
                      </div>
                      <p className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block mt-2">{client.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Arizona Facilities with Availability</CardTitle>
                <CardDescription>Facilities with open beds in your region</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeFacilities.map((facility) => (
                  <div key={facility.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                    <div className="bg-slate-100 h-10 w-10 rounded-md flex items-center justify-center">
                      <Building className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{facility.name}</p>
                        <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{facility.availableBeds} beds</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{facility.location}</p>
                      <p className="text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full inline-block mt-2">{facility.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Ava Interactions</CardTitle>
            <CardDescription>Latest conversations and actions by Ava</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Email drafted for Robert Smith</p>
                  <p className="text-sm text-muted-foreground">Follow-up after Sunrise of Scottsdale tour</p>
                  <p className="text-xs text-muted-foreground mt-1">Today, 11:23 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Client application completed</p>
                  <p className="text-sm text-muted-foreground">Mary Johnson's application to Desert Bloom Senior Living</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday, 4:15 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Appointment scheduled</p>
                  <p className="text-sm text-muted-foreground">Virtual tour of Mesa Gardens with Susan Brown</p>
                  <p className="text-xs text-muted-foreground mt-1">Jul 18, 10:30 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
