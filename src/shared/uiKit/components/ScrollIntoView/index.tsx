'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { useCallback } from 'react';

interface ScrollIntoViewProps {
  children?: React.ReactNode;
}

export const ScrollIntoView = ({ children, ...rest }: MergeElementProps<'div', ScrollIntoViewProps>) => {
  const onScrollIntoView = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, []);

  return (
    <div ref={onScrollIntoView} {...rest}>
      {children}
    </div>
  );
};
