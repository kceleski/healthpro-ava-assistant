
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-hpa-blue/10 to-blue-100/20 z-[-1]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card py-16 px-6 md:px-12 rounded-2xl text-center shadow-elevation">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
              Ready to Revolutionize Your Placement Process?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of healthcare placement professionals who are streamlining their workflow with Ava
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white/80 py-2 px-4 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Free 14-day trial</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/80 py-2 px-4 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">No credit card required</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/80 py-2 px-4 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-8 py-6 text-lg font-medium">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-hpa-blue text-hpa-blue hover:bg-blue-50 px-8 py-6 text-lg font-medium">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
