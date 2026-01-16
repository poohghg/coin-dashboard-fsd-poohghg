'use client';

import { cn, IconSearch } from '@/src/shared/uiKit';
import React, { useRef } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (newQuery: string) => void;
  className?: string;
  searchIconClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  className,
  searchIconClassName,
  inputClassName,
  placeholder,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('relative', className)}>
      <IconSearch
        className={searchIconClassName ?? 'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500'}
        onClick={() => inputRef.current?.focus()}
      />
      <input
        ref={inputRef}
        type="text"
        className={
          inputClassName ??
          'w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500'
        }
        placeholder={placeholder ?? 'Search...'}
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
