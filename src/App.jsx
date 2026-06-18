import { useEffect, useMemo, useState, useCallback } from 'react';
import { getNotifications } from './services/api.js';
import { Log } from './utils/logger.js';
import Navbar from './components/Navbar.jsx';
import FilterButtons from './components/FilterButtons.jsx';
import PrioritySection from './components/PrioritySection.jsx';
import NotificationList from './components/NotificationList.jsx';
import Pagination from './components/Pagination.jsx';
import Loading from './components/Loading.jsx';
import EmptyState from './components/EmptyState.jsx';
import ErrorState from './components/ErrorState.jsx';
import './App.css';

function getPriorityValue(type) {
  switch (type) {
    case 'Placement': return 3;
    case 'Result': return 2;
    case 'Event': return 1;
    default: return 0;
  }
}

function useNotificationData() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    Log('DATA', 'info', 'app', 'Notifications fetch started');
    try {
      const response = await getNotifications({ limit: 1000, page: 1 });
      const data = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
      setAllNotifications(data);
      Log('DATA', 'info', 'app', `Notifications fetched: ${data.length} items`);
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to fetch notifications';
      setError(message);
      Log('DATA', 'error', 'app', `Notifications fetch failed: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { allNotifications, loading, error, fetchAll };
}

function getFilteredNotifications(notifications, filter, searchQuery) {
  let filtered = [...notifications];

  if (filter !== 'All') {
    filtered = filtered.filter((n) => n.type === filter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((n) => (n.message || '').toLowerCase().includes(q));
  }

  return filtered;
}

function getSortedNotifications(notifications) {
  return [...notifications].sort((a, b) => {
    const pa = getPriorityValue(a.type);
    const pb = getPriorityValue(b.type);
    if (pa !== pb) return pb - pa;
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });
}

function getPriorityNotifications(notifications) {
  const sorted = getSortedNotifications(notifications);
  return sorted.slice(0, 10);
}

export default function App() {
  const { allNotifications, loading, error, fetchAll } = useNotificationData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [darkMode, setDarkMode] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    Log('APP', 'info', 'app', 'Application started');
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const interval = setInterval(() => {
      Log('APP', 'info', 'app', 'Auto refresh triggered');
      fetchAll();
      setLastRefresh(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filtered = useMemo(() => getFilteredNotifications(allNotifications, activeFilter, searchQuery), [allNotifications, activeFilter, searchQuery]);
  const sortedForPage = useMemo(() => getSortedNotifications(filtered), [filtered]);
  const totalPages = Math.max(1, Math.ceil(sortedForPage.length / limit));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(() => sortedForPage.slice((safePage - 1) * limit, safePage * limit), [sortedForPage, safePage, limit]);
  const priorityNotifications = useMemo(() => getPriorityNotifications(allNotifications), [allNotifications]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setPage(1);
    Log('UI', 'info', 'app', `Filter changed: ${key}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    Log('UI', 'info', 'app', `Pagination changed: page ${newPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
    Log('UI', 'info', 'app', `Pagination changed: limit ${newLimit}`);
  };

  const handleRefresh = () => {
    Log('UI', 'info', 'app', 'Manual refresh triggered');
    fetchAll();
    setLastRefresh(Date.now());
  };

  useEffect(() => {
    Log('SORT', 'info', 'app', 'Sorting completed');
  }, [lastRefresh, sortedForPage.length]);

  return (
    <div className="app">
      <Navbar
        onRefresh={handleRefresh}
        notificationCount={allNotifications.length}
        priorityCount={priorityNotifications.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isRefreshing={loading}
      />

      <main className="main-container">
        <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {activeFilter === 'All' && !searchQuery && (
          <PrioritySection notifications={priorityNotifications} />
        )}

        <section className="all-section">
          <div className="section-header">
            <h2 className="section-title">All Notifications</h2>
            <span className="section-count">{filtered.length} found</span>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorState message={error} onRetry={handleRefresh} />
          ) : paged.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <NotificationList notifications={paged} />
              <Pagination
                page={safePage}
                totalPages={totalPages}
                limit={limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            </>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Campus Notifications Dashboard</p>
      </footer>
    </div>
  );
}
