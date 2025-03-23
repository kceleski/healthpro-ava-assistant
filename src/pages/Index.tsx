
import React, { useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FacilityMap from '@/components/home/FacilityMap';
import CallToAction from '@/components/home/CallToAction';
import AvaAssistant from '@/components/ui/AvaAssistant';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Show welcome toast on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to HealthProAssist",
        description: "Explore how Ava can transform your healthcare placement process.",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Ava intro toast
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMobile) {
        toast({
          title: "Ava is ready to assist you",
          description: "Click the chat icon in the bottom right to start a conversation.",
          duration: 5000,
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast, isMobile]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
                How Ava Works With You
              </h2>
              <p className="text-xl text-gray-600">
                From initial client contact to successful placement and beyond
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
              
              <div className="space-y-12 md:space-y-0 relative z-10">
                {/* Step 1 */}
                <div className="md:flex items-center md:space-x-10 opacity-0 animate-fade-in">
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-subtle md:text-right order-1 mb-8 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-3 text-hpa-dark">Client Engagement</h3>
                    <p className="text-gray-600">
                      Ava helps you engage with prospective clients by providing talking points, answering questions, and guiding conversations to uncover their specific needs.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-start md:justify-center order-0">
                    <div className="bg-hpa-blue w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-subtle">
                      1
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="md:flex items-center md:space-x-10 opacity-0 animate-fade-in animation-delay-300">
                  <div className="md:w-1/2 flex justify-end md:justify-center order-0">
                    <div className="bg-hpa-blue w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-subtle">
                      2
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-subtle order-1 mb-8 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-3 text-hpa-dark">Facility Matching</h3>
                    <p className="text-gray-600">
                      Based on client requirements, Ava instantly searches the database to find facilities that match their needs, budget, and location preferences.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:flex items-center md:space-x-10 opacity-0 animate-fade-in animation-delay-600">
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-subtle md:text-right order-1 mb-8 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-3 text-hpa-dark">Automated Communication</h3>
                    <p className="text-gray-600">
                      Ava handles routine communications with clients and facilities, sending updates, appointment reminders, and follow-ups automatically.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-start md:justify-center order-0">
                    <div className="bg-hpa-blue w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-subtle">
                      3
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="md:flex items-center md:space-x-10 opacity-0 animate-fade-in animation-delay-900">
                  <div className="md:w-1/2 flex justify-end md:justify-center order-0">
                    <div className="bg-hpa-blue w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-subtle">
                      4
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-subtle order-1 mb-8 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-3 text-hpa-dark">Documentation Generation</h3>
                    <p className="text-gray-600">
                      From applications to transfer notes and invoices, Ava automatically generates all necessary documentation with precision and accuracy.
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="md:flex items-center md:space-x-10 opacity-0 animate-fade-in animation-delay-1200">
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-subtle md:text-right order-1">
                    <h3 className="text-2xl font-semibold mb-3 text-hpa-dark">Successful Placement</h3>
                    <p className="text-gray-600">
                      Finalize the placement with Ava handling all the administrative details while you focus on providing personal support to your client during transition.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-start md:justify-center order-0">
                    <div className="bg-hpa-blue w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-subtle">
                      5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FacilityMap />
        
        <CallToAction />
        
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
                Contact Our Team
              </h2>
              <p className="text-xl text-gray-600">
                Have questions about HealthProAssist or Ava? Our team is here to help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card p-8 rounded-xl shadow-elevation opacity-0 animate-fade-in animation-delay-300">
                <h3 className="text-2xl font-semibold mb-6 text-hpa-dark">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-6 py-2 w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="opacity-0 animate-fade-in animation-delay-600">
                <div className="glass-card p-8 rounded-xl shadow-elevation mb-8">
                  <h3 className="text-2xl font-semibold mb-6 text-hpa-dark">Schedule a Demo</h3>
                  <p className="text-gray-600 mb-6">
                    See Ava in action with a personalized demo tailored to your specific needs and workflows.
                  </p>
                  <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-6 py-2 w-full">
                    Book a Demo
                  </Button>
                </div>
                
                <div className="glass-card p-8 rounded-xl shadow-elevation">
                  <h3 className="text-2xl font-semibold mb-6 text-hpa-dark">Support Resources</h3>
                  <ul className="space-y-4 text-gray-600">
                    <li>
                      <a href="#" className="hover:text-hpa-blue transition flex items-center">
                        <ArrowUp className="h-4 w-4 rotate-45 mr-2" />
                        <span>Knowledge Base</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-hpa-blue transition flex items-center">
                        <ArrowUp className="h-4 w-4 rotate-45 mr-2" />
                        <span>Video Tutorials</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-hpa-blue transition flex items-center">
                        <ArrowUp className="h-4 w-4 rotate-45 mr-2" />
                        <span>FAQ</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-hpa-blue transition flex items-center">
                        <ArrowUp className="h-4 w-4 rotate-45 mr-2" />
                        <span>User Guides</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AvaAssistant />
      
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 bg-white text-hpa-blue rounded-full p-3 shadow-elevation hover:bg-blue-50 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
