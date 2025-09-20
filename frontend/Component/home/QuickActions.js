import React from 'react';
import { Share2, Map, Route, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function QuickActions({ user }) {
  const actions = [
    {
      title: 'Share Location',
      subtitle: 'Live tracking',
      icon: Share2,
      color: 'bg-blue-500',
      url: createPageUrl('Profile')
    },
    {
      title: 'View Map',
      subtitle: 'Safe routes',
      icon: Map,
      color: 'bg-green-500',
      url: createPageUrl('Map')
    },
    {
      title: 'My Itinerary',
      subtitle: '3 destinations',
      icon: Route,
      color: 'bg-purple-500',
      url: createPageUrl('Profile')
    },
    {
      title: 'Emergency',
      subtitle: 'Quick contacts',
      icon: Users,
      color: 'bg-orange-500',
      url: createPageUrl('Resources')
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={index}
              to={action.url}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 floating-shadow hover:scale-105 transition-all duration-200"
            >
              <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{action.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{action.subtitle}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}