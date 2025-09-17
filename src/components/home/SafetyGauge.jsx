import React from 'react';
import { Shield, TrendingUp, TrendingDown } from 'lucide-react';

export default function SafetyGauge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Safety Score</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">AI-calculated risk assessment</p>
        </div>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-medium">+2 today</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ${getScoreColor(score)}`}
            />
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-8 h-8 ${getScoreColor(score)}`} />
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {getScoreStatus(score)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">12</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Safe Zones</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">2</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Caution Areas</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">0</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">High Risk</div>
        </div>
      </div>
    </div>
  );
}