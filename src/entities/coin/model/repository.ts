import { Coin } from '@/src/entities/coin';
import { UpbitCoinApi, UpbitCoinApiImpl } from '@/src/entities/coin/api/upbitCoinApi';
import { CoinMapper } from '@/src/entities/coin/model/mapper';
import { CoinMarketDTO } from '@/src/entities/coin/model/schema';
import { CoinDetail } from '@/src/entities/coin/model/type';
import { HttpErrorFactory } from '@/src/shared/lib/error/BaseError';

export interface CoinRepository {
  getCoins(): Promise<Coin[]>;
  getCoinDetail(market: string): Promise<CoinDetail>;
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
    const [marketsRes, tickerRes] = await Promise.all([this.api.fetchCoinMarketAll(), this.api.fetchCoinTicker()]);

    const marketMap = marketsRes.data.reduce((acc, market) => {
      acc.set(market.market, market);
      return acc;
    }, new Map<string, CoinMarketDTO>());

    return tickerRes.data.map(priceDTO => {
      const marketDTO = marketMap.get(priceDTO.market);

      if (!marketDTO) {
        throw HttpErrorFactory.create({
          status: 404,
          message: `Market data not found for market: ${priceDTO.market}`,
        });
      }

      return CoinMapper.toCoin(marketDTO, priceDTO);
    });
  }

  async getCoinDetail(market: string) {
    const [marketRes, tickerRes] = await Promise.all([
      this.api.fetchCoinMarketAll(),
      this.api.fetchCoinTickerByMarket(market),
    ]);

    const marketDTO = marketRes.data.find(m => m.market === market);

    if (!marketDTO) {
      throw HttpErrorFactory.create({
        status: 404,
        message: `Market data not found for market: ${market}`,
      });
    }

    const tickerDTO = tickerRes.data[0];

    return CoinMapper.toCoinDetail(marketDTO, tickerDTO);
  }
}
