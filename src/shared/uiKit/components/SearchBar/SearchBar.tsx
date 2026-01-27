'use client';

import { cn } from '@/src/shared/uiKit';
import { debounce } from 'lodash';
import { SearchIcon } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

interface SearchBarProps {
  value: string;
  onInputChange: (newQuery: string) => void;
  useDebounce?: boolean;
  debounceDelay?: number;
  placeholder?: string;
  className?: string;
  searchIconClassName?: string;
  inputClassName?: string;
}

const SearchBar = ({
  value,
  onInputChange,
  useDebounce = false,
  debounceDelay = 100,
  placeholder,
  className,
  searchIconClassName,
  inputClassName,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // UI state for debounced input
  const [localQuery, setLocalQuery] = useState(value);
  const query = useDebounce ? localQuery : value;

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => {
      onInputChange(newQuery);
    }, debounceDelay),
    []
  );

  const handleInputChange = (newQuery: string) => {
    if (useDebounce) {
      setLocalQuery(newQuery);
      debouncedSetQuery(newQuery);
    } else {
      onInputChange(newQuery);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        className={cn(
          'absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-500',
          searchIconClassName
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <SearchIcon className={'h-5 w-5'} />
      </button>
      <input
        ref={inputRef}
        type="text"
        className={
          inputClassName ??
          'w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500'
        }
        placeholder={placeholder ?? 'Search...'}
        onChange={e => handleInputChange(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBar;
