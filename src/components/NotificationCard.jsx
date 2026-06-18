import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

function getPriorityValue(type) {
  switch (type) {
    case 'Placement': return 3;
    case 'Result': return 2;
    case 'Event': return 1;
    default: return 0;
  }
}

function getTypeColor(type) {
  switch (type) {
    case 'Placement': return { bg: '#e6f4ea', border: '#2e7d32', text: '#2e7d32' };
    case 'Result': return { bg: '#fff3e0', border: '#ed6c02', text: '#ed6c02' };
    case 'Event': return { bg: '#e3f2fd', border: '#1976d2', text: '#1976d2' };
    default: return { bg: '#f5f5f5', border: '#757575', text: '#757575' };
  }
}

function getPriorityLabel(type) {
  switch (type) {
    case 'Placement': return 'High';
    case 'Result': return 'Medium';
    case 'Event': return 'Low';
    default: return 'Normal';
  }
}

function formatTimestamp(ts) {
  if (!ts) return '';
  try {
    const d = new Date(ts);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return ts;
  }
}

function relativeTime(ts) {
  if (!ts) return '';
  try {
    const now = Date.now();
    const then = new Date(ts).getTime();
    const diffMs = now - then;
    if (isNaN(diffMs) || diffMs < 0) return '';

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  } catch {
    return '';
  }
}

export default function NotificationCard({ notification, index = 0 }) {
  const { title, message, type, created_at } = notification;
  const color = getTypeColor(type);
  const priorityLabel = getPriorityLabel(type);
  const relative = relativeTime(created_at);

  return (
    <div
      className="notification-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="card-accent" style={{ backgroundColor: color.border }} />

      <div className="card-header">
        <div className="card-header-left">
          <span className="type-badge" style={{ backgroundColor: color.bg, color: color.text, borderColor: color.border }}>
            {type}
          </span>
          <span className="priority-badge" style={{ backgroundColor: color.bg, color: color.text, borderColor: color.border }}>
            {priorityLabel}
          </span>
        </div>
        <div className="card-header-right">
          <ArrowUpRight size={16} style={{ color: color.border }} />
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-message">{message}</p>
      </div>

      <div className="card-footer">
        <div className="timestamp-item">
          <Calendar size={14} className="timestamp-icon" />
          <span className="timestamp-text">{formatTimestamp(created_at)}</span>
        </div>
        {relative && (
          <div className="timestamp-item relative">
            <Clock size={14} className="timestamp-icon" />
            <span className="timestamp-text">{relative}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { getPriorityValue };
