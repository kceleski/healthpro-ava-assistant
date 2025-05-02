
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-hpa-dark pt-16 pb-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" 
              alt="HealthProAssist Logo" 
              className="h-10" 
            />
            <p className="text-gray-600 mt-4">
              Revolutionizing healthcare placement with AI-powered assistance for professionals.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com/healthproassist" className="text-gray-400 hover:text-hpa-blue transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/healthproassist" className="text-gray-400 hover:text-hpa-blue transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/healthproassist" className="text-gray-400 hover:text-hpa-blue transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/healthproassist" className="text-gray-400 hover:text-hpa-blue transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-hpa-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 hover:text-hpa-blue transition">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-hpa-blue transition">How It Works</a>
              </li>
              <li>
                <a href="/facilities-map" className="text-gray-600 hover:text-hpa-blue transition">Our Network</a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-600 hover:text-hpa-blue transition">Pricing</a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-hpa-blue transition">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-hpa-dark">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-gray-600 hover:text-hpa-blue transition">Blog</a>
              </li>
              <li>
                <a href="/knowledge" className="text-gray-600 hover:text-hpa-blue transition">Knowledge Base</a>
              </li>
              <li>
                <a href="/case-studies" className="text-gray-600 hover:text-hpa-blue transition">Case Studies</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-hpa-blue transition">FAQ</a>
              </li>
              <li>
                <a href="/api-docs" className="text-gray-600 hover:text-hpa-blue transition">API Documentation</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-hpa-dark">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-hpa-blue" />
                <a href="mailto:contact@healthproassist.com" className="text-gray-600 hover:text-hpa-blue transition">
                  contact@healthproassist.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-hpa-blue" />
                <a href="tel:+16233002065" className="text-gray-600 hover:text-hpa-blue transition">
                  (623) 300-2065
                </a>
              </li>
              <li className="mt-4">
                <a href="/contact">
                  <Button className="bg-hpa-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                    Contact Sales
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} HealthProAssist. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-500 hover:text-hpa-blue text-sm transition">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-hpa-blue text-sm transition">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-500 hover:text-hpa-blue text-sm transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
