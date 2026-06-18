import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-icon">
        <AlertTriangle size={56} />
      </div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-subtitle">{message || 'Failed to load notifications. Please try again.'}</p>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
