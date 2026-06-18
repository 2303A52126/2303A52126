import { Star, ArrowUp } from 'lucide-react';
import NotificationCard from './NotificationCard';

export default function PrioritySection({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="priority-section">
      <div className="section-header">
        <div className="section-header-left">
          <Star size={20} className="section-header-icon" />
          <h2 className="section-title">Priority Notifications</h2>
          <span className="section-count">Top {notifications.length}</span>
        </div>
        <button className="scroll-top-btn" onClick={scrollToTop} title="Scroll to top">
          <ArrowUp size={18} />
        </button>
      </div>
      <div className="priority-list">
        {notifications.map((n, i) => (
          <NotificationCard key={n.id || i} notification={n} index={i} />
        ))}
      </div>
    </section>
  );
}
