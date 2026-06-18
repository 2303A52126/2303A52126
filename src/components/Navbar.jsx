import { useState } from 'react';
import { Bell, RefreshCw, Moon, Sun } from 'lucide-react';
import { Log } from '../utils/logger.js';

export default function Navbar({
  onRefresh,
  notificationCount,
  priorityCount,
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
  isRefreshing,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    Log('UI', 'info', 'navbar', `Filter changed: search query updated to "${value}"`);
  };

  const handleRefresh = () => {
    Log('UI', 'info', 'navbar', 'Refresh button clicked');
    onRefresh();
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    Log('UI', 'info', 'navbar', `Dark mode toggled: ${next ? 'enabled' : 'disabled'}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-brand">
            <Bell size={28} className="navbar-icon" />
            <h1 className="navbar-title">Campus Notifications</h1>
          </div>
        </div>

        <div className="navbar-center">
          <div className={`search-wrapper ${isFocused ? 'focused' : ''}`}>
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>

        <div className="navbar-right">
          <div className="badge-group">
            <div className="badge total-badge">
              <span className="badge-value">{notificationCount}</span>
              <span className="badge-label">Total</span>
            </div>
            <div className="badge priority-badge">
              <span className="badge-value">{priorityCount}</span>
              <span className="badge-label">Priority</span>
            </div>
          </div>

          <button
            className="navbar-btn refresh-btn"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh"
          >
            <RefreshCw size={20} className={isRefreshing ? 'spin-icon' : ''} />
          </button>

          <button
            className="navbar-btn darkmode-btn"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
