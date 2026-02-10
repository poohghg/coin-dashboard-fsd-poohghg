'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface HighlightProps<T> {
  value: T;
  children: ReactNode;
  className: string;
  animationClassName: string;
}

export const HighlightValue = <T,>({ value, children, className, animationClassName }: HighlightProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const prevRef = useRef(value);

  useEffect(() => {
    if (Object.is(prevRef.current, value)) {
      return;
    }

    prevRef.current = value;
    const node = ref.current;
    if (!node || !animationClassName) {
      return;
    }

    const classes = animationClassName.split(' ').filter(Boolean);

    const handleAnimationEnd = () => {
      node.classList.remove(...classes);
    };

    node.classList.remove(...classes);
    node.classList.add(...classes);
    node.addEventListener('animationend', handleAnimationEnd, { once: true });

    return () => {
      node.removeEventListener('animationend', handleAnimationEnd);
      node.classList.remove(...classes);
    };
  }, [value, animationClassName]);

  return (
    <div ref={ref} className={`${className ?? ''}`}>
      {children}
    </div>
  );
};
