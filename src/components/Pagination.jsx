import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, limit, onPageChange, onLimitChange }) {
  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <label className="limit-label">Items per page:</label>
        <select
          className="limit-select"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="pagination-center">
        <button
          className="page-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        <span className="page-indicator">
          Page <strong>{page}</strong> of <strong>{Math.max(1, totalPages)}</strong>
        </span>

        <button
          className="page-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
