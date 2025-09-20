import React, { useEffect, useState } from "react";
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

export const facts = [
  "Did you know? Most travel-related thefts happen in crowded public transport areas.",
  "Did you know? Sharing your live location with friends can reduce emergency response time by 40%.",
  "Did you know? Bright-colored clothing makes you more visible in low-light conditions.",
  "Did you know? Writing emergency contacts on paper can save you if your phone battery dies.",
  "Did you know? Carrying a whistle is one of the simplest personal safety tools.",
  "Did you know? Keeping copies of documents in email/cloud can speed up embassy help if you lose them.",
];

export default function DidYouKnow({ onContinue }) {
  const [fact, setFact] = useState("");
  const icons = [Mountain, Landmark, Trees, Camera, Map, Plane, Building, Ship, Umbrella, Sun];

  // Pick a random fact on mount
  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  // Build a semi-grid of positions to reduce big overlaps
  const doodlePositions = [];
  const cols = 15;
  const rows = 10;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      doodlePositions.push({
        top: y * (100 / rows) + Math.random() * 4,   // small random jitter
        left: x * (100 / cols) + Math.random() * 4,
      });
    }
  }

  if (!fact) return null;

  return (
    <div
      className="relative flex items-center justify-center min-h-screen
                 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
                 overflow-hidden"
    >
      {/* ---------- Random Whitish Travel Doodles ---------- */}
      {doodlePositions.map((pos, i) => {
        const Icon = icons[i % icons.length];
        const size = 12 + Math.random() * 16; // 12–28 px
        const rotation = Math.random() * 360;
        return (
          <Icon
            key={i}
            className="absolute text-white opacity-20 mix-blend-screen"
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

      {/* ---------- Center Info Card ---------- */}
      <div
        className="relative z-10 bg-white/90 dark:bg-gray-800/80
                   backdrop-blur-md rounded-3xl shadow-2xl
                   border border-gray-300 dark:border-gray-600
                   p-10 max-w-lg mx-4 text-center"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Did You Know?
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
          {fact}
        </p>
        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:from-blue-600 hover:to-indigo-700
                     text-white font-semibold px-10 py-4 rounded-xl
                     shadow-md transition-transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
