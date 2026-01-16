'use client';

import { MergeElementProps } from '@/src/shared/model/reactElement';
import { Button } from '@/src/shared/uiKit/ui';
import { FilterBarContextProvider, useFilterBarContext } from '@/src/shared/uiKit/ui/FilterBar/ui/FilterBarContext';
import { MouseEvent, ReactNode, useEffect } from 'react';

interface FilterButtonProps {
  children: ReactNode;
  value: string;
}

// 활성화 컴포넌트
const ActiveFilter = () => {
  const { selectedValue } = useFilterBarContext();

  useEffect(() => {
    // 리사이즈 대응
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
      id={'active-filter-indicator'}
      className="absolute top-0 left-0 m-[2px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-[6px] transition-all duration-200 ease-out pointer-events-none"
      style={{
        height: 'calc(100% - 4px)',
      }}
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
    />
  );
};
const FilterButton = ({ children, value, ...props }: MergeElementProps<'button', FilterButtonProps>) => {
  const { className, onClick, ...restProps } = props;

  const { selectedValue, setSelectedValue } = useFilterBarContext();

  const isSelected = selectedValue === value;

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setSelectedValue(value);
    props.onClick && props.onClick(e);
  };

  return (
    <Button
      className={`
        rounded-[6px] px-3 inline-flex flex-grow-1 items-center justify-center select-none text-[13px] transition-all font-bold duration-100 z-1
        ${
          isSelected
            ? 'text-blue-600 ' // 선택 시: 흰색 배경에 블루 텍스트 (또는 black)
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50' // 미선택 시: 회색 텍스트
        } 
        ${className}
      `}
      onClick={handleClick}
      value={value}
      {...restProps}
    >
      {children}
    </Button>
  );
};

interface FilterBarProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (key: string) => void;
  className?: string;
}

const FilterBar = ({ children, defaultValue, onChange, className }: FilterBarProps) => {
  return (
    <FilterBarContextProvider defaultValue={defaultValue} onChange={onChange}>
      <div
        className={`
          h-8 flex w-full gap-0 p-1 items-center overflow-y-auto rounded-[8px] relative
          bg-gray-200 border border-gray-200/50 ${className ?? ''}
        `}
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
