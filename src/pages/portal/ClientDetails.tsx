import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

interface ClientDetailsProps {
  // Props if needed
}

const ClientDetails: React.FC<ClientDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock client data - replace with actual data fetching
  const client = {
    id: id || "1",
    name: "John Doe",
    age: 78,
    phone: "(480) 555-1234",
    email: "john.doe@example.com",
    address: "123 Main St, Phoenix, AZ 85004",
    careLevel: "Memory Care",
    facility: "Shadow Mountain Memory Care",
    insurance: "Medicare",
    emergency_contact: "Jane Doe (Daughter) - (480) 555-5678",
    notes: "Patient experiences confusion in the evenings. Prefers to be called Johnny."
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{client.name}</h1>
        <Button variant="outline" onClick={() => navigate("/clients")}>
          Back to Clients
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Age:</span>
              <span>{client.age}</span>
              
              <span className="text-gray-500">Phone:</span>
              <span>{client.phone}</span>
              
              <span className="text-gray-500">Email:</span>
              <span>{client.email}</span>
              
              <span className="text-gray-500">Address:</span>
              <span>{client.address}</span>
              
              <span className="text-gray-500">Care Level:</span>
              <span>{client.careLevel}</span>
              
              <span className="text-gray-500">Facility:</span>
              <span>{client.facility}</span>
              
              <span className="text-gray-500">Insurance:</span>
              <span>{client.insurance}</span>
              
              <span className="text-gray-500">Emergency Contact:</span>
              <span>{client.emergency_contact}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{client.notes}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <h2 className="text-xl font-semibold">Client Overview</h2>
          <p>Comprehensive overview of client status and recent activities.</p>
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4">
          <h2 className="text-xl font-semibold">Care Notes</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visit Notes - April 28, 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Client was in good spirits today. Medication adherence has improved.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Notes - April 15, 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Quarterly assessment completed. Cognitive function stable with some mild improvements in memory recall.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Memory Care Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Date:</strong> May 10, 2025</p>
                <p><strong>Time:</strong> 10:30 AM</p>
                <p><strong>Location:</strong> Shadow Mountain Memory Care</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical Check-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Date:</strong> May 22, 2025</p>
                <p><strong>Time:</strong> 2:00 PM</p>
                <p><strong>Location:</strong> Phoenix Medical Center</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="facilities" className="space-y-4">
          <h2 className="text-xl font-semibold">Facility Information</h2>
          <Card>
            <CardHeader>
              <CardTitle>Shadow Mountain Memory Care</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Address:</strong> 10030 N 32nd St, Phoenix, AZ 85028</p>
              <p><strong>Phone:</strong> (480) 530-5706</p>
              <p><strong>Primary Contact:</strong> Maria Rodriguez</p>
              <p><strong>Room Number:</strong> 204</p>
              <p><strong>Admitted:</strong> January 15, 2025</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <h2 className="text-xl font-semibold">Client Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Last Updated:</strong> April 12, 2025</p>
                <Button variant="outline" className="mt-2">View Document</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Care Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Last Updated:</strong> March 28, 2025</p>
                <Button variant="outline" className="mt-2">View Document</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insurance Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Last Updated:</strong> February 05, 2025</p>
                <Button variant="outline" className="mt-2">View Document</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Power of Attorney</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Last Updated:</strong> January 10, 2025</p>
                <Button variant="outline" className="mt-2">View Document</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetails;
