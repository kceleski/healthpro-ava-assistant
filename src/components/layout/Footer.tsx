
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hpa-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" 
              alt="HealthProAssist Logo" 
              className="h-10 brightness-200 contrast-75" 
            />
            <p className="text-gray-300 mt-4">
              Revolutionizing healthcare placement with AI-powered assistance for professionals.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
              </li>
              <li>
                <a href="#map" className="text-gray-300 hover:text-white transition">Our Network</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Knowledge Base</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">API Documentation</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-hpa-blue" />
                <a href="mailto:info@healthproassist.com" className="text-gray-300 hover:text-white transition">
                  info@healthproassist.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-hpa-blue" />
                <a href="tel:+18005551234" className="text-gray-300 hover:text-white transition">
                  +1 (800) 555-1234
                </a>
              </li>
              <li className="mt-4">
                <button className="bg-hpa-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                  Contact Sales
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} HealthProAssist. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
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
