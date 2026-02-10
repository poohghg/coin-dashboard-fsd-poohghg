import { MarketTabKey } from '@/src/page/market/model/type';

export const ROUTERS = {
  home: () => '/',
  market: (marketId: string, tab?: MarketTabKey) => `/market/${marketId}/${tab ?? 'orderbook'}`,
};
