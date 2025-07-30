"use client";

import React from "react";

const OrderPageSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
        <div className="flex items-center gap-3">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-300 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Summary */}
        <div className="space-y-6 p-6 rounded-lg border border-gray-200 bg-white">
          <div className="h-6 w-40 bg-gray-300 rounded" />

          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="space-y-2 border-b pb-4">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-12 bg-gray-300 rounded" />
              </div>
              <div className="flex gap-2 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-gray-300 rounded" />
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-gray-300 rounded" />
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-400 rounded" />
              <div className="h-4 w-16 bg-gray-300 rounded" />
            </div>
          </div>
        </div>

        {/* Right: Address + Payment */}
        <div className="space-y-8">
          <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded" />
            ))}
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-16 w-full bg-gray-100 rounded" />
          </div>

          <div className="py-4 border-t border-gray-200 -mx-6 px-6 bg-white">
            <div className="h-10 w-full bg-green-300 rounded" />
            <div className="h-3 w-48 bg-gray-200 mt-2 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPageSkeleton;