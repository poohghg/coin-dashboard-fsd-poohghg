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

  // const onScrollIntoView = useCallback(
  //   (el: HTMLDivElement | null) => {
  //     if (!el) return;
  //     el.scrollIntoView({ behavior: 'instant', block: 'center' });
  //     scrollCallback?.(el);
  //     // const observer = new IntersectionObserver(
  //     //   ([entry]) => {
  //     //     if (entry.isIntersecting) {
  //     //       scrollCallback?.(el);
  //     //       observer.disconnect();
  //     //     }
  //     //   },
  //     //   { threshold: 1.0 }
  //     // );
  //     //
  //     // observer.observe(el);
  //   },
  //   [scrollCallback]
  // );

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};
