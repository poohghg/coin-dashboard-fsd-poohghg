import { CoinMarketDTO, CoinMarketsSchema, CoinPriceDTO, CoinPricesSchema } from '@/src/entities/coin/model/schema';
import { FetchBuilder, ISuccessResponse } from '@/src/shared/lib/api';

export interface UpbitCoinApi {
  fetchCoinMarketAll(): Promise<ISuccessResponse<CoinMarketDTO[]>>;
  fetchCoinPrice(): Promise<ISuccessResponse<CoinPriceDTO[]>>;
  fetchCoinPriceByMarket(market: string): Promise<ISuccessResponse<CoinPriceDTO[]>>;
}

export class UpbitCoinApiImpl implements UpbitCoinApi {
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

    return {
      ...res,
      data: CoinMarketsSchema.parse(res.data),
    };
  }

  /**
   * 업비트에서 KRW 마켓의 모든 코인 시세 정보를 가져옵니다.
   * https://docs.upbit.com/kr/reference/list-quote-tickers
   */
  async fetchCoinPrice() {
    const url = 'https://api.upbit.com/v1/ticker/all';
    const res = await new FetchBuilder(url)
      .params({
        quote_currencies: 'KRW',
      })
      .build()
      .request<CoinPriceDTO[]>();

    return {
      ...res,
      data: CoinPricesSchema.parse(res.data),
    };
  }

  /**
   * 특정 마켓의 현재가 정보를 가져옵니다.
   * 페어 단위 현재가 조회
   * https://api.upbit.com/v1/ticker
   */
  async fetchCoinPriceByMarket(market: string) {
    const url = 'https://api.upbit.com/v1/ticker';
    const res = await new FetchBuilder(url)
      .params({
        markets: market,
      })
      .build()
      .request<CoinPriceDTO[]>();

    return {
      ...res,
      data: CoinPricesSchema.parse(res.data),
    };
  }
}
