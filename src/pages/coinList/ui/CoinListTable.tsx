import { Coin } from '@/src/entities/coin/model';
import { CoinSortableField, CoinSortState } from '@/src/features/coin';
import { useFavoriteCoinStore } from '@/src/features/coin/model/favoriteCoinStore';
import { toasts } from '@/src/shared/uiKit';
import Image from 'next/image';

const formatCapVolume = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'; // 1조 이상 (T: Trillion)
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'; // 10억 이상 (B: Billion)
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'; // 100만 이상 (M: Million)
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const COIN_TABLE_HEADERS: { label: string; sortValue: CoinSortableField }[] = [
  { label: 'Price', sortValue: 'price' },
  { label: '24h %', sortValue: 'change24h' },
  { label: '24h Volume', sortValue: 'volume24h' },
  { label: 'Market Cap', sortValue: 'marketCap' },
];

interface CoinListTableProps {
  coins: Coin[];
  sortState: CoinSortState;
  sortedCoins: Coin[];
  onChangeSort: (field: CoinSortableField) => void;
}

// 검색어 처리 -> 정렬 처리
const CoinListTable = ({ sortState, sortedCoins, onChangeSort }: CoinListTableProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteCoinStore();

  const handleToggleFavorite = (coinName: string) => {
    const isToggled = toggleFavorite(coinName);

    if (isToggled) {
      toasts.success('Successfully added!');
    } else {
      toasts.success('Successfully deleted!');
    }
  };

  const handleChangeSort = (field: CoinSortableField) => () => {
    onChangeSort(field);
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-x-auto shadow-xl">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="sticky top-0 bg-gray-800/90 backdrop-blur-sm z-10">
          <tr className="text-xs text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-3 text-left w-60">Name</th>
            {COIN_TABLE_HEADERS.map(({ label, sortValue }) => (
              <th key={label} className="px-6 py-3 text-right">
                <div
                  className="flex justify-end items-center space-x-1 cursor-pointer"
                  role={'button'}
                  onClick={handleChangeSort(sortValue)}
                >
                  <span>{label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-100 rounded-2xl ${
                      sortValue === sortState.field
                        ? sortState.direction === 'DESC'
                          ? 'bg-blue-900 rotate-0'
                          : 'bg-blue-900 rotate-180'
                        : 'opacity-50'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedCoins.map(coin => {
            const isPositive = coin.change24h >= 0;
            const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
            const changeSign = isPositive ? '+' : '';
            return (
              <tr key={coin.symbol + coin.name} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 cursor-pointer transition-colors ${isFavorite(coin.name) ? 'text-yellow-500 fill-current' : 'text-gray-500 '}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => handleToggleFavorite(coin.name)}
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.813l-2.71 1.968a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.71-1.968a1 1 0 00-1.175 0l-2.71 1.968c-.784
      .57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.015 8.722c-.783-.573-.381-1.813.588-1.813h3.462a1 1 0 00.95-.69l1.07-3.292z"
                      />
                    </svg>
                    <Image src={coin.image} alt={coin.name} width={24} height={24} className="h-6 w-6 rounded-full" />
                    <div className="flex flex-col">
                      <span className="text-base font-semibold text-white">{coin.symbol}</span>
                      <span className="text-xs text-gray-400">{coin.name}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-white">{coin.price}</span>
                    <span className="text-xs text-gray-400">${coin.price}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`text-sm font-medium ${changeColor}`}>
                    {changeSign}
                    {coin.change24h}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm font-medium text-white">${formatCapVolume(coin.volume24h)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm font-medium text-white">${formatCapVolume(coin.marketCap)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinListTable;
