'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SearchBoxProps = {
  className?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ className = '' }) => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    if (name.trim()) {
      router.push(`/list?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative w-full flex items-center border rounded-md justify-center max-w-[220px] ${className}`}
    >
      <input
        type="text"
        name="name"
        placeholder="Search..."
        className="w-full pl-3 pr-6 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" aria-label="Search">
        <Search className="w-4 h-4 absolute top-2.5 right-1 text-gray-900 cursor-pointer" />
      </button>
    </form>
  );
};

export default SearchBox;
