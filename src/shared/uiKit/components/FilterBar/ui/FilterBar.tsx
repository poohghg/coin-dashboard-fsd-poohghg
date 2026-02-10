'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { cn } from '@/src/shared/uiKit';
import {
  FilterBarContextProvider,
  useFilterBarContext,
} from '@/src/shared/uiKit/components/FilterBar/ui/FilterBarContext';
import { Button } from '@/src/shared/uiKit/ui';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';

interface FilterButtonProps {
  children: ReactNode;
  value: string;
}

export const ActiveFilter = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { selectedValue } = useFilterBarContext();

  useEffect(() => {
    const handleResize = () => {
      const activeEl = document.getElementById('active-filter-indicator') as HTMLDivElement;
      if (activeEl && selectedValue) {
        const selectedButton = document.querySelector(`button[value="${selectedValue}"]`) as HTMLButtonElement;
        if (selectedButton) {
          const { offsetLeft, offsetWidth } = selectedButton;
          activeEl.style.transform = `translateX(${offsetLeft}px)`;
          activeEl.style.width = `${offsetWidth}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedValue]);

  return (
    <div
      ref={el => {
        if (el && selectedValue) {
          const selectedButton = document.querySelector(`button[value="${selectedValue}"]`) as HTMLButtonElement;
          if (selectedButton) {
            const { offsetLeft, offsetWidth } = selectedButton;
            el.style.transform = `translateX(${offsetLeft}px)`;
            el.style.width = `${offsetWidth}px`;
          }
        }
      }}
      id={'active-filter-indicator'}
      className={`pointer-events-none absolute top-0 left-0 m-[2px] rounded-[6px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all ease-out ${
        isMounted ? 'duration-200' : 'opacity-0'
      }`}
      style={{
        height: 'calc(100% - 4px)',
      }}
      onTransitionEnd={() => {
        if (!isMounted) {
          setIsMounted(true);
        }
      }}
    />
  );
};
export const FilterButton = ({ children, value, ...props }: MergeElementProps<'button', FilterButtonProps>) => {
  const { className, onClick, ...restProps } = props;

  const { selectedValue, setSelectedValue } = useFilterBarContext();

  const isSelected = selectedValue === value;

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setSelectedValue(value);
    props.onClick && props.onClick(e);
  };

  return (
    <button
      className={`z-1 inline-flex flex-grow-1 items-center justify-center rounded-[6px] p-0 text-[13px] font-bold transition-all duration-100 select-none ${isSelected ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-700'} ${className} `}
      onClick={handleClick}
      value={value}
      {...restProps}
    >
      {children}
    </button>
  );
};

interface FilterBarProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (key: string) => void;
  className?: string;
}

export const FilterBar = ({ children, defaultValue, onChange, className }: FilterBarProps) => {
  return (
    <FilterBarContextProvider defaultValue={defaultValue} onChange={onChange}>
      <div
        className={cn(
          'relative flex h-8 w-full items-center gap-0 overflow-x-auto overflow-y-hidden rounded-[8px] border border-gray-200/50 bg-gray-200 px-1',
          className
        )}
      >
        {children}
      </div>
    </FilterBarContextProvider>
  );
};

export default Object.assign(FilterBar, {
  Button: FilterButton,
  Active: ActiveFilter,
});
