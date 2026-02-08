import { TimeFrame } from '@/src/entities/candle/model/type';

export interface CandleQuery {
  market: string;
  timeframe: TimeFrame;
  count?: number;
  to?: string;
}
