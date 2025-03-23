
import React from 'react';
import { 
  BrainCircuit, 
  MessageSquareText, 
  Search, 
  CalendarClock, 
  Mail, 
  FileText, 
  Building, 
  Phone, 
  Database, 
  Users, 
  PenLine, 
  Receipt
} from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay?: number;
}) => (
  <div 
    className={`glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-elevation opacity-0 animate-fade-in`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
      <Icon className="h-6 w-6 text-hpa-blue" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-hpa-dark">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Guided Conversations",
      description: "Ava helps steer discussions with clients, providing talking points and answering questions with precision."
    },
    {
      icon: Search,
      title: "Smart Facility Search",
      description: "Filter and find perfect facility matches based on client needs, preferences, and availability."
    },
    {
      icon: MessageSquareText,
      title: "Automated Messaging",
      description: "Streamline communication with clients and facilities through automated emails and text messages."
    },
    {
      icon: CalendarClock,
      title: "Appointment Management",
      description: "Track and manage your schedule, with automated reminders and follow-ups."
    },
    {
      icon: FileText,
      title: "Application Generation",
      description: "Draft client applications automatically with all required information to streamline the process."
    },
    {
      icon: Building,
      title: "Facility Integration",
      description: "Automate interactions with facilities, from inquiries to placement confirmations."
    },
    {
      icon: Phone,
      title: "VOIP Calling",
      description: "Make calls directly through the platform without sharing your personal phone number."
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Seamless access to HealthProAssist's extensive database of facilities and information."
    },
    {
      icon: Users,
      title: "Live Lead Queue",
      description: "Jump in and assist users who start solo but decide they need professional guidance."
    },
    {
      icon: PenLine,
      title: "Automated Note Taking",
      description: "Generate comprehensive transfer notes for facilities with all essential information."
    },
    {
      icon: Receipt,
      title: "Invoice Generation",
      description: "Automatically create and send invoices to facilities or draft placement agreements."
    },
    {
      icon: Mail,
      title: "Virtual Tours",
      description: "Facilitate virtual tours to ensure you're always part of the placement process."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
            Powerful Features for Healthcare Placement Pros
          </h2>
          <p className="text-xl text-gray-600">
            Ava comes equipped with everything you need to streamline your placement process from start to finish
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="glass-card p-8 rounded-xl opacity-0 animate-fade-in animation-delay-300">
              <AnimatedCounter
                value={5000}
                formatter={(val) => `${val.toLocaleString()}+`}
                className="text-4xl font-bold text-hpa-blue mb-2"
              />
              <p className="text-lg text-gray-600">Active Facilities</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl opacity-0 animate-fade-in animation-delay-600">
              <AnimatedCounter
                value={10000}
                formatter={(val) => `${val.toLocaleString()}+`}
                className="text-4xl font-bold text-hpa-blue mb-2"
              />
              <p className="text-lg text-gray-600">Placements Made</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl opacity-0 animate-fade-in animation-delay-900">
              <AnimatedCounter
                value={95}
                formatter={(val) => `${val}%`}
                className="text-4xl font-bold text-hpa-blue mb-2"
              />
              <p className="text-lg text-gray-600">Client Satisfaction</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl opacity-0 animate-fade-in animation-delay-1200">
              <AnimatedCounter
                value={40}
                formatter={(val) => `${val}%`}
                className="text-4xl font-bold text-hpa-blue mb-2"
              />
              <p className="text-lg text-gray-600">Time Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
