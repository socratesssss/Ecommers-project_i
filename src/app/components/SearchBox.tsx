"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { localProducts } from "../../data/product";

type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  inStock: boolean;
  miniDescription: string;
  description?: string;
  productColors?: ProductColor[];
};

type SearchBoxProps = {
  className?: string;
  onSearch?: (query: string) => void; // ✅ added
};

const SearchBox: React.FC<SearchBoxProps> = ({ className = "", onSearch }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // debounce search
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const filtered = localProducts
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // limit to 5

      setSuggestions(filtered);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // close suggestions if clicked outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      onSearch?.(query.trim()); // ✅ trigger callback
    }
  };

  const handleSelectSuggestion = (id: string, name: string) => {
    router.push(`/products/${id}`);
    setSuggestions([]);
    onSearch?.(name); // ✅ also trigger callback
  };

  return (
    <div
      className={`relative w-full max-w-[260px] ${className}`}
      ref={containerRef}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center border rounded-md"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-3 pr-8 py-1.5 text-sm outline-none rounded-md"
        />
        <button
          type="submit"
          className="absolute right-1 top-1.5 text-gray-900"
          aria-label="Search"
        >
          <Search className="w-4 h-4 cursor-pointer" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-48 overflow-y-auto shadow text-sm">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(item._id, item.name)}
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                width={40}
                height={35}
                className="rounded object-cover"
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
