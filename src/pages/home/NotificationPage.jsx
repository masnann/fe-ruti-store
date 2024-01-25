import React from "react";
import useNotificationApi from "../../hooks/homepage/NotificationApi";
import Loading from "../../components/modals/Loading";

const NotificationPage = () => {
  const { notifications, isLoading, error } = useNotificationApi();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error fetching notifications: {error}</p>;
  }

  return (
    <div className="p-4 max-w-sm">
      <h1 className="text-xl font-bold mb-4">Notifikasi</h1>
      <ul className="divide-y divide-gray-300">
        {notifications.map((notification) => (
          <li key={notification.id} className="py-2">
            <div className={`flex items-start justify-between`}>
              <div className="flex-1">
                <p className="text-blue-600 mb-1 font-semibold">
                  {notification.title}
                </p>
                <p className="text-gray-800 text-sm">{notification.message}</p>
                <p className="text-gray-400 text-sm mt-2 float-end">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZone: "UTC", // Sesuaikan dengan zona waktu dari API
                  }).format(new Date(notification.created_at))}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
