'use client';

import { QueryKey, useQueryClient } from '@tanstack/react-query';
import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';

export const useResetPrevInfiniteQuery = (queryKey: QueryKey) => {
  const [prevKey, setPrevKey] = useState(queryKey);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isEqual(prevKey, queryKey)) {
      queryClient.setQueryData(prevKey, (oldData: any) => ({
        pageParams: oldData?.pageParams?.slice(0, 1) ?? [],
        pages: oldData?.pages?.slice(0, 1) ?? [],
      }));
      setPrevKey(queryKey);
    }
  }, [queryKey]);
};
