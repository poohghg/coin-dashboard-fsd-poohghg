import { dehydrate, FetchQueryOptions, QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query';
import isEqual from 'lodash/isEqual';
import { cache } from 'react';

const getQueryClient = cache(() => new QueryClient());

function findDehydratedQuery(key: QueryKey) {
  const queryClient = getQueryClient();

  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(query => isEqual(query.queryKey, key));

  const queryData = queryClient.getQueryData(key);

  return { dehydratedQuery, queryData };
}

interface Props {
  queryKey: QueryKey;
  queryFn: QueryFunction;
  options?: Omit<FetchQueryOptions, 'queryFn' | 'queryKey'>;
  isInfinite?: boolean;
}

export async function getDehydratedQuery({ queryKey, queryFn, options }: Props) {
  const queryClient = getQueryClient();

  if (!queryClient.getQueryData(queryKey)) {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      ...options,
    });
  }

  return findDehydratedQuery(queryKey);
}
