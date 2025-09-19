import React, { useState } from "react";
import { Phone, Globe, Shield, MapPin, AlertTriangle } from "lucide-react";

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("emergency");

  const emergencyContacts = [
    { name: "Police", number: "100", icon: Shield, color: "text-blue-600" },
    { name: "Medical Emergency", number: "108", icon: Phone, color: "text-red-600" },
    { name: "Fire Service", number: "101", icon: AlertTriangle, color: "text-orange-600" },
    { name: "Tourist Helpline", number: "1363", icon: Phone, color: "text-green-600" },
  ];

  const safetyTips = [
    "Always share your location with trusted contacts",
    "Keep emergency contacts readily available",
    "Stay in well-lit and populated areas at night",
    "Trust your instincts if something feels wrong",
    "Keep copies of important documents",
    "Research local customs and laws",
  ];

  const embassyContacts = [
    { country: "USA", phone: "+91-11-2672-2000", address: "New Delhi" },
    { country: "UK", phone: "+91-22-6650-2222", address: "Mumbai" },
    { country: "Germany", phone: "+91-11-4419-9199", address: "New Delhi" },
    { country: "Australia", phone: "+91-11-4139-9900", address: "New Delhi" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tourist Resources</h1>
        
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: "emergency", label: "Emergency", icon: Phone },
            { id: "safety", label: "Safety Tips", icon: Shield },
            { id: "embassy", label: "Embassy", icon: Globe },
          ].map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {/* Emergency Contacts */}
        {selectedCategory === "emergency" && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-red-700">In Case of Emergency</h3>
              </div>
              <p className="text-red-600 text-sm">
                Call these numbers immediately if you need help. Your location will be automatically shared.
              </p>
            </div>

            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${contact.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{contact.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24/7 Emergency Service</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Safety Tips */}
        {selectedCategory === "safety" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-blue-700">Stay Safe While Traveling</h3>
              </div>
              <p className="text-blue-600 text-sm">
                Follow these guidelines to ensure a safe and enjoyable trip.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Essential Safety Tips</h4>
              <div className="space-y-3">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Embassy Contacts */}
        {selectedCategory === "embassy" && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-700">Embassy Contacts</h3>
              </div>
              <p className="text-green-600 text-sm">
                Contact your embassy for passport issues, legal help, or other citizen services.
              </p>
            </div>

            {embassyContacts.map((embassy, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{embassy.country} Embassy</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{embassy.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${embassy.phone}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl font-medium text-center block transition-colors"
                >
                  {embassy.phone}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}