'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number | string;
  name: string;
};

type SearchBoxProps = {
  className?: string;
  onSearchComplete?: () => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ className = '', onSearchComplete }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:4000/api/product');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();

        // Normalize id to string just in case
        const normalized = data.map(p => ({ ...p, id: String(p.id || p._id) }));
        setProducts(normalized);
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
  }, [query, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (productName: string) => {
    if (productName.trim()) {
      router.push(`/list?name=${encodeURIComponent(productName.trim())}`);
      setSuggestions([]);
      setQuery('');
      if (onSearchComplete) onSearchComplete();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    router.push(`/products/${product.id}`);
    setSuggestions([]);
    setQuery('');
    if (onSearchComplete) onSearchComplete();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className={`relative w-full max-w-[220px] ${className}`} ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex items-center border rounded-md">
        <input
          type="text"
          name="name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-3 pr-8 py-1.5 text-sm outline-none rounded-md"
          autoComplete="off"
        />
        <button type="submit" aria-label="Search" className="absolute right-1 top-1.5 text-gray-900">
          <Search className="w-4 h-4 cursor-pointer" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-md text-sm">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSuggestionClick(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
