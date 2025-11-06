import { MergeElementProps } from '@/src/shared/model/reactElement';
import { cn } from '@/src/shared/uiKit';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { forwardRef, memo } from 'react';

interface TabsTriggerProps {
  tabKey: string;
  className?: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, MergeElementProps<'button', TabsTriggerProps>>(
  ({ tabKey, className, ...props }, ref) => {
    const { selectedKey, setSelectedKey } = useTabsContext();

    const handleClick = () => {
      setSelectedKey(tabKey);
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
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export default memo(TabsTrigger);
