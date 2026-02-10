import { Candle, TimeFrame } from '@/src/entities/candle';
import { CandleQueryKeys } from '@/src/entities/candle/queryOption/queryOption';
import { marketService } from '@/src/page/market/usecase/marketService';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const staleTimeGroup = ['days', 'weeks', 'months'];

const transformCandleData = (data: InfiniteData<Candle[], string>) => {
  return data.pages.flat();
};

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
      if (firstPage.length < count) {
        return undefined;
      }
      const oldestCandle = firstPage[firstPage.length - 1];
      return oldestCandle.candle_date_time_utc;
    },
    initialPageParam: new Date().toISOString().split('.')[0],
    staleTime: staleTimeGroup.includes(timeframe) ? 5 * 60 * 1000 : 0,
    placeholderData: previousData => previousData,
    select: transformCandleData,
  });
};
