'use client';

import { cn } from '@/src/shared/uiKit';
import { debounce } from 'lodash';
import { SearchIcon } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';

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
  const [localQuery, setLocalQuery] = useState(value);
  const query = useDebounce ? localQuery : value;

  const debouncedSetQuery = useMemo(
    () =>
      debounce((newQuery: string) => {
        onInputChange(newQuery);
      }, debounceDelay),
    [onInputChange, debounceDelay]
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
    <div
      className={cn(
        'relative w-full rounded-lg border border-transparent bg-gray-800 transition-all duration-150',
        'border-2 border-gray-700 focus-within:border-blue-500',
        className
      )}
    >
      <button
        className={cn(
          'absolute top-0 left-0 flex h-full w-10 items-center justify-center text-gray-400',
          searchIconClassName
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <SearchIcon className={'h-5 w-5'} />
      </button>
      <input
        ref={inputRef}
        type="text"
        className={cn(
          'w-full border-none bg-transparent py-2 pr-4 pl-10 text-sm text-white placeholder-gray-500 outline-none focus:ring-0',
          inputClassName
        )}
        placeholder={placeholder ?? 'Search...'}
        onChange={e => handleInputChange(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBar;
