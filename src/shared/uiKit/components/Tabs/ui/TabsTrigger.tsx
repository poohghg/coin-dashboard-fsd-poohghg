import { MergeElementProps } from '@/src/shared/type/reactElement';
import { cn } from '@/src/shared/uiKit';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { forwardRef, MouseEvent } from 'react';

interface TabsTriggerProps {
  tabKey: string;
  className?: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, MergeElementProps<'button', TabsTriggerProps>>(
  ({ tabKey, className, onClick, ...props }, ref) => {
    const { selectedKey, setSelectedKey } = useTabsContext();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelectedKey(tabKey);

      if (onClick) {
        onClick(e);
      }
    };

    const isSelected = selectedKey === tabKey;

    return (
      <button
        type="button"
        ref={ref}
        role="tab"
        tabIndex={0}
        aria-selected={isSelected}
        onClick={handleClick}
        className={cn(
          'z-1 px-3 py-1.5 text-[15px] font-semibold text-gray-400 transition duration-75 hover:text-blue-500 aria-selected:text-blue-600',
          className
        )}
        id={`tab-${tabKey}`}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';
export default TabsTrigger;
