'use client'
import React from 'react'
import ProductCard from '@/components/Card'
import Banner from '@/components/Banner'
import { products, Product } from '@/db/product'; 

import ProductFilter from '@/components/categoryfilterring'
import { useState } from 'react'


type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
};



const HomePage = () => {
    const [filters, setFilters] = useState<Filters>({
      categories: [],
      minPrice: 0,
      maxPrice: Infinity,
    });
  
    const filtered = products.filter((p: Product) => {
      const effectivePrice = p.discountPrice ?? p.price;
  
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category);
  
      const matchesPrice =
        effectivePrice >= filters.minPrice && effectivePrice <= filters.maxPrice;
  
      return matchesCategory && matchesPrice;
    });
  return (
    <div className=' '>
    <Banner/>
   <ProductFilter onFilterChange={setFilters} />
      <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3'>
            
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
  )
}

export default HomePage
