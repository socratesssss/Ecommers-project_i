'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/Card';
import Banner from '@/components/Banner';
import ProductFilter from '@/components/categoryfilterring';

type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id: number | string;
  name: string;
  price: number;
  discountPrice?: number;
  category: 'Vape' | 'Juice' | 'Pods';
  images: string[];
  inStock: boolean;
  miniDescription: string;
  description?: string;
  productColors?: ProductColor[];
};

type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOrder: 'lowToHigh' | 'highToLow' | '';
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortOrder: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/product'); // adjust this if your route is different
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
  }, [filters, products]);

  return (
    <div>
      <Banner />
      <ProductFilter onFilterChange={setFilters} />
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        
      </div>
    </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item,index) => (
            
              <ProductCard
                key={item._id || index}
                id={item._id}
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
      )}
    </div>
  );
};

export default HomePage;
