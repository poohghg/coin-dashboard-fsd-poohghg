import { DerivedTradeTick } from '@/src/entities/trade/model/domain/DerivedTradeTick';
import { UpbitTradeTickDTO, UpbitTradeTickSocketDTO } from './schema';
import { TradeTick } from './type';

export class TradeTickMapper {
  static toTradeTick(dto: UpbitTradeTickDTO): TradeTick {
    return new DerivedTradeTick({
      market: dto.market,
      timestamp: dto.timestamp,
      price: dto.trade_price,
      volume: dto.trade_volume,
      prevClosingPrice: dto.prev_closing_price,
      changePrice: dto.change_price,
      side: dto.ask_bid,
      id: dto.sequential_id,
      tradeDateUtc: dto.trade_date_utc,
      tradeTimeUtc: dto.trade_time_utc,
    }).toJSON();
  }

  static toTradeTickFromSocket(dto: UpbitTradeTickSocketDTO): TradeTick {
    return new DerivedTradeTick({
      market: dto.market,
      timestamp: dto.timestamp,
      price: dto.trade_price,
      volume: dto.trade_volume,
      prevClosingPrice: dto.prev_closing_price,
      changePrice: dto.change_price,
      side: dto.ask_bid,
      id: dto.sequential_id,
      tradeDateUtc: dto.trade_date_utc,
      tradeTimeUtc: dto.trade_time_utc,
    });
  }
}
