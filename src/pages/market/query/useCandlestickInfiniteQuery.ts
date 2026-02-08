import { TimeFrame } from '@/src/entities/candle';
import { CandleQueryKeys } from '@/src/entities/candle/queryOption/queryOption';
import { marketService } from '@/src/pages/market/usecase/marketService';
import { useInfiniteQuery } from '@tanstack/react-query';

const getISOString = (date: Date) => {
  return date.toISOString().split('.')[0];
};

const staleTimeInfinityGroup = ['days', 'weeks', 'months'];

interface CandleQueryParams {
  market: string;
  timeframe: TimeFrame;
  count?: number;
}

export const useCandlestickInfiniteQuery = ({ market, timeframe, count = 200 }: CandleQueryParams) => {
  return useInfiniteQuery({
    queryKey: CandleQueryKeys.candles({ market, timeframe }),
    queryFn: async ({ pageParam }) => {
      try {
        const data = await marketService.getCandles(market, timeframe, count, pageParam);
        return data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: firstPage => {
      if (firstPage.length < count) return undefined;
      const oldestCandle = firstPage[firstPage.length - 1];
      return oldestCandle.candle_date_time_utc;
    },
    initialPageParam: getISOString(new Date()),
    staleTime: staleTimeInfinityGroup.includes(timeframe) ? Infinity : 0,
    placeholderData: previousData => previousData,
  });
};
