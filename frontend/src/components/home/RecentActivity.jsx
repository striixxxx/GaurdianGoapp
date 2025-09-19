import React from 'react';
import { Clock, MapPin, Shield, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function RecentActivity() {
  const activities = [
    {
      type: 'location_update',
      title: 'Entered safe zone',
      location: 'Gateway of India, Mumbai',
      time: new Date(Date.now() - 10 * 60 * 1000),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'safety_check',
      title: 'Safety score updated',
      location: 'Score increased to 85',
      time: new Date(Date.now() - 30 * 60 * 1000),
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      type: 'route_alert',
      title: 'Route optimization',
      location: 'Suggested safer path to Marine Drive',
      time: new Date(Date.now() - 60 * 60 * 1000),
      icon: MapPin,
      color: 'text-purple-600'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-700`}>
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.location}
                  </p>
                </div>
                
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(activity.time, 'HH:mm')}
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="w-full mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
}