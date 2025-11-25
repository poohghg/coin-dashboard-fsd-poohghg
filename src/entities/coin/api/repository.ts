import { Coin } from '@/src/entities/coin';
import { CoinApi } from '@/src/entities/coin/api/api';
import { CoinMapper } from '@/src/entities/coin/model/mapper';
import { IErrorResponse, ISuccessResponse } from '@/src/shared/lib/api/model/Response';

export interface CoinRepository {
  getCoinList(): Promise<ISuccessResponse<Coin[]> | IErrorResponse<null>>;
}

/**
 * data 패칭 + DTO -> Domain Model 변환 담당
 */
export class CoinRepositoryImpl implements CoinRepository {
  constructor(private api: CoinApi) {}

  async getCoinList() {
    const res = await this.api.fetchCoinList();

    if (!res.ok) {
      return res;
    }

    return res.toModelMap(CoinMapper.fromDTO);
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
