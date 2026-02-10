'use client';

import { Button } from '@/src/shared/uiKit';
import InfiniteScrollTrigger from '@/src/shared/uiKit/components/InfiniteScrollTrigger';
import { ReactNode, useMemo, useState } from 'react';

interface SeeMoreListProps<T> {
  data: T[];
  isInfiniteScroll?: boolean;
  children: (item: T[]) => ReactNode;
  pageSize?: number;
  className?: string;
}

export const SeeMoreList = <T,>({
  data,
  pageSize = 20,
  children,
  isInfiniteScroll,
  className,
}: SeeMoreListProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const hasMore = visibleCount < data.length;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + pageSize);
  };

  const currentData = useMemo(() => data.slice(0, visibleCount), [data, visibleCount]);

  return (
    <div className={className}>
      {children(currentData)}
      {hasMore && (
        <div className={'isolate mt-4'}>
          {isInfiniteScroll ? (
            <InfiniteScrollTrigger onIntersect={handleSeeMore} hasNextPage={hasMore} />
          ) : (
            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <Button
                className="mx-2 flex-shrink border-gray-300 hover:border-gray-500 hover:bg-gray-200 focus:ring-0"
                size={'sm'}
                variant={'outline'}
                onClick={handleSeeMore}
              >
                더보기
              </Button>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
