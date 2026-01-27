'use client';

import { HEADER_SIZE } from '@/src/app/constant/size';
import { Coin } from '@/src/entities/coin';
import { useLiveCoin } from '@/src/entities/coin/lib/useUpbitWebSocket';
import { CoinViewModel } from '@/src/entities/coin/ui/CoinViewModel';
import { FavoriteCoinButton } from '@/src/features/coin/ui';
import { HighlightValue, SeeMoreList } from '@/src/shared/uiKit';

const ListHeader = ({ fetchAt }: { fetchAt: Date }) => {
  const data = new Date(fetchAt);
  const time = `${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`;

  return (
    <li
      className={`max-[320px]:text-[0.6875em]"> sticky z-10 flex w-full items-center border-y border-gray-200 bg-white py-3 text-[14px] font-semibold text-gray-500 shadow-sm max-[360px]:text-[0.8125em]`}
      style={{ top: `${44 + HEADER_SIZE.LAYOUT_HEIGHT}px` }}
    >
      <div className="flex min-w-0 flex-1 pl-6">
        <span>순위·실시간 {time} 기준</span>
      </div>
      <div className="w-[29%] text-right">현재가</div>
      <div className="ml-4 w-[18%] text-right">전일대비</div>
      <div className="ml-4 w-[14%] text-right">거래대금(24H)</div>
    </li>
  );
};

const ListRow = ({ coin, rank }: { coin: Coin; rank: number }) => {
  const liveCoin = useLiveCoin(coin.market, coin);
  const changeColor = CoinViewModel.changeColor(liveCoin.change_type);
  const changeAnimation = CoinViewModel.changeAnimationClass(liveCoin.change_type);

  return (
    <li className="flex w-full cursor-pointer items-center rounded-2xl py-3 text-[15px] transition-colors duration-200 hover:bg-gray-200 hover:text-black max-[360px]:text-[0.8125em] max-[320px]:text-[0.6875em]">
      <div className={'flex w-6 items-center justify-center'}>
        <FavoriteCoinButton coinId={liveCoin.symbol} />
      </div>
      {/* 순위 */}
      <div className="flex w-5.5 items-center justify-center">
        <div className="font-medium text-gray-900">{rank}</div>
      </div>
      {/* 코인명 */}
      <div className="flex min-w-0 flex-1 flex-col pl-3">
        <div className="font-medium text-gray-900">{liveCoin.korean_name}</div>
        <div className="truncate text-[0.8em] text-gray-500">{liveCoin.english_name}</div>
      </div>
      {/* 현재가 */}
      <div className="w-[29%] text-right">
        <HighlightValue
          value={liveCoin.trade_price}
          className={`rounded-[6px] py-1 pr-2`}
          animationClassName={changeAnimation}
        >
          <span className={`font-medium tabular-nums ${changeColor}`}>
            {CoinViewModel.formatPrice(liveCoin.trade_price)}
          </span>
        </HighlightValue>
      </div>
      {/* 전일대비 */}
      <div className="ml-4 w-[18%] text-right">
        <div className={`flex items-center justify-end gap-0.5 font-medium tabular-nums ${changeColor}`}>
          {CoinViewModel.formatChangeRate(liveCoin.signed_change_rate)}
        </div>
        <div className={`text-[0.8em] tabular-nums ${changeColor}`}>
          {CoinViewModel.formatPrice(liveCoin.change_price)}
        </div>
      </div>
      {/* 거래대금 */}
      <div className="ml-4 w-[14%] text-right">
        <div className="font-medium text-gray-900 tabular-nums">
          {CoinViewModel.formatVolume(liveCoin.acc_trade_price_24h)}
        </div>
      </div>
    </li>
  );
};

interface RealTimeChartProps {
  coins: Coin[];
  fetchedAt: Date;
  queryKey?: string;
}

const RealTimeChart = ({ coins, fetchedAt, queryKey }: RealTimeChartProps) => {
  if (coins.length === 0) {
    return <div className="py-10 text-center text-gray-500">해당 코인이 없습니다.</div>;
  }
  return (
    <SeeMoreList data={coins} key={queryKey} pageSize={50} isInfiniteScroll>
      {data => (
        <ul>
          <ListHeader fetchAt={fetchedAt} />
          {data.map((coin, index) => (
            <ListRow key={coin.market} coin={coin} rank={index + 1} />
          ))}
        </ul>
      )}
    </SeeMoreList>
  );
};

export default RealTimeChart;
