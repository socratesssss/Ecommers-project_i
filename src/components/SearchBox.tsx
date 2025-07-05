'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { products } from '@/db/product'; // Import your products data

type SearchBoxProps = {
  className?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ className = '' }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on current input query
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5) // limit to 5 suggestions
      .map((p) => p.name);

    setSuggestions(filtered);
  }, [query]);

  // Close suggestions dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/list?name=${encodeURIComponent(searchTerm.trim())}`);
      setSuggestions([]);
      setQuery('');
    }
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
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 top-1.5 text-gray-900"
        >
          <Search className="w-4 h-4 cursor-pointer" />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-md text-sm">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
