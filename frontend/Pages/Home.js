import React, { useState, useEffect, useCallback } from "react";
import { User } from "@/entities/User";
import SafetyGauge from "../components/home/SafetyGauge";
import DigitalIdCard from "../components/home/DigitalIdCard";
import QuickActions from "../components/home/QuickActions";
import LocationStatus from "../components/home/LocationStatus";
import PanicButton from "../components/shared/PanicButton";
import RecentActivity from "../components/home/RecentActivity";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [locationStatus, setLocationStatus] = useState({
    status: "safe",
    location: "Mumbai, Maharashtra",
    lastUpdate: new Date()
  });

  // Mock user data for demo/guest mode
  const mockUser = {
    full_name: "Demo Tourist",
    email: "demo@touristsafe.com",
    digital_id: "DID:TS:2024:DEMO001",
    nationality: "India",
    phone: "+91-98765-43210",
    safety_score: 85,
    emergency_contacts: [
      {name: "Emergency Contact", phone: "+91-98765-43211", relationship: "Family"}
    ],
    preferences: {
      language: "english",
      theme: "light",
      location_sharing: true,
      notifications: true
    }
  };

  const loadUserData = useCallback(async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsGuestMode(false);
    } catch (error) {
      // Handle guest mode or network errors
      console.log("Using guest mode due to authentication error");
      setUser(mockUser);
      setIsGuestMode(true);
    }
    setLoading(false);
  }, []);

  const updateLocation = useCallback(() => {
    // Simulate AI-driven location status updates
    const statuses = ["safe", "caution"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    setLocationStatus(prev => ({
      ...prev,
      status: randomStatus,
      lastUpdate: new Date()
    }));
  }, []);

  useEffect(() => {
    loadUserData();
    // Simulate location updates
    const interval = setInterval(() => {
      updateLocation();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [loadUserData, updateLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your safety dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Guest Mode Banner */}
      {isGuestMode && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 m-4 rounded-lg">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Demo Mode:</strong> You're viewing a demo version. Sign in for full features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Greeting Section */}
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.full_name || "Traveler"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay safe and enjoy your journey
          </p>
        </div>

        {/* Digital ID Card */}
        <DigitalIdCard user={user} isGuestMode={isGuestMode} />

        {/* Safety Gauge */}
        <div className="mb-8">
          <SafetyGauge score={user?.safety_score || 85} />
        </div>

        {/* Location Status */}
        <LocationStatus 
          status={locationStatus.status}
          location={locationStatus.location}
          lastUpdate={locationStatus.lastUpdate}
        />

        {/* Quick Actions */}
        <QuickActions user={user} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Floating Panic Button */}
      <PanicButton />
    </div>
  );
}