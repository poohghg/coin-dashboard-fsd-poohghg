import { If } from '@/src/shared/uiKit';
import { LoadCircleIcon } from '@/src/shared/uiKit/components';
import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  intersectionOptions?: IntersectionObserverInit;
}

const InfiniteScrollTrigger = ({
  onIntersect,
  isLoading,
  hasNextPage,
  intersectionOptions,
}: InfiniteScrollTriggerProps) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const isVisible = !isLoading && Boolean(hasNextPage);

  useEffect(() => {
    if (!triggerRef.current || isLoading || !hasNextPage) {
      return;
    }

    const callBack = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callBack, {
      root: intersectionOptions?.root || null,
      rootMargin: intersectionOptions?.rootMargin || '0px',
      threshold: intersectionOptions?.threshold || 0.1,
    });

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [onIntersect, isLoading, hasNextPage]);

  return (
    <>
      <If condition={isVisible}>
        <div
          ref={triggerRef}
          style={{ height: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        />
      </If>
      <If condition={Boolean(isLoading)}>
        <LoadCircleIcon />
      </If>
    </>
  );
};

export default InfiniteScrollTrigger;
