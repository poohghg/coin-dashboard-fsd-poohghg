import { MarketTabKey } from '@/src/pages/market/model/type';

export const MarketTabKeys = new Set<MarketTabKey>(['orderbook', 'chart']);

export const MarketTabs: {
  label: string;
  value: MarketTabKey;
}[] = [
  { label: '호가', value: 'orderbook' },
  { label: '차트', value: 'chart' },
];
