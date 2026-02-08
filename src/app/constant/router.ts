import { MarketTabKey } from '@/src/pages/market/model/type';

export const routers = {
  home: () => '/',
  market: (marketId: string, tab?: MarketTabKey) => `/market/${marketId}/${tab ?? 'orderbook'}`,
};
