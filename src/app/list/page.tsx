'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/Card';

type Product = {
  id: number | string;
  images: string[];
  name: string;
  category: string;
  inStock: boolean;
  discountPrice?: number;
  price: number;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = (searchParams.get('name') || '').toLowerCase();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <h1 className="md:text-lg text-md mb-6 text-center">
        Search Results for{' '}
        <span className="text-blue-500 text-xs md:text-base text-center border-blue-400 border-b">
          {searchTerm || '...'}
        </span>
      </h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-0">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
           <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found for <strong>{searchTerm}</strong>.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
