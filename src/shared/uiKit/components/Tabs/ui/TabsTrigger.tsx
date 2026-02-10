import { MergeElementProps } from '@/src/shared/type/reactElement';
import { cn } from '@/src/shared/uiKit';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

interface TabsTriggerProps {
  tabKey: string;
  asChild?: boolean; // Slot 사용 여부
  className?: string;
}

export const TabsTrigger = ({
  tabKey,
  asChild,
  className,
  onClick,
  ...props
}: MergeElementProps<'button', TabsTriggerProps>) => {
  const { selectedKey, setSelectedKey } = useTabsContext();
  const isSelected = selectedKey === tabKey;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedKey(tabKey);
    if (onClick) {
      onClick(e);
    }
  };

  const Component = asChild ? Slot : 'button';

  return (
    <Component
      role="tab"
      aria-selected={isSelected}
      onClick={handleClick}
      tabIndex={isSelected ? 0 : -1}
      id={`tab-${tabKey}`}
      className={cn(
        'z-1 px-3 py-1.5 text-[15px] font-semibold text-gray-400 transition duration-75 hover:text-blue-500 aria-selected:text-blue-600',
        className
      )}
      {...props}
    />
  );
};
