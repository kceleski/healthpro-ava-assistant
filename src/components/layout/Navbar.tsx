
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-subtle' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <RouterLink to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
                alt="HealthProAssist Logo" 
                className="h-8 w-auto"
              />
              <span className="font-semibold text-lg text-hpa-dark">HealthProAssist</span>
            </RouterLink>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <RouterLink to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
              Home
            </RouterLink>
            <RouterLink to="/facilities-map" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
              Facility Map
            </RouterLink>
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors flex items-center">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Placement Services</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Care Coordination</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Family Support</a>
                </div>
              </div>
            </div>
            <RouterLink to="#about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
              About
            </RouterLink>
            <RouterLink to="#contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
              Contact
            </RouterLink>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <RouterLink to="/portal/dashboard">
              <Button variant="outline" size="sm">Client Portal</Button>
            </RouterLink>
            <RouterLink to="/portal/dashboard">
              <Button size="sm">Get Started</Button>
            </RouterLink>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-hpa-blue focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 shadow-lg bg-white">
          <RouterLink to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md">
            Home
          </RouterLink>
          <RouterLink to="/facilities-map" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md">
            Facility Map
          </RouterLink>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md">
            Services
          </a>
          <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md">
            About
          </a>
          <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md">
            Contact
          </a>
          <div className="pt-4 flex flex-col space-y-2">
            <RouterLink to="/portal/dashboard">
              <Button variant="outline" className="w-full">Client Portal</Button>
            </RouterLink>
            <RouterLink to="/portal/dashboard">
              <Button className="w-full">Get Started</Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
