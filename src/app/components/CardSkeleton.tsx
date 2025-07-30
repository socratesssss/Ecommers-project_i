'use client';

import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden p-2 animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>

      {/* Content placeholder */}
      <div className="sm:py-2 mt-2 flex flex-col space-y-2">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price placeholder */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Discount placeholder */}
        <div className="flex gap-3">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Button placeholder */}
        <div className="sm:mt-3 mt-2 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}