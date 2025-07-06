'use client';

import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

type FilterProps = {
  onFilterChange: (filters: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
  }) => void;
};

const categories = ['All', 'Juice', 'Vape', 'Pods'];

const ProductFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showPriceFilters, setShowPriceFilters] = useState(false);

  // Include onFilterChange in dependency array
  useEffect(() => {
    onFilterChange({
      categories:
        selectedCategories.includes('All') || selectedCategories.length === 0
          ? []
          : selectedCategories,
      minPrice: minPrice === '' ? 0 : +minPrice,
      maxPrice: maxPrice === '' ? Infinity : +maxPrice,
    });
  }, [selectedCategories, minPrice, maxPrice, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const updated = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== 'All'), category];
      setSelectedCategories(updated);
    }
  };

  return (
    <div className="border-b p-4 bg-white mb-6 md:pt-16">
      <div className="flex  flex-wrap  lg:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-md text-sm border ${
                selectedCategories.includes(cat)
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggler for price filter on small devices */}
        <div className="flex justify-between items-center lg:hidden">
          <button
            onClick={() => setShowPriceFilters(!showPriceFilters)}
            className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Price Filters - visible on large screens or toggle active */}
        <div
          className={`flex-wrap gap-4 ${
            showPriceFilters ? 'flex' : 'hidden'
          } lg:flex`}
        >
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
