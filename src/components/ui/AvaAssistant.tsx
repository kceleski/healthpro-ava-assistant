
import React, { useState } from 'react';
import { X, Minimize2, MessageCircle, Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AvaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  
  const toggleAssistant = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };
  
  const minimizeAssistant = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };
  
  const closeAssistant = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsMinimized(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here we would normally send the message to an API
      console.log("Message sent:", message);
      setMessage('');
    }
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 bg-hpa-blue text-white rounded-full p-4 shadow-elevation hover:bg-blue-600 transition-all duration-300 z-50 animate-scale"
        aria-label="Open Ava Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }
  
  if (isMinimized) {
    return (
      <div 
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-elevation rounded-full p-3 flex items-center space-x-3 z-50 cursor-pointer animate-scale"
      >
        <div className="relative">
          <img 
            src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
            alt="Ava" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <p className="font-medium text-hpa-dark text-sm">Ava is standing by</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-elevation overflow-hidden z-50 flex flex-col animate-scale">
      <div className="bg-hpa-blue p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
              alt="Ava" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-semibold">Ava Assistant</h3>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={minimizeAssistant}
            className="text-white/80 hover:text-white transition"
            aria-label="Minimize"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
          <button 
            onClick={closeAssistant}
            className="text-white/80 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex items-start space-x-3 mb-4">
          <img 
            src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
            alt="Ava" 
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
          <div className="bg-white p-3 rounded-lg shadow-subtle max-w-[80%]">
            <p className="text-gray-800">
              Hello! I'm Ava, your AI assistant. How can I help you today with healthcare placement?
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 mb-4 justify-end">
          <div className="bg-blue-50 p-3 rounded-lg shadow-subtle max-w-[80%]">
            <p className="text-gray-800">
              Can you help me find facilities with memory care units in Chicago?
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 mb-4">
          <img 
            src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
            alt="Ava" 
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
          <div className="bg-white p-3 rounded-lg shadow-subtle max-w-[80%]">
            <p className="text-gray-800">
              I found 28 facilities with memory care units in Chicago. Would you like me to filter them by availability, price range, or specific amenities?
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="text-gray-500 hover:text-hpa-blue"
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hpa-blue/40"
          />
          
          <Button 
            type="submit" 
            size="icon"
            className="bg-hpa-blue text-white hover:bg-blue-600 rounded-full"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AvaAssistant;
