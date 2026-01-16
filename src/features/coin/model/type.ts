import { Coin } from '@/src/entities/coin/model';

export type CoinTabKeys = 'all' | 'favorites';

export type CoinSortableField = Extract<
  keyof Coin,
  'korean_name' | 'trade_price' | 'signed_change_rate' | 'acc_trade_price_24h'
>;

export type SortDirection = 'ASC' | 'DESC';

export interface CoinSortState {
  field: CoinSortableField;
  direction: SortDirection;
}
