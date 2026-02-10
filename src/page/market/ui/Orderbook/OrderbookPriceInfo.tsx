'use client';

import { useLiveCoinDetail } from '@/src/entities/coin';
import { CoinDetail } from '@/src/entities/coin/model/type';
import { CoinViewModel } from '@/src/entities/coin/ui';
import React from 'react';

interface OrderbookPriceInfoProps {
  coin: CoinDetail;
}

export const OrderbookPriceInfo = ({ coin }: OrderbookPriceInfoProps) => {
  const {
    acc_trade_volume_24h,
    acc_trade_price_24h,
    highest_52_week_price,
    lowest_52_week_price,
    prev_closing_price,
    high_price,
    low_price,
    symbol,
  } = useLiveCoinDetail(coin.market, coin);

  return (
    <div className={'text-[11px]'}>
      <div className="border-b border-gray-300 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">거래량</span>
          <span>{CoinViewModel.formatVolume(acc_trade_volume_24h)}</span>
        </div>
        <div className={'text-right'}>{symbol}</div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">거래대금</span>
          <span>{CoinViewModel.formatTradePrice(acc_trade_price_24h)}</span>
        </div>
      </div>
      <div className="border-b border-gray-300 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">52주 최고</span>
          <span className="text-red-500">{CoinViewModel.formatPrice(highest_52_week_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">52주 최저</span>
          <span className="text-blue-500">{CoinViewModel.formatPrice(lowest_52_week_price)}</span>
        </div>
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">전일종가</span>
          <span>{CoinViewModel.formatPrice(prev_closing_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">당일고가</span>
          <span className="text-red-500">{CoinViewModel.formatPrice(high_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">당일저가</span>
          <span className="text-blue-500">{CoinViewModel.formatPrice(low_price)}</span>
        </div>
      </div>
    </div>
  );
};
