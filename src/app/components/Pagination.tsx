// components/Pagination.tsx
"use client";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-2 py-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-2  text-sm ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:text-gray-100"
        }`}
      >
       <ArrowLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2  text-sm ${
            page === currentPage
              ? " text-blue-600  border-b "
              : "text-gray-800 "
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-2  text-sm ${
          currentPage === totalPages
            ? "text-gray-400  cursor-not-allowed"
            : "text-gray-800 hover:text-gray-900"
        }`}
      >
        <ArrowRight  size={16}/>
      </button>
    </div>
  );
};

export default Pagination;
