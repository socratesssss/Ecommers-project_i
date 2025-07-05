'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/Card';
import { products } from '@/db/product';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = (searchParams.get('name') || '').toLowerCase();

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <h1 className="text-xl  mb-6 text-center ">
        Search Results for{' '}
        <span className="text-blue-500 border-blue-400 border-b-1">"{searchTerm || '...'}"</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              name={product.name}
              inStock={product.inStock}
              discountPrice={product.discountPrice}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found for <strong>"{searchTerm}"</strong>.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
