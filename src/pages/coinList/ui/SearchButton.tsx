import { cn } from '@/src/shared/uiKit';
import React from 'react';

interface SearchButtonProps {
  className?: string;
}

const SearchButton = ({ className }: SearchButtonProps) => {
  return (
    <div className={cn('relative mb-6', className)}>
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search something... (BTC, Bitcoin, B...)"
        className="w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-700"
      />
    </div>
  );
};

export default SearchButton;
