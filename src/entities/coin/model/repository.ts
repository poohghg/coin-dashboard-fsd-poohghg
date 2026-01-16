import { Coin } from '@/src/entities/coin';
import { CoinMapper } from '@/src/entities/coin/api/mapper';
import { CoinMarketDTO } from '@/src/entities/coin/api/schema';
import { UpbitCoinApi, UpbitCoinApiImpl } from '@/src/entities/coin/api/upbitCoinApi';
import { HttpErrorFactory } from '@/src/shared/lib/error/BaseError';

export interface CoinRepository {
  getCoins(): Promise<Coin[]>;
}

/**
 * data 패칭 + DTO -> Domain Model 변환 담당
 */
export class CoinRepositoryImpl implements CoinRepository {
  private api: UpbitCoinApi;

  constructor() {
    this.api = new UpbitCoinApiImpl();
  }

  async getCoins() {
    const [marketsRes, pricesRes] = await Promise.all([this.api.fetchCoinMarketAll(), this.api.fetchCoinPrice()]);

    const marketMap = marketsRes.data.reduce((acc, market) => {
      acc.set(market.market, market);
      return acc;
    }, new Map<string, CoinMarketDTO>());

    return pricesRes.data.map(priceDTO => {
      const marketDTO = marketMap.get(priceDTO.market);

      if (!marketDTO) {
        throw HttpErrorFactory.create({
          status: 500,
          message: `Market data not found for market: ${priceDTO.market}`,
        });
      }

      return CoinMapper.toCoin(marketDTO, priceDTO);
    });
  }
}
