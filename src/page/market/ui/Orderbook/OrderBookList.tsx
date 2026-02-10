'use client';

import { CoinChangeType } from '@/src/entities/coin/model/type';
import { CoinViewModel } from '@/src/entities/coin/ui';
import { Orderbook, useLiveOrderbook } from '@/src/entities/orderbook';
import { TradeSide, useLiveTradeTick } from '@/src/entities/trade';
import { Button, cn, If } from '@/src/shared/uiKit';
import React from 'react';

const OrderQuantity = ({
  barWidth,
  size,
  sideColor,
  type,
}: {
  type: TradeSide;
  barWidth: number;
  size: number;
  sideColor: string;
}) => {
  return (
    <div
      className={`relative flex h-full w-[32vw] items-center py-3 ${type === 'ASK' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={cn('h-full rounded-[4px] opacity-50', sideColor)} style={{ width: `${barWidth}%` }} />
      <span className="absolute z-10 text-[11px] text-gray-800">{CoinViewModel.formatVolume(size)}</span>
    </div>
  );
};

const OrderPrice = ({
  price,
  rate,
  changeType,
  isLastTradePrice,
}: {
  price: number;
  rate: number;
  changeType: CoinChangeType;
  isLastTradePrice: boolean;
}) => {
  const color = CoinViewModel.changeColorClass(changeType);
  return (
    <Button
      className={cn(
        'z-10 flex h-full flex-1 flex-col items-center justify-center gap-0 rounded-none border-x border-gray-300',
        isLastTradePrice
          ? `relative bg-white before:absolute before:inset-0 before:rounded-[8px] before:border before:border-gray-400 before:shadow-[0_2px_6px_rgba(0,0,0,0.1)]`
          : ''
      )}
    >
      {/* 가격 */}
      <div className={cn('text-xs font-bold')}>
        <span className={color}>{CoinViewModel.formatPrice(price)}</span>
      </div>
      {/* 변동률 */}
      <div className="text-xs">
        <span className={color}>{CoinViewModel.formatChangeRate(rate)}</span>
      </div>
    </Button>
  );
};

const OrderBookRow = ({
  type,
  unit,
  closePrice,
  maxVol,
  lastTradePrice,
}: {
  type: TradeSide;
  unit: { price: number; size: number };
  closePrice: number;
  maxVol: number;
  lastTradePrice: number;
}) => {
  const sideColor = type === 'ASK' ? 'bg-blue-500' : 'bg-red-500';
  const barWidth = Math.min((unit.size / maxVol) * 100, 100);
  const changeRate = CoinViewModel.getChangeRate(unit.price, closePrice);
  const changeType = CoinViewModel.getChangeType(unit.price, closePrice);
  return (
    <li
      className={`flex h-[45px] items-center justify-between ${type === `ASK` ? `hover:bg-blue-100` : `hover:bg-red-100`} hover:bg-opacity-10`}
    >
      <If condition={type === 'ASK'}>
        <OrderQuantity type={type} barWidth={barWidth} size={unit.size} sideColor={sideColor} />
      </If>
      <OrderPrice
        price={unit.price}
        rate={changeRate}
        changeType={changeType}
        isLastTradePrice={unit.price === lastTradePrice}
      />
      <If condition={type === 'BID'}>
        <OrderQuantity type={type} barWidth={barWidth} size={unit.size} sideColor={sideColor} />
      </If>
    </li>
  );
};

interface OrderBookListProps {
  type: TradeSide;
  orderBook: Orderbook;
  prevClose: number;
  lastLiveTradePrice: number;
}

export const OrderBookList = ({ type, orderBook, prevClose, lastLiveTradePrice }: OrderBookListProps) => {
  const liveOrderbook = useLiveOrderbook(orderBook.market, orderBook);
  const { tradeTick } = useLiveTradeTick(orderBook.market);
  const maxVol = Math.max(...liveOrderbook.units.map(u => (type === 'ASK' ? u.askSize : u.bidSize)));
  const units = type === 'ASK' ? [...liveOrderbook.units].reverse() : liveOrderbook.units;
  const lastTradePrice = tradeTick ? tradeTick.price : lastLiveTradePrice;

  return (
    <ul className="flex flex-1 flex-col justify-end">
      {units.map((u, idx) => {
        return (
          <OrderBookRow
            key={type + '-' + idx + '-' + (type === 'ASK' ? u.askPrice : u.bidPrice)}
            type={type}
            unit={type === 'ASK' ? { price: u.askPrice, size: u.askSize } : { price: u.bidPrice, size: u.bidSize }}
            closePrice={prevClose}
            maxVol={maxVol}
            lastTradePrice={lastTradePrice}
          />
        );
      })}
    </ul>
  );
};
