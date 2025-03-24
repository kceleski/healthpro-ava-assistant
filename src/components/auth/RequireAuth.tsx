
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole, AlertCircle } from 'lucide-react';

// This is a temporary mock authentication check
// In a real application, this would connect to your authentication system
const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};

// Mock login function - in a real app, this would use proper auth
export const mockLogin = () => {
  localStorage.setItem('authenticated', 'true');
};

// Mock logout function
export const mockLogout = () => {
  localStorage.setItem('authenticated', 'false');
};

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <LockKeyhole className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription>
              You need to be logged in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 text-sm">
                  This feature is available only for healthcare placement specialists. 
                  Please log in to view the interactive facility map.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button 
              className="w-full" 
              onClick={() => {
                mockLogin();
                window.location.reload();
              }}
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
