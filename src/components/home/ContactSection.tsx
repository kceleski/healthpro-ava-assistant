import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                    placeholder="Your email"
                    required
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                  placeholder="Message subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="bg-hpa-blue hover:bg-blue-600 text-white px-6 py-2 w-full sm:w-auto">
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
              <Link to="/#contact">
                <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-6 py-2 w-full">
                  Book a Demo
                </Button>
              </Link>
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
  );
};

export default ContactSection;
