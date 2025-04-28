
import React from 'react';

const ProcessSteps = () => {
  return (
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
  );
};

export default ProcessSteps;
