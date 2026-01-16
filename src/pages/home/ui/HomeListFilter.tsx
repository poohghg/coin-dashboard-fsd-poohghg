import { CoinSortableField, CoinSortState } from '@/src/features/coin';
import { FilterBar } from '@/src/shared/uiKit';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Filters: {
  value: CoinSortableField;
  label: string;
}[] = [
  { value: 'korean_name', label: '코인명' },
  { value: 'trade_price', label: '현재가' },
  { value: 'signed_change_rate', label: '전일대비' },
  { value: 'acc_trade_price_24h', label: '거래대금' },
];

interface HomeListFilterProps {
  sortState: CoinSortState;
  changeSortState: (field: CoinSortableField) => void;
}

export const HomeListFilter = ({ sortState, changeSortState }: HomeListFilterProps) => {
  return (
    <FilterBar defaultValue={'signed_change_rate'}>
      <FilterBar.Active />
      {Filters.map(({ value, label }) => (
        <FilterBar.Button key={value} value={value} onClick={() => changeSortState(value)}>
          <span className="flex items-center gap-1">
            {label}
            {sortState.field === value ? sortState.direction === 'ASC' ? <ChevronUp /> : <ChevronDown /> : null}
          </span>
        </FilterBar.Button>
      ))}
    </FilterBar>
  );
};
