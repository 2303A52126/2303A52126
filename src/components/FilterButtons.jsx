import { Log } from '../utils/logger.js';

const FILTERS = [
  { key: 'All', label: 'All' },
  { key: 'Placement', label: 'Placement' },
  { key: 'Result', label: 'Result' },
  { key: 'Event', label: 'Event' },
];

export default function FilterButtons({ activeFilter, onFilterChange }) {
  const handleClick = (key) => {
    if (key !== activeFilter) {
      onFilterChange(key);
      Log('UI', 'info', 'filter-buttons', `Filter changed: ${key}`);
    }
  };

  return (
    <div className="filter-buttons">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
          onClick={() => handleClick(f.key)}
        >
          <span>{f.label}</span>
        </button>
      ))}
    </div>
  );
}
