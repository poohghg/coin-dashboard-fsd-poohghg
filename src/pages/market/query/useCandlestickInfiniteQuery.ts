import { TimeFrame } from '@/src/entities/candle';
import { marketService } from '@/src/pages/market/usecase/marketService';
import { useInfiniteQuery } from '@tanstack/react-query';

interface CandleQueryParams {
  market: string;
  timeframe: TimeFrame;
  count?: number;
}

const getKstISOString = (date: Date) => {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().split('.')[0];
};

const staleTimeInfinityGroup = ['days', 'weeks', 'months'];

export const useCandlestickInfiniteQuery = ({ market, timeframe, count = 200 }: CandleQueryParams) => {
  return useInfiniteQuery({
    queryKey: ['candles', market, timeframe],
    queryFn: async ({ pageParam }) => {
      const data = await marketService.getCandles(market, timeframe, count, pageParam);
      return data;
    },
    getPreviousPageParam: firstPage => {
      if (firstPage.length === 0) return undefined;
      const oldestCandle = firstPage[firstPage.length - 1];
      return oldestCandle.candle_date_time_kst;
    },
    getNextPageParam: () => undefined,
    initialPageParam: getKstISOString(new Date()),
    staleTime: staleTimeInfinityGroup.includes(timeframe) ? Infinity : 0,
    placeholderData: previousData => previousData,
  });
};
