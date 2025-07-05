'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/Card';
import { products } from '@/db/product';
import ProductFilter from '@/components/categoryfilterring';

const ShopPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    minPrice: 0,
    maxPrice: Infinity,
  });

const filtered = products.filter((p) => {
  const effectivePrice = p.discountPrice ?? p.price;

  const matchesCategory =
    filters.categories.length === 0 || filters.categories.includes(p.category);

  const matchesPrice =
    effectivePrice >= filters.minPrice && effectivePrice <= filters.maxPrice;

  return matchesCategory && matchesPrice;
});


  return (
    <div className=" md:px-6 md:py-10 container mx-auto">
      {/* Filter Component */}
      <ProductFilter onFilterChange={setFilters} />

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              images={item.images}
              name={item.name}
              inStock={item.inStock}
              discountPrice={item.discountPrice}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
