import React from 'react';

const ProductPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:flex gap-8 lg:gap-16 animate-pulse">
      {/* Image Section */}
      <div className="lg:sticky top-10 md:w-1/2 space-y-4">
        <div className="aspect-square bg-gray-200 rounded-xl w-full" />

        <div className="flex justify-center gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gray-300" />
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="md:w-1/2 flex flex-col gap-6 mt-8 md:mt-0">
        {/* Title and Price */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="h-12 bg-gray-300 rounded-lg w-full sm:flex-1" />
          <div className="h-12 bg-gray-300 rounded-lg w-full sm:flex-1" />
        </div>

        {/* Description */}
        <div className="pt-6 border-t border-gray-200 space-y-3">
          <div className="h-6 bg-gray-300 w-40 rounded" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-4 bg-gray-200 rounded w-3/6" />
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
