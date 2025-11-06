import { MergeElementProps } from '@/src/shared/model/reactElement';
import { forwardRef, memo } from 'react';

const TabsList = forwardRef<HTMLDivElement, MergeElementProps<'div', object>>((props, ref) => {
  return (
    <div ref={ref} role="tablist" {...props}>
      {props.children}
    </div>
  );
});

TabsList.displayName = 'TabsList';
export default memo(TabsList);
