
import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { DataImportTool } from '@/components/admin/DataImportTool';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const AdminTools = () => {
  return (
    <PortalLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Tools</h1>
      
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Administrator Access Required</AlertTitle>
        <AlertDescription>
          These tools are intended for system administrators only. Improper use can result in data loss.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataImportTool />
        
        {/* Additional admin tools can be added here */}
      </div>
    </PortalLayout>
  );
};

export default AdminTools;
