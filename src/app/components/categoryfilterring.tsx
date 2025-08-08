'use client';

import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

type FilterProps = {
  onFilterChange: (filters: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
    sortOrder: 'lowToHigh' | 'highToLow' | '';
  }) => void;
};

const ProductFilter = ({ onFilterChange }: FilterProps) => {
  const port  = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | ''>('');
  const [showPriceFilters, setShowPriceFilters] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${port}/api/categories`);
        const data = await response.json();
        setCategories(['All', ...data.categories]); // Add "All" option
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [port]);

  useEffect(() => {
    // Prepare categories array for backend
    const categoriesForFilter =
      selectedCategories.includes('All') || selectedCategories.length === 0
        ? []
        : selectedCategories.filter(cat => cat !== 'All'); // Remove "All" before sending

    onFilterChange({
      categories: categoriesForFilter,
      minPrice: minPrice === '' || Number(minPrice) < 0 ? 0 : Number(minPrice),
      maxPrice:
        maxPrice === '' || Number(maxPrice) < 0
          ? Infinity
          : Number(maxPrice),
      sortOrder,
    });
  }, [selectedCategories, minPrice, maxPrice, sortOrder, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      // Select only All
      setSelectedCategories(['All']);
    } else {
      // Select/deselect category
      let updated: string[];
      if (selectedCategories.includes(category)) {
        // Remove category
        updated = selectedCategories.filter((c) => c !== category);
      } else {
        // Add category
        updated = [...selectedCategories.filter((c) => c !== 'All'), category];
      }
      // If nothing selected, revert to All
      if (updated.length === 0) updated = ['All'];
      setSelectedCategories(updated);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setMinPrice(val);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setMaxPrice(val);
  };

  if (loading) {
    return (
      <div className="border-b p-4 bg-white mb-6">
        <div className="flex flex-wrap lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b p-4 bg-white mb-6">
      <div className="flex flex-wrap lg:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-sm px-2 py-1 border-b-2 ${
                selectedCategories.includes(cat)
                  ? 'text-gray-900 border-blue-600'
                  : 'text-gray-700 border-transparent hover:border-gray-400'
              } transition-colors`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggle price filter on small screens */}
        <div className="flex justify-between items-center lg:hidden">
          <button
            onClick={() => setShowPriceFilters(!showPriceFilters)}
            className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md"
            type="button"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Price + Sort Filters */}
        <div
          className={`flex-wrap items-center gap-4 ${
            showPriceFilters ? 'flex' : 'hidden'
          } lg:flex`}
        >
          <input
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="p-2 border rounded w-32"
            inputMode="numeric"
          />
          <input
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="p-2 border rounded w-32"
            inputMode="numeric"
          />

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'lowToHigh' | 'highToLow' | '')
            }
            className="p-2 border rounded w-40"
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;