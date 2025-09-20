import React, { useState } from 'react';
import { QrCode, Copy, Check, Shield } from 'lucide-react';

export default function DigitalIdCard({ user, isGuestMode = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    const digitalId = user?.digital_id || 'DID:TS:2024:DEMO001';
    try {
      await navigator.clipboard.writeText(digitalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      console.log('Digital ID:', digitalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white mb-8 floating-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Digital Tourist ID</h3>
          <p className="text-blue-100 text-sm">
            {isGuestMode ? "Demo Version" : "Blockchain Verified"}
          </p>
        </div>
        <Shield className="w-8 h-8 text-blue-200" />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-blue-100 text-sm mb-1">Tourist Name</p>
            <p className="text-xl font-bold">{user?.full_name || "Demo Tourist"}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-blue-100 text-sm mb-1">Digital ID</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono bg-blue-700/50 px-3 py-1 rounded-lg">
                {user?.digital_id || 'DID:TS:2024:DEMO001'}
              </p>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-blue-700/50 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-blue-100 text-sm mb-1">Nationality</p>
            <p className="font-medium">{user?.nationality || "India"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <QrCode className="w-20 h-20 text-gray-900" />
          <p className="text-xs text-gray-600 mt-2 text-center">Scan for ID</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-blue-500/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-100">
            Status: {isGuestMode ? "Demo" : "Verified"}
          </span>
          <span className="text-blue-100">Valid until: Dec 2024</span>
        </div>
      </div>
    </div>
  );
}