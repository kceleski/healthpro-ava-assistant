import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            We couldn't find the page you're looking for. The page may have been moved, 
            deleted, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/portal/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for something specific?</p>
          <div className="flex justify-center">
            <Button variant="ghost" size="sm">
              <Search className="h-3.5 w-3.5 mr-1.5" />
              Search Facilities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
