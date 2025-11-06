import { Coin } from '@/src/entities/coin/model';

export type CoinSortableField = Extract<keyof Coin, 'price' | 'change24h' | 'volume24h' | 'marketCap'>;

export type SortDirection = 'ASC' | 'DESC';

export interface CoinSortState {
  field: CoinSortableField;
  direction: SortDirection;
}
