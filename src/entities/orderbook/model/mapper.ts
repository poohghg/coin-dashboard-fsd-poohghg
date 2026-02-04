import { DerivedOrderbook } from '@/src/entities/orderbook/model/domain/DerivedOrderbook';
import { OrderbookDTO, OrderbookInstrumentDTO } from '@/src/entities/orderbook/model/schema';
import { Orderbook, OrderbookInstrument } from '@/src/entities/orderbook/model/type';

export class OrderbookMapper {
  static toOrderbook(dto: OrderbookDTO): Orderbook {
    return new DerivedOrderbook({
      market: dto.market,
      timestamp: dto.timestamp,
      totalAskSize: dto.total_ask_size,
      totalBidSize: dto.total_bid_size,
      units: dto.orderbook_units.map(u => ({
        askPrice: u.ask_price,
        bidPrice: u.bid_price,
        askSize: u.ask_size,
        bidSize: u.bid_size,
      })),
    }).toJSON();
  }

  static toOrderbookInstruments(dto: OrderbookInstrumentDTO): OrderbookInstrument {
    return {
      market: dto.market,
      quoteCurrency: dto.quote_currency,
      tickSize: Number(dto.tick_size),
      supportedLevels: dto.supported_levels.map(Number),
    };
  }
}
