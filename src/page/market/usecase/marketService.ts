import { Candle, TimeFrame } from '@/src/entities/candle';
import { CandleRepository, CandleRepositoryImpl } from '@/src/entities/candle/model/repository';
import { CoinRepository, CoinRepositoryImpl } from '@/src/entities/coin';
import { CoinDetail } from '@/src/entities/coin/model/type';
import { OrderbookRepository, OrderbookRepositoryImpl } from '@/src/entities/orderbook/model/repository';
import { Orderbook } from '@/src/entities/orderbook/model/type';
import { TradeTick } from '@/src/entities/trade';
import { TradeRepository, TradeRepositoryImpl } from '@/src/entities/trade/model/repository';

interface MarketUseCase {
  getCoinDetail(market: string): Promise<CoinDetail>;
  getOrderbook(market: string): Promise<Orderbook>;
  getRecentTrades(market: string, count?: number, to?: string, cursor?: string): Promise<TradeTick[]>;
  getMarketData(market: string): Promise<{ orderBook: Orderbook; recentTrades: TradeTick[] }>;
  getCandles(market: string, timeframe: TimeFrame, count?: number, to?: string): Promise<Candle[]>;
}

class MarketService implements MarketUseCase {
  constructor(
    private coinRepository: CoinRepository,
    private orderbookRepository: OrderbookRepository,
    private tradeRepository: TradeRepository,
    private candleRepository: CandleRepository
  ) {
    this.coinRepository = coinRepository;
  }

  getCoinDetail = async (market: string) => {
    return await this.coinRepository.getCoinDetail(market);
  };

  getOrderbook = async (market: string) => {
    return await this.orderbookRepository.getOrderbook(market);
  };

  getRecentTrades = async (market: string, count?: number, to?: string, cursor?: string) => {
    return await this.tradeRepository.getRecentTrades(market, count, to, cursor);
  };

  getMarketData = async (market: string) => {
    const [orderBook, recentTrades] = await Promise.all([
      this.orderbookRepository.getOrderbook(market),
      this.tradeRepository.getRecentTrades(market),
    ]);

    return { orderBook, recentTrades };
  };

  getCandles = async (market: string, timeframe: TimeFrame, count?: number, to?: string) => {
    return await this.candleRepository.getCandles({
      market,
      timeframe,
      count,
      to,
    });
  };
}

const coinRepository = new CoinRepositoryImpl();
const orderbookRepository = new OrderbookRepositoryImpl();
const tradeRepository = new TradeRepositoryImpl();
const candleRepository = new CandleRepositoryImpl();
export const marketService = new MarketService(coinRepository, orderbookRepository, tradeRepository, candleRepository);
