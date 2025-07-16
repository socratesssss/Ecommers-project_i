"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  image: string;
};

type SearchBoxProps = {
  className?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ className = "" }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/product?q=${query.trim()}&limit=5`);
        const data = await res.json();
        setSuggestions(
          (data.products || []).map((p: any) => ({
            id: String(p._id),
            name: p.name,
            image: p.images?.[0] || "/placeholder.png",
          }))
        );
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

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
    }
  };

  return (
    <div className={`relative w-full max-w-[220px] ${className}`} ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex items-center border rounded-md">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-3 pr-8 py-1.5 text-sm outline-none rounded-md"
        />
        <button type="submit" className="absolute right-1 top-1.5 text-gray-900">
          <Search className="w-4 h-4 cursor-pointer" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-48 overflow-y-auto shadow text-sm">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                router.push(`/products/${item.id}`);
                setSuggestions([]);
              }}
            >
              <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;