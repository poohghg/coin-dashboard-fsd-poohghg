'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { useCallback } from 'react';

interface ScrollIntoViewProps {
  children?: React.ReactNode;
  scrollCallback?: (el?: HTMLDivElement) => void;
}

export const ScrollIntoView = ({
  children,
  scrollCallback,
  ...rest
}: MergeElementProps<'div', ScrollIntoViewProps>) => {
  const onScrollIntoView = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        requestAnimationFrame(() => {
          scrollCallback?.(el);
        });
      }
    },
    [scrollCallback]
  );

  return (
    <div ref={onScrollIntoView} {...rest}>
      {children}
    </div>
  );
};
