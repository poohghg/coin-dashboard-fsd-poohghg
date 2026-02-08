import { DerivedCandle } from './domain/DerivedCandle';
import { CandleDTO } from './schema';
import { Candle } from './type';

export class CandleMapper {
  static toCandle(dto: CandleDTO): Candle {
    return new DerivedCandle({
      market: dto.market,
      candle_date_time_utc: dto.candle_date_time_utc,
      candle_date_time_kst: dto.candle_date_time_kst,
      timestamp: dto.timestamp,
      opening_price: dto.opening_price,
      high_price: dto.high_price,
      low_price: dto.low_price,
      trade_price: dto.trade_price,
      acc_trade_volume: dto.candle_acc_trade_volume,
      acc_trade_price: dto.candle_acc_trade_price,
      first_day_of_period: dto.first_day_of_period,
    }).toJSON();
  }
}
