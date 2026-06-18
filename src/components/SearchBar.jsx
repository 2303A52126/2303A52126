import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search by message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
