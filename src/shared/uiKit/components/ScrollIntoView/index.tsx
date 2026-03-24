'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { useEffect, useRef } from 'react';

interface ScrollIntoViewProps {
  children?: React.ReactNode;
  scrollCallback?: (el?: HTMLDivElement) => void;
}

export const ScrollIntoView = ({
  children,
  scrollCallback,
  ...rest
}: MergeElementProps<'div', ScrollIntoViewProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'instant', block: 'center' });
      scrollCallback?.(ref.current);
    }
  }, [scrollCallback]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};
