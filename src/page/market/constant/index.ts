import { MarketTabKey } from '@/src/page/market/model/type';

export const MarketTabKeys = new Set<MarketTabKey>(['orderbook', 'chart']);

export const MarketTabs: Array<{
  label: string;
  value: MarketTabKey;
}> = [
  { label: '호가', value: 'orderbook' },
  { label: '차트', value: 'chart' },
];
