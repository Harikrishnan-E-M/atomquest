import { useEffect, useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { fetchNotifications, type NotificationRecord } from '../api/notifications';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  useEffect(() => {
    void fetchNotifications().then(setNotifications);
  }, []);

  return (
    <AppLayout>
      <main>
        <h1>Notifications</h1>
        <section>
          {notifications.map((notification) => (
            <article key={notification._id}>
              <h2>{notification.title}</h2>
              <p>{notification.message}</p>
              <p>{notification.read ? 'Read' : 'Unread'}</p>
            </article>
          ))}
        </section>
      </main>
    </AppLayout>
  );
}
