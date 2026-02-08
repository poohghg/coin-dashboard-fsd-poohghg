import { Time } from 'lightweight-charts';

export type TimeFrame = 'minutes/1' | 'minutes/15' | 'minutes/60' | 'minutes/240' | 'days' | 'weeks' | 'months';

export interface Candle {
  market: string;
  timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  acc_trade_volume: number;
  acc_trade_price: number;
  isBullish: boolean;
  change_rate: number;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  candlestickData: CandlestickData;
}

export interface CandlestickData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}
