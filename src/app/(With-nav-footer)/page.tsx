"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/Card";
import Banner from "../components/Banner";
import ProductFilter from "../components/categoryfilterring";
import Pagination from "../components/Pagination";
import CartDebugger from "../components/redux";

type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: "Vape" | "Juice" | "Pods";
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

const HomePage = () => {
    const port = 'http://localhost:4000'
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const searchTerm = '';
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortOrder: "",
  });



  // Reset page to 1 when filters change
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

      // **Add search term param here**
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
  }, [currentPage, filters, searchTerm]);

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
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3">
            {products.length > 0 ? (
              products.map((item, index) => (
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
      <CartDebugger/>
    </div>
  );
};

export default HomePage;
