import { CandleQueryOptions } from '@/src/entities/candle';
import { CandleQuery } from '@/src/entities/candle/api/params';
import { marketService } from '@/src/page/market/usecase/marketService';
import { useQuery } from '@tanstack/react-query';

const useCandlestickDataQuery = ({ market, timeframe, count, to }: CandleQuery) => {
  const options = CandleQueryOptions.candles(
    { market, timeframe, count, to },
    () => marketService.getCandles(market, timeframe, count, to),
    { enabled: false }
  );

  const { data } = useQuery(options);
};
