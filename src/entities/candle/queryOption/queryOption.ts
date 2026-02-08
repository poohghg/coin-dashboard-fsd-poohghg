import { CandleQuery } from '@/src/entities/candle/api/params';
import { QueryOptions } from '@/src/shared/lib/reactQuery/model/reactQuery';
import { UseQueryOptions } from '@tanstack/react-query';

export const CandleQueryKeys = {
  base: 'candle' as const,
  candles: ({ market, timeframe }: CandleQuery) => ['candes', market, timeframe] as const,
};

// todo makeQueryOptions generic하게 빼내기
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
    makeQueryOptions(CandleQueryKeys.candles(query), queryFn, {
      ...queryOptions,
    }),
};
