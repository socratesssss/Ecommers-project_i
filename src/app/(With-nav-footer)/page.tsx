"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/Card";
import Banner from "../components/Banner";
import ProductFilter from "../components/categoryfilterring";
import Pagination from "../components/Pagination";

type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: "Vape" | "Juice" | "Pods"|"Kits";
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
  sortOrder: "lowToHigh" | "highToLow" | "";
};

const ProductCardSkeleton = () => {
  
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-2 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
      
      {/* Content placeholder */}
      <div className="py-2 mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const port  = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("Backend URL:", port);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const searchTerm = '';
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortOrder: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = new URLSearchParams();

      query.append("page", currentPage.toString());
      query.append("limit", itemsPerPage.toString());

      if (filters.categories.length > 0) {
        query.append("categories", filters.categories.join(","));
      }
      query.append("minPrice", filters.minPrice.toString());
      query.append("maxPrice", filters.maxPrice.toString());
      query.append("sortOrder", filters.sortOrder);

      if (searchTerm.trim()) {
        query.append("q", searchTerm.trim());
      }

      try {
        const res = await fetch(`${port}/api/product?${query.toString()}`);
        const data = await res.json();

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters, searchTerm, port]);

  // tracki
   useEffect(() => {
    fetch(`${port}/api/visit/track`, {
      method: 'POST',
    });
  }, [port]);

  return (
    <div>
      <Banner />
      <ProductFilter onFilterChange={setFilters} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              images={item.images}
              name={item.name}
              inStock={item.inStock}
              discountPrice={item.discountPrice}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {!loading && totalPages > 1 && (
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