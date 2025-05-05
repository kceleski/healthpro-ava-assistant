
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Database, RefreshCw, Upload } from 'lucide-react';
import { importSampleFacilities, clearAllFacilities } from '@/utils/dataImport';

export function DataImportTool() {
  const [importing, setImporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const handleImport = async () => {
    setImporting(true);
    try {
      await importSampleFacilities();
    } finally {
      setImporting(false);
    }
  };
  
  const handleClear = async () => {
    setClearing(true);
    try {
      await clearAllFacilities();
      setShowClearConfirm(false);
    } finally {
      setClearing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Data Import Tool
        </CardTitle>
        <CardDescription>
          Import sample data into the application database
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-700 mb-2">Import Sample Data</h3>
          <p className="text-sm text-blue-600 mb-4">
            This will import a set of sample facilities into the database for testing purposes.
            Existing data will not be affected.
          </p>
          <Button 
            variant="outline" 
            className="bg-white" 
            onClick={handleImport} 
            disabled={importing}
          >
            {importing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Import Sample Facilities
              </>
            )}
          </Button>
        </div>
        
        {showClearConfirm ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning: Destructive Action</AlertTitle>
            <AlertDescription>
              <p className="mb-4">This will permanently delete ALL facility data from the database. This action cannot be undone.</p>
              <div className="flex space-x-2">
                <Button 
                  variant="destructive" 
                  onClick={handleClear} 
                  disabled={clearing}
                >
                  {clearing ? "Clearing..." : "Yes, Clear All Data"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowClearConfirm(false)}
                  disabled={clearing}
                >
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="p-4 bg-red-50 rounded-md">
            <h3 className="font-medium text-red-700 mb-2">Clear All Data</h3>
            <p className="text-sm text-red-600 mb-4">
              This will remove all facilities from the database. This action is destructive and cannot be undone.
            </p>
            <Button 
              variant="outline" 
              className="bg-white text-red-600 hover:text-red-700" 
              onClick={() => setShowClearConfirm(true)}
            >
              Clear All Facilities
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        For administrative use only. This tool is not intended for production use.
      </CardFooter>
    </Card>
  );
}
