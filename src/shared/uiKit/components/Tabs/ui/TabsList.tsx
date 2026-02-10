'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { forwardRef } from 'react';

const TabsList = forwardRef<HTMLDivElement, MergeElementProps<'div'>>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} role="tablist" className={`relative flex overflow-y-auto ${className}`} {...props}>
      {props.children}
    </div>
  );
});

TabsList.displayName = 'TabsList';
export default TabsList;
