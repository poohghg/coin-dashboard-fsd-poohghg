import { OhlcData, UTCTimestamp } from 'lightweight-charts';
import { Candle } from '../type';

export interface DerivedCandleProps {
  market: string;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  acc_trade_volume: number;
  acc_trade_price: number;
  first_day_of_period?: string;
}

export class DerivedCandle implements Candle {
  constructor(private readonly props: DerivedCandleProps) {}

  get market() {
    return this.props.market;
  }

  get candle_date_time_kst() {
    return this.props.candle_date_time_kst;
  }

  get candle_date_time_utc() {
    return this.props.candle_date_time_utc;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get opening_price() {
    return this.props.opening_price;
  }

  get high_price() {
    return this.props.high_price;
  }

  get low_price() {
    return this.props.low_price;
  }

  get trade_price() {
    return this.props.trade_price;
  }

  get acc_trade_volume() {
    return this.props.acc_trade_volume;
  }

  get acc_trade_price() {
    return this.props.acc_trade_price;
  }

  get first_day_of_period() {
    return this.props.first_day_of_period;
  }

  get isBullish(): boolean {
    return this.trade_price >= this.opening_price;
  }

  get change_rate(): number {
    return (this.trade_price - this.opening_price) / this.opening_price;
  }

  get candlestickData(): OhlcData<UTCTimestamp> {
    const targetDateStr = this.first_day_of_period || this.candle_date_time_kst;
    const date = new Date(targetDateStr);
    const time = (date.getTime() / 1000) as UTCTimestamp;
    return {
      time: time,
      open: this.opening_price,
      high: this.high_price,
      low: this.low_price,
      close: this.trade_price,
    };
  }

  toJSON(): Candle {
    return {
      market: this.market,
      timestamp: this.timestamp,
      candle_date_time_kst: this.candle_date_time_kst,
      candle_date_time_utc: this.candle_date_time_utc,
      opening_price: this.opening_price,
      high_price: this.high_price,
      low_price: this.low_price,
      trade_price: this.trade_price,
      acc_trade_volume: this.acc_trade_volume,
      acc_trade_price: this.acc_trade_price,
      isBullish: this.isBullish,
      change_rate: this.change_rate,
      candlestickData: this.candlestickData,
      first_day_of_period: this.first_day_of_period,
    };
  }
}
