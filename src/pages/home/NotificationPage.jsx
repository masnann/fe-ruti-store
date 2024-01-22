import React from 'react';
import useNotificationApi from "../../hooks/homepage/NotificationApi";

const NotificationPage = () => {
  const { notifications, isLoading, error } = useNotificationApi();

  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>Error fetching notifications: {error}</p>;
  }

  return (
    <div className="p-4 max-w-sm">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      <ul className="divide-y divide-gray-300">
        {notifications.map((notification) => (
          <li key={notification.id} className="py-2">
            <div className={`flex items-start justify-between`}>
              <div className="flex-1">
                <p className="text-black mb-1 font-semibold">{notification.title}</p>
                <p className="text-gray-800 text-sm">{notification.message}</p>
                <p className="text-gray-500 text-sm">{new Date(notification.created_at).toLocaleString()}</p>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
