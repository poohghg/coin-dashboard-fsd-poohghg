import { MergeElementProps } from '@/src/shared/model/reactElement';
import { forwardRef, memo } from 'react';

interface TabsListProps {}

const TabList = forwardRef<HTMLDivElement, MergeElementProps<'div', TabsListProps>>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} role="tablist" className={`relative flex overflow-y-auto ${className}`} {...props}>
      {props.children}
    </div>
  );
});

TabList.displayName = 'TabList';
export default memo(TabList);
