'use client';

import { Button } from '@/src/shared/uiKit';
import InfiniteScrollTrigger from '@/src/shared/uiKit/components/InfiniteScrollTrigger';
import { ReactNode, useMemo, useState } from 'react';

interface SeeMoreListProps<T> {
  data: T[];
  children: (item: T[]) => ReactNode;
  pageSize?: number;
  isInfiniteScroll?: boolean;
}

export const SeeMoreList = <T,>({ data, children, pageSize = 20, isInfiniteScroll }: SeeMoreListProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const hasMore = visibleCount < data.length;
  const currentData = useMemo(() => data.slice(0, visibleCount), [data, visibleCount]);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + pageSize);
  };

  return (
    <>
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
    </>
  );
};
