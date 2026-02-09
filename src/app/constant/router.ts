import { MarketTabKey } from '@/src/pages/market/model/type';

export const ROUTERS = {
  home: () => '/',
  market: (marketId: string, tab?: MarketTabKey) => `/market/${marketId}/${tab ?? 'orderbook'}`,
};
