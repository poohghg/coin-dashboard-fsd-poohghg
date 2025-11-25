import { Coin, CoinDTO } from '@/src/entities/coin';
import { BaseCoin } from '@/src/entities/coin/model/domain';

export class CoinMapper {
  static fromJSON(data: Record<string, any>[]): Coin[] {
    return data.map(item => CoinMapper.toCoin(item as CoinDTO));
  }

  static fromDTO(data: CoinDTO[]): Coin[] {
    return data.map(CoinMapper.toJSON);
  }

  static toCoin(data: CoinDTO): Coin {
    return new BaseCoin(
      data.symbol,
      data.name,
      data.image,
      data.current_price,
      data.price_change_percentage_24h,
      data.total_volume,
      data.market_cap
    );
  }

  static toJSON(coin: CoinDTO): Coin {
    return new BaseCoin(
      coin.symbol,
      coin.name,
      coin.image,
      coin.current_price,
      coin.price_change_percentage_24h,
      coin.total_volume,
      coin.market_cap
    ).toJSON();
  }
}
