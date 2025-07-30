"use client";

import React from "react";

const OrderNowPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Product Section Skeleton */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Image Skeleton */}
              <div className="w-full sm:w-1/2 aspect-square bg-gray-200 rounded-lg"></div>

              {/* Product Info Skeleton */}
              <div className="w-full sm:w-1/2 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>

                {/* Quantity Selector Skeleton */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Color Variants Skeleton */}
                <div className="mt-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* Order Summary Skeleton */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Skeleton */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                  <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-10 w-full bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Button Skeleton */}
            <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNowPageSkeleton;