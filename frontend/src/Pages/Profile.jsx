import React, { useState, useEffect, useCallback } from "react";
import { User } from "@/entities/User";
import { Settings, Globe, Moon, Sun, Share2, Bell, LogOut } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [preferences, setPreferences] = useState({
    language: "english",
    theme: "light",
    location_sharing: true,
    notifications: true,
  });

  // Mock user data for demo mode
  const mockUser = {
    full_name: "Demo Tourist",
    email: "demo@touristsafe.com",
    digital_id: "DID:TS:2024:DEMO001",
    nationality: "India",
    safety_score: 85,
    emergency_contacts: [
      {name: "Emergency Contact", phone: "+91-98765-43211", relationship: "Family"}
    ]
  };

  const loadUserData = useCallback(async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsGuestMode(false);
      if (currentUser.preferences) {
        setPreferences(currentUser.preferences);
      }
    } catch (error) {
      console.log("Using guest mode due to authentication error");
      setUser(mockUser);
      setIsGuestMode(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const updatePreferences = async (newPreferences) => {
    const updatedPrefs = { ...preferences, ...newPreferences };
    setPreferences(updatedPrefs);
    
    if (!isGuestMode) {
      try {
        await User.updateMyUserData({
          preferences: updatedPrefs
        });
      } catch (error) {
        console.log("Could not save preferences - guest mode");
      }
    }
  };

  const languages = [
    { code: "english", name: "English" },
    { code: "hindi", name: "हिन्दी" },
    { code: "marathi", name: "मराठी" },
    { code: "tamil", name: "தமிழ்" },
    { code: "telugu", name: "తెలుగు" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
        {isGuestMode && (
          <p className="text-sm text-blue-600 mt-1">Demo Mode - Sign in for full features</p>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.full_name?.charAt(0) || "D"}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.full_name || "Demo Tourist"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{user?.email || "demo@touristsafe.com"}</p>
              <p className="text-sm text-blue-600 font-medium">
                Digital ID: {user?.digital_id || "DID:TS:2024:DEMO001"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <div className="text-2xl font-bold text-green-600">{user?.safety_score || 85}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Safety Score</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Days Traveled</div>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            App Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {preferences.theme === "light" ? (
                  <Sun className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <button
                  onClick={() => updatePreferences({ theme: "light" })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    preferences.theme === "light"
                      ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => updatePreferences({ theme: "dark" })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    preferences.theme === "dark"
                      ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Language</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                </div>
              </div>
              <select
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value })}
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl px-4 py-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Privacy & Safety</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location Sharing</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow app to share your location</p>
                </div>
              </div>
              <button
                onClick={() => updatePreferences({ location_sharing: !preferences.location_sharing })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.location_sharing ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.location_sharing ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive safety alerts and updates</p>
                </div>
              </div>
              <button
                onClick={() => updatePreferences({ notifications: !preferences.notifications })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.notifications ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.notifications ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Emergency Contacts</h3>
          
          <div className="space-y-3">
            {(user?.emergency_contacts || []).map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                </div>
                <p className="text-sm font-medium text-blue-600">{contact.phone}</p>
              </div>
            ))}
            
            {(!user?.emergency_contacts || user.emergency_contacts.length === 0) && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p className="mb-2">No emergency contacts added</p>
                <button className="text-blue-600 font-medium">Add Emergency Contact</button>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        {!isGuestMode && (
          <button
            onClick={async () => {
              try {
                await User.logout();
                window.location.reload();
              } catch (error) {
                console.log("Logout error:", error);
                window.location.reload();
              }
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-3xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        )}
        
        {isGuestMode && (
          <button
            onClick={() => {
              alert("Sign-in functionality would be available in the full version of the app.");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-3xl font-medium transition-colors"
          >
            Sign In for Full Features
          </button>
        )}
      </div>
    </div>
  );
}