import React, { useState } from "react";
import { MapPin, Navigation, AlertTriangle, Shield } from "lucide-react";

export default function Map() {
  const [mapView, setMapView] = useState("standard");

  const safeZones = [
    { name: "Gateway of India", type: "safe", visitors: "2.1k" },
    { name: "Marine Drive", type: "safe", visitors: "1.8k" },
    { name: "Colaba Market", type: "caution", visitors: "950" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Map Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Safety Map</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setMapView("standard")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mapView === "standard"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMapView("safety")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mapView === "safety"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Safety View
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-200 m-6 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-blue-800 font-medium">Interactive Map</p>
            <p className="text-blue-600 text-sm">GPS Location: Mumbai, India</p>
          </div>
        </div>

        {/* Location Markers */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Current Location */}
      <div className="mx-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Current Location</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gateway of India, Mumbai</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium text-sm">Safe Tourist Zone</span>
          </div>
        </div>
      </div>

      {/* Nearby Places */}
      <div className="mx-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nearby Places</h3>
        <div className="space-y-3">
          {safeZones.map((zone, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 floating-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.type === "safe" ? "bg-green-500" : "bg-yellow-500"
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{zone.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {zone.visitors} tourists nearby
                    </p>
                  </div>
                </div>
                {zone.type === "safe" ? (
                  <Shield className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}