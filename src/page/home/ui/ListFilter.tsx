import { CoinSortableField } from '@/src/features/coin';
import { yieldToMain } from '@/src/shared/lib/utils';
import { FilterBar } from '@/src/shared/uiKit';

const Filters: Array<{
  value: CoinSortableField;
  label: string;
}> = [
  { value: 'korean_name', label: '코인명' },
  { value: 'trade_price', label: '현재가' },
  { value: 'signed_change_rate', label: '전일대비' },
  { value: 'acc_trade_price_24h', label: '거래대금' },
];

interface RealTimeChartFilterProps {
  sortState: {
    field: CoinSortableField;
    direction: 'ASC' | 'DESC';
  };
  onChangeSortState: (field: CoinSortableField) => void;
  onChangeDirection: (direction: 'ASC' | 'DESC') => void;
}

// 절대 위치 - 헤더 높이
const TOP_OFFSET = 150 - 52;

export const ListFilter = ({ sortState, onChangeSortState, onChangeDirection }: RealTimeChartFilterProps) => {
  const handleChangeSortState = async (field: CoinSortableField) => {
    onChangeSortState(field);
    await toTop();
  };

  const handleChangeDirection = async (direction: 'ASC' | 'DESC') => {
    onChangeDirection(direction);
    await toTop();
  };

  const toTop = async () => {
    if (window.scrollY < 150) {
      return;
    }
    await yieldToMain();
    window.scrollTo({
      top: TOP_OFFSET,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`top-main-header sticky z-10 flex h-[64px] items-center justify-between gap-1.5 bg-white`}>
      <FilterBar defaultValue={sortState.field} className={`h-[32px]`}>
        <FilterBar.Active />
        {Filters.map(({ value, label }) => (
          <FilterBar.Button key={value} value={value} onClick={() => handleChangeSortState(value)}>
            <span className="flex items-center">{label}</span>
          </FilterBar.Button>
        ))}
      </FilterBar>
      <div className="flex shrink-0 items-center">
        <button
          onClick={() => handleChangeDirection(sortState.direction === 'ASC' ? 'DESC' : 'ASC')}
          className={`flex h-[30px] items-center gap-1 rounded-[8px] px-3 text-[11px] font-medium transition-all ease-in ${
            sortState.direction === 'ASC'
              ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100'
              : 'bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100'
          } `}
        >
          <span>{sortState.direction === 'ASC' ? '낮은순' : '높은순'}</span>
        </button>
      </div>
    </div>
  );
};
