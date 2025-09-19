import React from 'react';
import { MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export default function LocationStatus({ status, location, lastUpdate }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          text: 'Safe Zone',
          description: 'You are in a tourist-friendly area'
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          text: 'Caution Zone',
          description: 'Stay alert and follow safety guidelines'
        };
      case 'high_risk':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          text: 'High Risk Area',
          description: 'Consider moving to a safer location'
        };
      default:
        return {
          icon: MapPin,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          borderColor: 'border-gray-200 dark:border-gray-700',
          text: 'Unknown',
          description: 'Location status unavailable'
        };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <div className={`${config.bgColor} rounded-3xl p-6 border ${config.borderColor} mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm`}>
            <StatusIcon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${config.color}`}>{config.text}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Location Status</p>
          </div>
        </div>
        
        {status === 'safe' && (
          <div className="pulse-safe">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-2">{config.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200/50 dark:border-gray-700">
        <Clock className="w-3 h-3" />
        <span>Last updated: {format(lastUpdate, 'MMM d, HH:mm')}</span>
      </div>
    </div>
  );
}