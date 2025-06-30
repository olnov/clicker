import React from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationsProps {
  notifications: string[];
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 max-w-sm animate-slide-in-right"
        >
          <div className="flex items-start gap-3">
            <Bell className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm font-medium">{notification}</p>
          </div>
        </div>
      ))}
    </div>
  );
};