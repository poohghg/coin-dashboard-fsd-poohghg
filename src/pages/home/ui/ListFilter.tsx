import { CoinSortableField } from '@/src/features/coin';
import { FilterBar } from '@/src/shared/uiKit';

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
    <div className={`top-main-header sticky z-10 flex h-[64px] justify-center bg-white`}>
      <FilterBar defaultValue={sortState.field} className={`h-[28px]`}>
        <FilterBar.Active />
        {Filters.map(({ value, label }) => (
          <FilterBar.Button key={value} value={value} onClick={() => onChangeSortState(value)}>
            <span className="flex items-center">{label}</span>
          </FilterBar.Button>
        ))}
      </FilterBar>
      {/*<div className="flex justify-end">*/}
      {/*  <button*/}
      {/*    className={`rounded-[6px] border border-gray-300 px-2 py-1 text-[11px] text-gray-500 ${*/}
      {/*      sortState.direction === 'ASC' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white hover:bg-gray-50'*/}
      {/*    } `}*/}
      {/*    onClick={() => {*/}
      {/*      onChangeDirection(sortState.direction === 'ASC' ? 'DESC' : 'ASC');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {sortState.direction === 'ASC' ? '오름차순' : '내림차순'}*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<RadioGroup className={'flex justify-end gap-3'} value={sortState.direction}>*/}
      {/*  {RadioGroupItems.map(({ value, label, id }) => (*/}
      {/*    <div key={value} className="flex items-center gap-1">*/}
      {/*      <RadioGroupItem*/}
      {/*        value={value}*/}
      {/*        id={id}*/}
      {/*        onClick={() => {*/}
      {/*          onChangeDirection(value);*/}
      {/*        }}*/}
      {/*        className={'h-[11px] w-[11px]'}*/}
      {/*      />*/}
      {/*      <Label htmlFor={id} className={`text-[11px]`}>*/}
      {/*        {label}*/}
      {/*      </Label>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</RadioGroup>*/}
    </div>
  );
};
