"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "../components/Card";
import Banner from "../components/Banner";
import ProductFilter from "../components/categoryfilterring";
import Pagination from "../components/Pagination";
import { useRouter } from 'next/navigation';
import { localProducts } from "../../data/product";






type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOrder: "lowToHigh" | "highToLow" | "";
};





const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortOrder: "",
  });

  const { displayedProducts, totalPages } = useMemo(() => {
    let filtered = [...localProducts];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    filtered = filtered.filter(product => 
      product.price >= filters.minPrice && 
      product.price <= filters.maxPrice
    );

    // Apply sorting
    if (filters.sortOrder === "lowToHigh") {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filters.sortOrder === "highToLow") {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }

    // Calculate pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

    return { displayedProducts, totalPages };
  }, [currentPage, filters, itemsPerPage]);
const router = useRouter();
  return (
    <div>
      <Banner />
      <ProductFilter onFilterChange={setFilters} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item) => (
         <ProductCard
  key={item._id}
  id={item._id}
  images={item.images}
  name={item.name}
  inStock={item.inStock}
  discountPrice={item.discountPrice}
  price={item.price}
  onClick={() => router.push(`/products/${item._id}`)} // navigate to dynamic page
/>

          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HomePage;