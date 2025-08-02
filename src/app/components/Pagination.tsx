// components/Pagination.tsx
"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Calculate the range of pages to display (max 5 at a time)
  const getPageRange = () => {
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    
    // Adjust if we're near the end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();

  return (
    <div className="flex justify-center items-center gap-2 py-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ArrowLeft size={16} />
      </button>

      {/* First Page */}
      {!pageRange.includes(1) && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 rounded-md text-sm ${
              1 === currentPage
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          {!pageRange.includes(2) && <span className="px-1">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md text-sm ${
            page === currentPage
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-800 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {!pageRange.includes(totalPages) && (
        <>
          {!pageRange.includes(totalPages - 1) && <span className="px-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-md text-sm ${
              totalPages === currentPage
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;