import { RefreshCw } from 'lucide-react';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <RefreshCw size={40} className="spin-icon" />
      </div>
      <p className="loading-text">Loading notifications...</p>
    </div>
  );
}
