
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronDown, LogIn, LogOut, 
  Users, Building, MessageCircle, Clock, HeartHandshake, 
  HelpCircle, Phone, Mail, MapPin, Info, BookOpen
} from 'lucide-react';
import { mockLogin, mockLogout } from "@/components/auth/RequireAuth";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check authentication
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('authenticated') === 'true');
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  const handleLogin = () => {
    mockLogin();
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    mockLogout();
    setIsAuthenticated(false);
    navigate('/');
  };

  // Navigation menu item styling - fixed with proper TypeScript interface
  const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  
  // Add proper display name and TypeScript interface
  ListItem.displayName = "ListItem";
  
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
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem
                        href="/services/placement"
                        title="Placement Services"
                      >
                        <div className="flex items-center mb-2">
                          <Building className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Senior Living Placement</span>
                        </div>
                        Expert guidance for finding the right senior care facility
                      </ListItem>
                      <ListItem
                        href="/services/coordination"
                        title="Care Coordination"
                      >
                        <div className="flex items-center mb-2">
                          <HeartHandshake className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Coordinated Care</span>
                        </div>
                        Comprehensive care planning and management services
                      </ListItem>
                      <ListItem
                        href="/services/family-support"
                        title="Family Support"
                      >
                        <div className="flex items-center mb-2">
                          <Users className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Family Resources</span>
                        </div>
                        Resources and support for families during transitions
                      </ListItem>
                      <ListItem
                        href="/services/consultations"
                        title="Professional Consultations"
                      >
                        <div className="flex items-center mb-2">
                          <MessageCircle className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Expert Guidance</span>
                        </div>
                        One-on-one consultations with healthcare professionals
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/about/mission" title="Our Mission">
                        <div className="flex items-center mb-2">
                          <Info className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Mission & Values</span>
                        </div>
                        Learn about our commitment to improving senior care
                      </ListItem>
                      <ListItem href="/about/team" title="Our Team">
                        <div className="flex items-center mb-2">
                          <Users className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Expert Team</span>
                        </div>
                        Meet our dedicated healthcare professionals
                      </ListItem>
                      <ListItem href="/about/history" title="Our History">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Company History</span>
                        </div>
                        The journey that led to HealthProAssist
                      </ListItem>
                      <ListItem href="/blog" title="Blog & Resources">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Insights & Knowledge</span>
                        </div>
                        Expert articles and resources for healthcare providers
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hpa-blue rounded-md transition-colors">
                    Contact
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/contact/general" title="General Inquiries">
                        <div className="flex items-center mb-2">
                          <Mail className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Email Us</span>
                        </div>
                        contact@healthproassist.com
                      </ListItem>
                      <ListItem href="/contact/phone" title="Phone Support">
                        <div className="flex items-center mb-2">
                          <Phone className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Call Us</span>
                        </div>
                        (623) 300-2065
                      </ListItem>
                      <ListItem href="/contact/office" title="Office Location">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Visit Us</span>
                        </div>
                        Schedule an in-person consultation
                      </ListItem>
                      <ListItem href="/contact/help" title="Help & Support">
                        <div className="flex items-center mb-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-hpa-blue" />
                          <span>Support Center</span>
                        </div>
                        Find answers to common questions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogin}
                className="flex items-center gap-1"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
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
          
          <div className="relative">
            <button
              className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md"
              onClick={() => document.getElementById('services-dropdown').classList.toggle('hidden')}
            >
              <span>Services</span>
              <ChevronDown className="h-5 w-5" />
            </button>
            <div id="services-dropdown" className="hidden px-4 py-2 space-y-1 bg-gray-50 rounded-md ml-3">
              <a href="/services/placement" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Placement Services</a>
              <a href="/services/coordination" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Care Coordination</a>
              <a href="/services/family-support" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Family Support</a>
              <a href="/services/consultations" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Professional Consultations</a>
            </div>
          </div>
          
          <div className="relative">
            <button
              className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md"
              onClick={() => document.getElementById('about-dropdown').classList.toggle('hidden')}
            >
              <span>About</span>
              <ChevronDown className="h-5 w-5" />
            </button>
            <div id="about-dropdown" className="hidden px-4 py-2 space-y-1 bg-gray-50 rounded-md ml-3">
              <a href="/about/mission" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Our Mission</a>
              <a href="/about/team" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Our Team</a>
              <a href="/about/history" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Our History</a>
              <a href="/blog" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Blog & Resources</a>
            </div>
          </div>
          
          <div className="relative">
            <button
              className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-hpa-blue rounded-md"
              onClick={() => document.getElementById('contact-dropdown').classList.toggle('hidden')}
            >
              <span>Contact</span>
              <ChevronDown className="h-5 w-5" />
            </button>
            <div id="contact-dropdown" className="hidden px-4 py-2 space-y-1 bg-gray-50 rounded-md ml-3">
              <a href="/contact/general" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">General Inquiries</a>
              <a href="/contact/phone" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Phone Support</a>
              <a href="/contact/office" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Office Location</a>
              <a href="/contact/help" className="block py-1 text-sm text-gray-600 hover:text-hpa-blue">Help & Support</a>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1"
                onClick={handleLogin}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
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
