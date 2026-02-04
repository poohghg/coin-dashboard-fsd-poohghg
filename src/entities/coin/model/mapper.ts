import { Coin, CoinDetail } from '@/src/entities/coin';
import { DerivedCoin } from '@/src/entities/coin/model/domain/DerivedCoin';
import { DerivedCoinDetail } from '@/src/entities/coin/model/domain/DerivedCoinDetail';
import { CoinDetailSocketDTO, CoinMarketDTO, CoinSocketDTO, CoinTickerDTO } from '@/src/entities/coin/model/schema';

export class CoinMapper {
  static toCoin(market: CoinMarketDTO, ticker: CoinTickerDTO): Coin {
    return new DerivedCoin({
      market: market.market,
      korean_name: market.korean_name,
      english_name: market.english_name,
      trade_price: ticker.trade_price,
      signed_change_price: ticker.signed_change_price,
      signed_change_rate: ticker.signed_change_rate,
      acc_trade_price: ticker.acc_trade_price,
      acc_trade_price_24h: ticker.acc_trade_price_24h,
      change_type: ticker.change,
      market_event: market.market_event,
      timestamp: ticker.timestamp,
    }).toJSON();
  }

  static toCoinFromSocket(prev: Coin, socket: CoinSocketDTO): Coin {
    return new DerivedCoin({
      market: prev.market,
      korean_name: prev.korean_name,
      english_name: prev.english_name,
      trade_price: socket.trade_price,
      signed_change_price: socket.signed_change_price,
      signed_change_rate: socket.signed_change_rate,
      acc_trade_price: socket.acc_trade_price,
      acc_trade_price_24h: socket.acc_trade_price_24h,
      change_type: socket.change,
      market_event: {
        warning: prev.isWarning,
        caution: {
          PRICE_FLUCTUATIONS: prev.isCautionPriceFluctuations,
          TRADING_VOLUME_SOARING: prev.isCautionTradingVolumeSoaring,
          DEPOSIT_AMOUNT_SOARING: prev.isCautionDepositAmountSoaring,
          GLOBAL_PRICE_DIFFERENCES: prev.isCautionGlobalPriceDifferences,
          CONCENTRATION_OF_SMALL_ACCOUNTS: prev.isCautionConcentrationOfSmallAccounts,
        },
      },
      timestamp: socket.timestamp,
    });
  }

  static toCoinDetail(market: CoinMarketDTO, ticker: CoinTickerDTO): CoinDetail {
    return new DerivedCoinDetail({
      market: market.market,
      korean_name: market.korean_name,
      english_name: market.english_name,
      trade_price: ticker.trade_price,
      signed_change_price: ticker.signed_change_price,
      signed_change_rate: ticker.signed_change_rate,
      acc_trade_price: ticker.acc_trade_price,
      acc_trade_price_24h: ticker.acc_trade_price_24h,
      change_type: ticker.change,
      market_event: market.market_event,
      timestamp: ticker.timestamp,
      opening_price: ticker.opening_price,
      high_price: ticker.high_price,
      low_price: ticker.low_price,
      prev_closing_price: ticker.prev_closing_price,
      trade_volume: ticker.trade_volume,
      acc_trade_volume: ticker.acc_trade_volume,
      acc_trade_volume_24h: ticker.acc_trade_volume_24h,
      highest_52_week_price: ticker.highest_52_week_price,
      highest_52_week_date: ticker.highest_52_week_date,
      lowest_52_week_price: ticker.lowest_52_week_price,
      lowest_52_week_date: ticker.lowest_52_week_date,
    }).toJSON();
  }

  static toCoinDetailFromSocket(prev: Coin, socket: CoinDetailSocketDTO): CoinDetail {
    return new DerivedCoinDetail({
      market: prev.market,
      korean_name: prev.korean_name,
      english_name: prev.english_name,
      trade_price: socket.trade_price,
      signed_change_price: socket.signed_change_price,
      signed_change_rate: socket.signed_change_rate,
      acc_trade_price: socket.acc_trade_price,
      acc_trade_price_24h: socket.acc_trade_price_24h,
      change_type: socket.change,
      market_event: {
        warning: prev.isWarning,
        caution: {
          PRICE_FLUCTUATIONS: prev.isCautionPriceFluctuations,
          TRADING_VOLUME_SOARING: prev.isCautionTradingVolumeSoaring,
          DEPOSIT_AMOUNT_SOARING: prev.isCautionDepositAmountSoaring,
          GLOBAL_PRICE_DIFFERENCES: prev.isCautionGlobalPriceDifferences,
          CONCENTRATION_OF_SMALL_ACCOUNTS: prev.isCautionConcentrationOfSmallAccounts,
        },
      },
      timestamp: socket.timestamp,
      opening_price: socket.opening_price,
      high_price: socket.high_price,
      low_price: socket.low_price,
      prev_closing_price: socket.prev_closing_price,
      trade_volume: socket.trade_volume,
      acc_trade_volume: socket.acc_trade_volume,
      acc_trade_volume_24h: socket.acc_trade_volume_24h,
      highest_52_week_price: socket.highest_52_week_price,
      highest_52_week_date: socket.highest_52_week_date,
      lowest_52_week_price: socket.lowest_52_week_price,
      lowest_52_week_date: socket.lowest_52_week_date,
    });
  }
}
