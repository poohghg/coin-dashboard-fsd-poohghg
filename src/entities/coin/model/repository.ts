import { Coin } from '@/src/entities/coin';
import { UpbitCoinApi, UpbitCoinApiImpl } from '@/src/entities/coin/api/upbitCoinApi';
import { CoinMapper } from '@/src/entities/coin/model/mapper';

export interface CoinRepository {
  getCoinList(): Promise<Coin[]>;
}

/**
 * data 패칭 + DTO -> Domain Model 변환 담당
 */
export class CoinRepositoryImpl implements CoinRepository {
  private api: UpbitCoinApi;

  constructor() {
    this.api = new UpbitCoinApiImpl();
  }

  async getCoinList() {
    const res = await this.api.fetchCoinList();
    return CoinMapper.fromDTO(res.data);
  }

  // async getCoinMarketAll() {
  //   const res = await this.api.fetchCoinMarketAll();
  //
  //   if (!res.ok) {
  //     return res;
  //   }
  //
  //   return res.toModelMap(CoinMapper.fromMarketDTO);
  // }
}
