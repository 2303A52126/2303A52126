import { Inbox } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Inbox size={56} />
      </div>
      <h3 className="empty-title">No notifications found</h3>
      <p className="empty-subtitle">Adjust your filters or search to see more results.</p>
    </div>
  );
}
