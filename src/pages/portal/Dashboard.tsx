import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { 
  User, Calendar, Building, MapPin, BarChart3, PlusCircle, Search, 
  ArrowRight, Phone, Mail, ChevronRight, Clock, FileText, CalendarClock, 
  AlertCircle, Filter, Home, BellRing, CheckCircle, PieChart, Activity,
  MoreHorizontal, Download, Printer, Share2, RefreshCw, Star, Users, 
  Clipboard
} from 'lucide-react';

// Generate random percentage for demo
const randomProgress = () => Math.floor(Math.random() * 100);

// Helper function for current date
const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const Dashboard = () => {
  const [period, setPeriod] = useState('week');
  const [addClientDialog, setAddClientDialog] = useState(false);
  const currentDate = getCurrentDate();
  
  // Mock data for dashboard
  const stats = {
    activeClients: 24,
    pendingAssessments: 6,
    scheduledTours: 8,
    completedPlacements: 15
  };
  
  const taskCompletion = {
    assessments: randomProgress(),
    tours: randomProgress(),
    placements: randomProgress()
  };
  
  const recentClients = [
    {
      id: '1',
      name: 'Mary Johnson',
      avatar: "/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png",
      careType: 'Memory Care',
      status: 'Active',
      dateAdded: '2023-07-15',
      location: 'Phoenix, AZ'
    },
    {
      id: '2',
      name: 'James Wilson',
      avatar: "",
      careType: 'Assisted Living',
      status: 'Assessment',
      dateAdded: '2023-07-20',
      location: 'Scottsdale, AZ'
    },
    {
      id: '3',
      name: 'Elizabeth Brown',
      avatar: "",
      careType: 'Independent Living',
      status: 'Tour Scheduled',
      dateAdded: '2023-07-24',
      location: 'Mesa, AZ'
    },
    {
      id: '4',
      name: 'Robert Davis',
      avatar: "",
      careType: 'Memory Care',
      status: 'Application',
      dateAdded: '2023-08-02',
      location: 'Chandler, AZ'
    },
    {
      id: '5',
      name: 'Susan Miller',
      avatar: "",
      careType: 'Skilled Nursing',
      status: 'Placed',
      dateAdded: '2023-06-12',
      location: 'Gilbert, AZ'
    }
  ];
  
  const upcomingAppointments = [
    {
      id: '1',
      title: 'Tour with Mary Johnson',
      facility: 'Desert Bloom Senior Living',
      date: 'Aug 10, 2023',
      time: '2:30 PM',
      type: 'facility-tour'
    },
    {
      id: '2',
      title: 'Assessment for James Wilson',
      facility: 'Office',
      date: 'Aug 11, 2023',
      time: '10:00 AM',
      type: 'assessment'
    },
    {
      id: '3',
      title: 'Follow-up Call with David Smith',
      facility: 'Phone',
      date: 'Aug 12, 2023',
      time: '11:00 AM',
      type: 'call'
    }
  ];
  
  const topFacilities = [
    {
      id: '1',
      name: 'Desert Bloom Senior Living',
      type: 'Memory Care & Assisted Living',
      placements: 7,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Sunrise of Scottsdale',
      type: 'Assisted Living',
      placements: 5,
      rating: 4.5
    },
    {
      id: '3',
      name: 'Arizona Sunset Care',
      type: 'Memory Care',
      placements: 3,
      rating: 4.3
    }
  ];
  
  const notifications = [
    {
      id: '1',
      title: 'New Assessment Completed',
      description: 'Assessment for James Wilson is ready for review',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Tour Confirmation',
      description: 'Mary Johnson confirmed tour at Desert Bloom',
      time: '4 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Placement Successful',
      description: 'Susan Miller has been placed at Sunrise of Scottsdale',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      title: 'Document Upload',
      description: 'Elizabeth Brown uploaded medical records',
      time: '2 days ago',
      read: true
    }
  ];
  
  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="week" onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => setAddClientDialog(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <p className="text-3xl font-bold">{stats.activeClients}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium">+4</span>
                <span className="text-muted-foreground ml-1">from last {period}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Assessments</p>
                  <p className="text-3xl font-bold">{stats.pendingAssessments}</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <Clipboard className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-amber-500 font-medium">+2</span>
                <span className="text-muted-foreground ml-1">need attention</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Tours</p>
                  <p className="text-3xl font-bold">{stats.scheduledTours}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium">+3</span>
                <span className="text-muted-foreground ml-1">this {period}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Placements</p>
                  <p className="text-3xl font-bold">{stats.completedPlacements}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Home className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium">+2</span>
                <span className="text-muted-foreground ml-1">from last {period}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>Progress for this {period}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Assessments</span>
                  <span className="font-medium">{taskCompletion.assessments}%</span>
                </div>
                <Progress value={taskCompletion.assessments} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tours Conducted</span>
                  <span className="font-medium">{taskCompletion.tours}%</span>
                </div>
                <Progress value={taskCompletion.tours} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Placement Success</span>
                  <span className="font-medium">{taskCompletion.placements}%</span>
                </div>
                <Progress value={taskCompletion.placements} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/clients">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px]">
                <div className="space-y-4">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {client.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          client.status === 'Active' ? 'default' :
                          client.status === 'Assessment' ? 'secondary' :
                          client.status === 'Tour Scheduled' ? 'outline' :
                          client.status === 'Placed' ? 'success' :
                          'outline'
                        }>
                          {client.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{client.careType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/calendar">
                  View Calendar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-full ${
                      appointment.type === 'facility-tour' ? 'bg-blue-100' :
                      appointment.type === 'assessment' ? 'bg-amber-100' :
                      'bg-green-100'
                    }`}>
                      {appointment.type === 'facility-tour' ? (
                        <Building className={`h-4 w-4 ${
                          appointment.type === 'facility-tour' ? 'text-blue-600' :
                          appointment.type === 'assessment' ? 'text-amber-600' :
                          'text-green-600'
                        }`} />
                      ) : appointment.type === 'assessment' ? (
                        <ClipboardList className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Phone className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appointment.title}</p>
                      <p className="text-sm text-muted-foreground">{appointment.facility}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Facilities & Notifications */}
          <div className="space-y-6">
            {/* Top Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Top Facilities</CardTitle>
                <CardDescription>By placement rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFacilities.map((facility) => (
                    <div key={facility.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{facility.name}</p>
                        <p className="text-sm text-muted-foreground">{facility.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{facility.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{facility.placements} placements</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center pb-2">
                <CardTitle className="flex-1">Notifications</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Mark All Read
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className={`flex gap-3 ${!notification.read ? 'bg-muted/50' : ''} p-2 rounded-md`}>
                      <div className={`p-2 rounded-full shrink-0 ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <BellRing className={`h-4 w-4 ${!notification.read ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      <div className="space-y-1">
                        <p className={`text-sm font-medium ${!notification.read ? '' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
