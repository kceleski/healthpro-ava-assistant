
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-blue-50 to-white z-[-1]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-0 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-hpa-blue font-medium text-sm">
              Introducing Ava AI Assistant
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-hpa-dark">
              Your AI-Powered <span className="text-gradient">Placement</span> Assistant
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Revolutionize your healthcare placement process with Ava, the AI assistant that helps you find the perfect facility match while automating your workflow.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-hpa-blue mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">AI-guided conversations with prospective clients</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-hpa-blue mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Instant facility searching and filtering</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-hpa-blue mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Automated communication, scheduling, and document generation</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-8 py-6 text-lg font-medium">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-hpa-blue text-hpa-blue hover:bg-blue-50 px-8 py-6 text-lg font-medium">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative lg:pl-8 opacity-0 animate-fade-in animation-delay-300">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-radial from-blue-200/50 to-transparent rounded-full animate-pulse-subtle" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
                  alt="Ava AI Assistant" 
                  className="relative z-10 w-full h-full object-cover rounded-2xl ava-shine"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg shadow-glass opacity-0 animate-fade-in-right animation-delay-600">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Client matched</p>
                    <p className="text-xs text-gray-500">Oakwood Senior Living</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass-card p-4 rounded-lg shadow-glass opacity-0 animate-fade-in-left animation-delay-900">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <div className="h-5 w-5 bg-hpa-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ava is ready</p>
                    <p className="text-xs text-gray-500">How can I help today?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
