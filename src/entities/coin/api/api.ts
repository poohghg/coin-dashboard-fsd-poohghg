import { CoinDTO, CoinMarketDTO, CoinPriceDTO } from '@/src/entities/coin/model';
import { FetchBuilder, IErrorResponse, ISuccessResponse } from '@/src/shared/lib/api';

export interface CoinApi {
  fetchCoinList(): Promise<ISuccessResponse<CoinDTO[]> | IErrorResponse<null>>;
  fetchCoinMarketAll(): Promise<ISuccessResponse<CoinMarketDTO[]> | IErrorResponse<null>>;
  fetchCoinCurrentPrice(): Promise<ISuccessResponse<CoinPriceDTO[]> | IErrorResponse<null>>;
}

export class CoinApiImpl implements CoinApi {
  async fetchCoinList() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const res = await new FetchBuilder(url)
      .params({
        vs_currency: 'usd',
        per_page: '250',
      })
      .build()
      .request<CoinDTO[]>();

    return res;
  }

  /**
   * 업비트에서 지원하는 모든 마켓 코드와 마켓명을 가져옵니다.
   * https://docs.upbit.com/kr/reference/list-trading-pairs
   */
  async fetchCoinMarketAll() {
    const url = 'https://api.upbit.com/v1/market/all';
    const res = await new FetchBuilder(url)
      .params({
        isDetails: 'true',
      })
      .build()
      .request<CoinMarketDTO[]>();

    return res;
  }

  /**
   * 업비트에서 KRW 마켓의 모든 코인 시세 정보를 가져옵니다.
   * https://docs.upbit.com/kr/reference/list-quote-tickers
   */
  async fetchCoinCurrentPrice() {
    const url = 'https://api.upbit.com/v1/ticker/all';
    const res = await new FetchBuilder(url)
      .params({
        quote_currencies: 'KRW',
      })
      .build()
      .request<CoinPriceDTO[]>();

    return res;
  }
}
