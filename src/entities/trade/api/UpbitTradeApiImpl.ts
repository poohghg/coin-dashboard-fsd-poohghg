// entities/trade/api/upbitTradeApi.ts
import { TradeTicksSchema, UpbitTradeTickDTO } from '@/src/entities/trade/model/schema';
import { FetchBuilder, ISuccessResponse } from '@/src/shared/lib/api';

export interface UpbitTradeApi {
  fetchTradeTicks(
    market: string,
    count?: number,
    to?: string,
    cursor?: string
  ): Promise<ISuccessResponse<UpbitTradeTickDTO[]>>;
}

export class UpbitTradeApiImpl implements UpbitTradeApi {
  async fetchTradeTicks(market: string, count: number = 500, to?: string, cursor?: string) {
    const url = 'https://api.upbit.com/v1/trades/ticks';

    const builder = new FetchBuilder(url).params({ market, count });

    if (to) {
      builder.params({ to });
    }
    if (cursor) {
      builder.params({ cursor });
    }

    const res = await builder.build().request<UpbitTradeTickDTO[]>();

    return {
      ...res,
      data: TradeTicksSchema.parse(res.data),
    };
  }
}
