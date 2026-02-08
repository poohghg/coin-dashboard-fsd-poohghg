import { CandleQuery } from '@/src/entities/candle/api/params';
import { FetchBuilder, ISuccessResponse } from '@/src/shared/lib/api';
import { CandleDTO, CandlesSchema } from '../model/schema';

export interface UpbitCandleApi {
  fetchCandles(query: CandleQuery): Promise<ISuccessResponse<CandleDTO[]>>;
}

export class UpbitCandleApiImpl implements UpbitCandleApi {
  async fetchCandles(query: CandleQuery) {
    const { market, timeframe, count = 200, to } = query;
    const url = '/api/candles';
    const res = await new FetchBuilder(url)
      .params({
        timeframe, // timeframe도 쿼리 파라미터로 넘겨줍니다.
        market,
        count: String(count),
        ...(to && { to }),
      })
      .build()
      .request<CandleDTO[]>();

    return {
      ...res,
      data: CandlesSchema.parse(res.data),
    };
  }
}
