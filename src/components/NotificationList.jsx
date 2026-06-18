import NotificationCard from './NotificationCard';

export default function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-list">
      {notifications.map((n, i) => (
        <NotificationCard key={n.id || i} notification={n} index={i} />
      ))}
    </div>
  );
}
