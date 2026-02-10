'use client';

import { QueryKey, useQueryClient } from '@tanstack/react-query';
import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';

export const useResetPrevInfiniteQuery = (queryKey: QueryKey) => {
  const prevKeyRef = useRef<QueryKey>(queryKey);
  const queryClient = useQueryClient();

  useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (!isEqual(prevKey, queryKey)) {
      queryClient.setQueryData(prevKey, (oldData: any) => ({
        pageParams: oldData?.pageParams?.slice(0, 1) ?? [],
        pages: oldData?.pages?.slice(0, 1) ?? [],
      }));
    }
    prevKeyRef.current = queryKey;
  }, [queryKey]);
};
