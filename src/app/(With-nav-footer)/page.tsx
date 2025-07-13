'use client';
import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/Card';
import Banner from '@/components/Banner';
import ProductFilter from '@/components/categoryfilterring';
import { products, Product } from '@/db/product';

type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOrder: 'lowToHigh' | 'highToLow' | '';
};

const HomePage = () => {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortOrder: '',
  });

  const filteredProducts = useMemo(() => {
    const result = products.filter((product: Product) => {
      const price = product.discountPrice || product.price;
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;
      return matchesCategory && matchesPrice;
    });

    if (filters.sortOrder === 'lowToHigh') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filters.sortOrder === 'highToLow') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }

    return result;
  }, [filters]);

  return (
    <div>
      <Banner />
      <ProductFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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

export default HomePage;
