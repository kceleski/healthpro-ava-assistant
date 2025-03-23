
import React, { useState } from 'react';
import { MapPin, Building, Search, ChevronDown } from 'lucide-react';

const FacilityMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Assisted Living', 'Memory Care', 'Nursing Home', 'Independent Living'];

  return (
    <section id="map" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hpa-dark">
            Nationwide Facility Network
          </h2>
          <p className="text-xl text-gray-600">
            Access thousands of healthcare facilities across the country with real-time availability and detailed information
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="glass-card p-3 rounded-lg shadow-glass flex items-center space-x-2 opacity-0 animate-fade-in animation-delay-300">
              <Search className="h-5 w-5 text-hpa-blue" />
              <input
                type="text"
                placeholder="Search facilities..."
                className="bg-transparent border-none outline-none text-sm w-40 md:w-64"
              />
            </div>
            
            <div className="glass-card p-3 rounded-lg shadow-glass opacity-0 animate-fade-in animation-delay-600">
              <div className="relative">
                <select
                  className="appearance-none bg-transparent border-none outline-none text-sm w-full pr-8 text-gray-700"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-elevation h-[600px] relative opacity-0 animate-fade-in">
            <img 
              src="/lovable-uploads/79c83ee5-aaa8-4443-9d81-23afc44f40cd.png" 
              alt="HealthProAssist Facility Network" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </div>
          
          <div className="absolute bottom-8 right-8 z-10">
            <div className="glass-card p-4 rounded-lg shadow-glass max-w-xs opacity-0 animate-fade-in animation-delay-900">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-hpa-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-hpa-dark">Network Highlights</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-hpa-blue" />
                      <span>5,000+ facilities nationwide</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-hpa-blue" />
                      <span>Coverage in all 50 states</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-hpa-blue" />
                      <span>Real-time availability updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityMap;
