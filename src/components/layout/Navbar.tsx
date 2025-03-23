
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 lg:px-8',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-subtle py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" 
              alt="HealthProAssist Logo" 
              className="h-10" 
            />
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-hpa-dark hover:text-hpa-blue font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-hpa-dark hover:text-hpa-blue font-medium">
            How It Works
          </a>
          <a href="#map" className="text-hpa-dark hover:text-hpa-blue font-medium">
            Network
          </a>
          <a href="#contact" className="text-hpa-dark hover:text-hpa-blue font-medium">
            Contact
          </a>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-hpa-blue hover:bg-blue-600 text-white font-medium px-6">
            Log In <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <button 
          className="md:hidden text-hpa-dark" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-hpa-dark hover:text-hpa-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-hpa-dark hover:text-hpa-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#map" 
              className="text-hpa-dark hover:text-hpa-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Network
            </a>
            <a 
              href="#contact" 
              className="text-hpa-dark hover:text-hpa-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="bg-hpa-blue hover:bg-blue-600 text-white font-medium w-full mt-2">
              Log In <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
