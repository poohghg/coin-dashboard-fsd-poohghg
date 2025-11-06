import { CoinDTO } from '@/src/entities/coin/model/dto';
import FetchBuilder from '@/src/shared/lib/api';
import { IErrorResponse, ISuccessResponse } from '@/src/shared/lib/api/model/Response';

export interface CoinApi {
  fetchCoinList(): Promise<ISuccessResponse<CoinDTO[]> | IErrorResponse<null>>;
}

export class CoinApiImpl implements CoinApi {
  async fetchCoinList() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const res = await new FetchBuilder(url)
      .params({
        vs_currency: 'usd',
      })
      .build()
      .request<CoinDTO[]>();

    return res;
  }
}
