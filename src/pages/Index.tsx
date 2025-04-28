
import React, { useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FacilityMap from '@/components/home/FacilityMap';
import CallToAction from '@/components/home/CallToAction';
import ProcessSteps from '@/components/home/ProcessSteps';
import ContactSection from '@/components/home/ContactSection';
import AvaAssistant from '@/components/ui/AvaAssistant';
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <ProcessSteps />
        <FacilityMap />
        <CallToAction />
        <ContactSection />
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
