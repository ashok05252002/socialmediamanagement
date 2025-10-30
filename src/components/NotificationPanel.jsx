import React from 'react';
import { X, BellOff, Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';

const NotificationPanel = ({ onClose }) => {
  const { panelNotifications, markPanelNotificationAsRead, markAllPanelNotificationsAsRead, clearAllPanelNotifications } = useNotification();
  const { themeColors } = useTheme();

  const getIconForType = (type) => {
    // Use theme colors for icons for consistency
    switch(type) {
      case 'success': return <CheckCircle className="w-4 h-4" style={{ color: themeColors.success }} />;
      case 'error': return <XCircle className="w-4 h-4" style={{ color: themeColors.danger }} />;
      case 'warning': return <AlertCircle className="w-4 h-4" style={{ color: themeColors.warning }} />;
      case 'info': return <Info className="w-4 h-4" style={{ color: themeColors.info }} />;
      default: return <Info className="w-4 h-4" style={{ color: themeColors.secondary }} />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-[calc(100vh-200px)] min-h-[100px] overflow-y-auto custom-scrollbar">
        {panelNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
            <BellOff className="w-12 h-12 mb-3 text-gray-400 dark:text-gray-500" />
            <p className="font-medium">No notifications yet</p>
            <p className="text-sm">We'll let you know when something new arrives.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {panelNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                onClick={() => markPanelNotificationAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div 
                    className={`flex-shrink-0 mt-1 mr-3 p-1.5 rounded-full bg-opacity-20`} 
                    style={{backgroundColor: `${themeColors[notification.type] || themeColors.secondary}20`}} // Corrected line
                  >
                     {getIconForType(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>{notification.title}</h4>
                    <p className={`text-sm mt-0.5 ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{notification.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2.5 h-2.5 bg-theme-primary rounded-full mt-1.5 ml-2 flex-shrink-0" title="Unread"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {panelNotifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button 
            onClick={markAllPanelNotificationsAsRead}
            className="text-theme-primary hover:text-opacity-80 text-xs font-medium py-1 px-2 rounded-md hover:bg-theme-primary/10 dark:hover:bg-theme-primary/20"
          >
            Mark all as read
          </button>
          <button 
            onClick={clearAllPanelNotifications}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-xs font-medium py-1 px-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
