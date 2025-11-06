import { CoinDTO } from '@/src/entities/coin/model';
import { BaseCoin } from '@/src/entities/coin/model/domain';
import { Coin } from '@/src/entities/coin/model/type';

export class CoinMapper {
  static fromJSON(data: Record<string, any>[]): Coin[] {
    return data.map(item => CoinMapper.toCoin(item as CoinDTO));
  }

  static fromDTO(data: CoinDTO[]): Coin[] {
    return data.map(CoinMapper.toCoin);
  }

  static toCoin(data: CoinDTO): Coin {
    return new BaseCoin(
      data.symbol,
      data.name,
      data.image,
      data.current_price,
      data.price_change_percentage_24h,
      data.market_cap_change_24h,
      data.market_cap
    ).toJSON();
  }
}
