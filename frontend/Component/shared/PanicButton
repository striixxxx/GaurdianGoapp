import React, { useState } from 'react';
import { AlertTriangle, Phone, Volume2 } from 'lucide-react';

export default function PanicButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handlePanicPress = async () => {
    setIsPressed(true);
    setIsActivating(true);

    try {
      // In a real app, this would create an alert in the database
      // For demo purposes, we'll just simulate the process
      
      // Simulate siren sound and emergency response
      setTimeout(() => {
        setIsActivating(false);
        setIsPressed(false);
        // In a real app, this would trigger actual emergency protocols
        alert('Demo: Emergency services would be notified in a real scenario. Your location would be shared with authorities and emergency contacts.');
      }, 3000);

    } catch (error) {
      console.log('Demo mode: Panic button simulation');
      setIsActivating(false);
      setIsPressed(false);
      alert('Demo: Emergency services would be notified in a real scenario.');
    }
  };

  return (
    <>
      {/* Panic Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={handlePanicPress}
          disabled={isActivating}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 floating-shadow ${
            isPressed 
              ? 'bg-red-700 scale-110' 
              : 'bg-red-600 hover:bg-red-700 hover:scale-105'
          }`}
          style={{
            animation: isActivating ? 'pulse 1s infinite' : 'none'
          }}
        >
          {isActivating ? (
            <Volume2 className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Activation Overlay */}
      {isActivating && (
        <div className="fixed inset-0 bg-red-600/90 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 mx-6 text-center max-w-sm">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600 animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">SOS Activated</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Emergency services are being notified. Your location has been shared with:
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Local Police Department</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-600" />
                <span>Emergency Contacts</span>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-3000 ease-linear"
                style={{ width: '100%' }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Connecting to emergency services...</p>
          </div>
        </div>
      )}
    </>
  );
}