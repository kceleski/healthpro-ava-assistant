import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, ArrowUpRight, Users, Building, Calendar, Clock, Activity, ArrowUp, ArrowDown, BellIcon, DollarSignIcon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for charts
const clientData = [
  { month: "Jan", new: 5, active: 35 },
  { month: "Feb", new: 7, active: 42 },
  { month: "Mar", new: 10, active: 52 },
  { month: "Apr", new: 8, active: 60 },
  { month: "May", new: 12, active: 72 },
  { month: "Jun", new: 15, active: 87 },
];

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

const facilityTypeData = [
  { name: 'Assisted Living', value: 42 },
  { name: 'Memory Care', value: 28 },
  { name: 'Nursing Home', value: 15 },
  { name: 'Independent Living', value: 35 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const recentActivityData = [
  {
    id: 1,
    description: "New client Mary Johnson placed at Desert Bloom",
    time: "5 mins ago",
    type: "placement",
  },
  {
    id: 2,
    description: "Robert Smith scheduled for facility tour",
    time: "30 mins ago",
    type: "appointment",
  },
  {
    id: 3,
    description: "Payment received from Mesa Gardens",
    time: "1 hour ago",
    type: "payment",
  },
];

const upcomingAppointmentsData = [
  {
    id: 1,
    name: "Mary Johnson",
    time: "Today, 2:30 PM",
    location: "Phoenix, AZ",
    type: "Initial Consultation",
  },
  {
    id: 2,
    name: "Robert Smith",
    time: "Tomorrow, 11:00 AM",
    location: "Scottsdale, AZ",
    type: "Facility Tour",
  },
];

const Dashboard = () => {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              July 2023
            </Button>
            <Button size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
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
                  <DollarSignIcon className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Client Growth</CardTitle>
                  <CardDescription>New and active clients over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={clientData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="new" fill="#8884d8" name="New Clients" />
                        <Bar dataKey="active" fill="#82ca9d" name="Active Clients" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Placements by Month</CardTitle>
                  <CardDescription>Number of placements made each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={clientData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="new" stroke="#8884d8" name="New Clients" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Placement Types</CardTitle>
                  <CardDescription>Distribution by facility type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={facilityTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {facilityTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>Recent activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="divide-y divide-border">
                      {recentActivityData.map((activity) => (
                        <div key={activity.id} className="py-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointmentsData.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.name}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.location}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client List</CardTitle>
                <CardDescription>Manage and view all clients</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Client list content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="placements">
            <Card>
              <CardHeader>
                <CardTitle>Placement Details</CardTitle>
                <CardDescription>View placement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Placement details content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Track revenue and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Financial overview content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
