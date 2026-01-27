import { HEADER_SIZE } from '@/src/app/constant/size';
import { CoinSortableField } from '@/src/features/coin';
import { FilterBar, Label, RadioGroup, RadioGroupItem, Spacing } from '@/src/shared/uiKit';

const Filters: {
  value: CoinSortableField;
  label: string;
}[] = [
  { value: 'korean_name', label: '코인명' },
  { value: 'trade_price', label: '현재가' },
  { value: 'signed_change_rate', label: '전일대비' },
  { value: 'acc_trade_price_24h', label: '거래대금' },
];

const RadioGroupItems: {
  value: 'ASC' | 'DESC';
  label: string;
  id: string;
}[] = [
  { value: 'DESC', label: '내림차순', id: 'r3' },
  { value: 'ASC', label: '오름차순', id: 'r4' },
];

interface RealTimeChartFilterProps {
  sortState: {
    field: CoinSortableField;
    direction: 'ASC' | 'DESC';
  };
  onChangeSortState: (field: CoinSortableField) => void;
  onChangeDirection: (direction: 'ASC' | 'DESC') => void;
}

export const ListFilter = ({ sortState, onChangeSortState, onChangeDirection }: RealTimeChartFilterProps) => {
  return (
    <div
      className={`bg-white sticky z-10`}
      style={{
        top: `${HEADER_SIZE.LAYOUT_HEIGHT}px`,
      }}
    >
      <FilterBar defaultValue={sortState.field}>
        <FilterBar.Active />
        {Filters.map(({ value, label }) => (
          <FilterBar.Button key={value} value={value} onClick={() => onChangeSortState(value)}>
            <span className="flex items-center gap-1">{label}</span>
          </FilterBar.Button>
        ))}
      </FilterBar>
      <Spacing size={12} />
      <RadioGroup className={'flex justify-end gap-3'} value={sortState.direction}>
        {RadioGroupItems.map(({ value, label, id }) => (
          <div key={value} className="flex items-center gap-1">
            <RadioGroupItem
              value={value}
              id={id}
              onClick={() => {
                onChangeDirection(value);
              }}
              className={'w-3 h-3'}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
      <Spacing size={12} />
    </div>
  );
};
