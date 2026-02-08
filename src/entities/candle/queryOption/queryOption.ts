import { CandleQuery } from '@/src/entities/candle/api/params';
import { QueryOptions } from '@/src/shared/lib/reactQuery/model/reactQuery';
import { UseQueryOptions } from 'react-query/types/react/types';

export const candleQueryKeys = {
  base: 'candle' as const,
  candles: ({ market, timeframe, to, count }: CandleQuery) =>
    [candleQueryKeys.base, 'candes', { market, timeframe, to, count }] as const,
};

const makeQueryOptions = <T, TSelect = T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  queryOptions?: QueryOptions<T, TSelect>
): UseQueryOptions<T, Error, TSelect> => ({
  queryKey: queryKey,
  queryFn: queryFn,
  ...queryOptions,
});

export const CandleQueryOptions = {
  candles: <T, TSelect = T>(query: CandleQuery, queryFn: () => Promise<T>, queryOptions?: QueryOptions<T, TSelect>) =>
    makeQueryOptions(candleQueryKeys.candles(query), queryFn, {
      ...queryOptions,
    }),
};
