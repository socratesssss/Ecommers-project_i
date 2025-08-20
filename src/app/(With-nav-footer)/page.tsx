"use client";

import React, { useState, useMemo, useCallback } from "react";
import ProductCard from "../components/Card";
import Banner from "../components/Banner";
import ProductFilter from "../components/categoryfilterring";
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";
import { localProducts } from "../../data/product";

type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOrder: "lowToHigh" | "highToLow" | "";
};

// Memoize the initial filters to prevent unnecessary re-renders
const initialFilters: Filters = {
  categories: [],
  minPrice: 0,
  maxPrice: Infinity,
  sortOrder: "",
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const router = useRouter();
  
  // Use a reasonable items per page count
  const itemsPerPage = 12;

  // Memoize the filter change handler to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // 1️⃣ Filtered & sorted products - memoized with useMemo
  const filteredProducts = useMemo(() => {
    let filtered = localProducts; // Use the original array directly

    // Apply category filter if any categories are selected
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Apply sorting
    if (filters.sortOrder === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => 
        (a.discountPrice || a.price) - (b.discountPrice || b.price)
      );
    } else if (filters.sortOrder === "highToLow") {
      filtered = [...filtered].sort((a, b) => 
        (b.discountPrice || b.price) - (a.discountPrice || a.price)
      );
    }

    return filtered;
  }, [filters]); // Only recalculate when filters change

  // 2️⃣ Paginated products - memoized based on currentPage and filteredProducts
  const { displayedProducts, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filteredProducts.slice(start, start + itemsPerPage);
    
    return { displayedProducts, totalPages };
  }, [currentPage, filteredProducts, itemsPerPage]);

  // Memoize the page change handler
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoize the product card click handler
  const handleProductClick = useCallback((id: string) => {
    router.push(`/products/${id}`);
  }, [router]);

  return (
    <div>
      <Banner />
      <ProductFilter onFilterChange={handleFilterChange} />

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
              onClick={() => handleProductClick(item._id)}
              // Only pass the first image to prevent re-renders
              firstImageOnly={true}
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
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default React.memo(HomePage);