import React, { useState } from "react";
import {
  Mountain,
  Landmark,
  Trees,
  Camera,
  Map,
  Plane,
  Building,
  Ship,
  Umbrella,
  Sun,
} from "lucide-react";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    nationality: "",
    trip_start: "",
    trip_end: "",
  });
  const icons = [Mountain, Landmark, Trees, Camera, Map, Plane, Building, Ship, Umbrella, Sun];

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("touristUser", JSON.stringify(formData));
    localStorage.setItem("isLoggedIn", "true");
    setTimeout(() => {
      setLoading(false);
      onLogin(formData);
    }, 800);
  };

  // --- Random doodle placement ---
  const doodlePositions = [];
  const cols = 15;
  const rows = 10;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      doodlePositions.push({
        top: y * (100 / rows) + Math.random() * 4,
        left: x * (100 / cols) + Math.random() * 4,
      });
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      {/* ---- Travel doodles background ---- */}
      {doodlePositions.map((pos, i) => {
        const Icon = icons[i % icons.length];
        const size = 16 + Math.random() * 20;
        const rotation = Math.random() * 360;
        return (
          <Icon
            key={i}
            className="absolute text-white opacity-20 mix-blend-screen pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}

      {/* ---- Card ---- */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Tourist Digital ID
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Register securely to get your blockchain-backed travel ID
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name (as on Passport/Aadhaar)"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Trip Start
                </label>
                <input
                  type="date"
                  name="trip_start"
                  value={formData.trip_start}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Trip End
                </label>
                <input
                  type="date"
                  name="trip_end"
                  value={formData.trip_end}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Generate Digital ID"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
