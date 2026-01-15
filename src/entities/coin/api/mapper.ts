import { Coin } from '@/src/entities/coin';
import { CoinMarketDTO, CoinPriceDTO } from '@/src/entities/coin/api/schema';
import { CoinImpl } from '@/src/entities/coin/model/domain/CoinImpl';

export class CoinMapper {
  static toCoin(coinMarketDTO: CoinMarketDTO, coinPriceDTO: CoinPriceDTO): Coin {
    return new CoinImpl(
      coinMarketDTO.market,
      coinMarketDTO.korean_name,
      coinMarketDTO.english_name,
      coinPriceDTO.trade_price,
      coinPriceDTO.opening_price,
      coinPriceDTO.high_price,
      coinPriceDTO.low_price,
      coinPriceDTO.change_price,
      coinPriceDTO.change_rate,
      coinPriceDTO.signed_change_rate,
      coinPriceDTO.trade_volume,
      coinPriceDTO.acc_trade_price_24h,
      coinPriceDTO.change,
      coinMarketDTO.market_event
    ).toJSON();
  }
}
