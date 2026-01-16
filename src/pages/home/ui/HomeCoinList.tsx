'use client';

import { Coin } from '@/src/entities/coin';
import { CoinViewModel } from '@/src/entities/coin/ui/CoinViewModel';
import { FavoriteCoinButton } from '@/src/features/coin/ui';

interface HomeCoinListProps {
  coins: Coin[];
}

const ListRow = ({ coin, rank }: { coin: Coin; rank: number }) => {
  const changeColor = CoinViewModel.changeColor(coin.change_type);

  return (
    <li className="flex w-full items-center py-3 text-[0.9375em] max-[360px]:text-[0.8125em] max-[320px]:text-[0.6875em] rounded-2xl hover:bg-gray-200 hover:text-black cursor-pointer transition-colors duration-200">
      <div className={'flex items-center justify-center w-6'}>
        <FavoriteCoinButton coinId={coin.market} />
      </div>
      {/* 순위 */}
      <div className="flex items-center justify-center w-8.5">
        <div className="font-medium text-gray-900">{rank}</div>
      </div>
      {/* 코인명 */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-medium text-gray-900">{coin.korean_name}</div>
        <div className="text-[0.8em] text-gray-500 truncate">{coin.english_name}</div>
      </div>
      {/* 현재가 */}
      <div className="w-[29%] text-right">
        <div className={`font-medium tabular-nums ${changeColor}`}>{CoinViewModel.formatPrice(coin.trade_price)}</div>
      </div>
      {/* 전일대비 */}
      <div className="w-[18%] text-right ml-4">
        <div className={`flex justify-end items-center gap-0.5 font-medium tabular-nums ${changeColor}`}>
          {CoinViewModel.formatChangeRate(coin.signed_change_rate)}
        </div>
        <div className={`text-[0.8em] tabular-nums ${changeColor}`}>{CoinViewModel.formatPrice(coin.change_price)}</div>
      </div>
      {/* 거래대금 */}
      <div className="w-[14%] text-right ml-4">
        <div className="font-medium tabular-nums text-gray-900">
          {CoinViewModel.formatVolume(coin.acc_trade_price_24h)}
        </div>
      </div>
    </li>
  );
};

const HomeCoinList = ({ coins }: HomeCoinListProps) => {
  return (
    <ul className="divide-y divide-gray-100">
      {coins.map((coin, index) => (
        <ListRow key={coin.market} coin={coin} rank={index + 1} />
      ))}
    </ul>
  );
};

export default HomeCoinList;
