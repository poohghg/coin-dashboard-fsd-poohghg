import { MergeElementProps } from '@/src/shared/model/reactElement';
import { cn } from '@/src/shared/uiKit';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { forwardRef, memo, MouseEvent } from 'react';

interface TabsTriggerProps {
  tabKey: string;
  className?: string;
}

const TabTrigger = forwardRef<HTMLButtonElement, MergeElementProps<'button', TabsTriggerProps>>(
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
        className={cn(className)}
        id={`tab-${tabKey}`}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

TabTrigger.displayName = 'TabTrigger';

export default memo(TabTrigger);
