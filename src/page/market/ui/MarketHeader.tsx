'use client';

import { CoinViewModel, useLiveCoin } from '@/src/entities/coin';
import { CoinDetail } from '@/src/entities/coin/model/type';
import { FavoriteCoinButton } from '@/src/features/coin/ui';
import React from 'react';

interface DetailHeaderProps {
  coin: CoinDetail;
}

export const MarketHeader = ({ coin }: DetailHeaderProps) => {
  const { korean_name, symbol, trade_price, signed_change_price, signed_change_rate, change_type } = useLiveCoin(
    coin.market,
    coin
  );
  const changeColor = CoinViewModel.changeColorClass(change_type);
  return (
    <section className="top-main-header sticky z-50 flex h-[64px] items-center justify-between bg-white px-3 py-1.5 shadow-sm">
      <div className="flex flex-grow flex-col">
        <div className="flex items-baseline gap-0.5">
          <h1 className="text-20 font-semibold text-gray-900">{korean_name}</h1>
          <span className="text-15 rounded-full font-semibold text-gray-500">{symbol.toUpperCase()}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <div className="text-2xl font-bold text-gray-900">{trade_price.toLocaleString()}원</div>
          <div className={`text-15`}>
            <span className={`text-gray-500`}>어제보다 </span>
            <span className={`font-bold ${changeColor}`}>{CoinViewModel.formatSignedPrice(signed_change_price)}</span>
            <span className={`font-bold ${changeColor}`}>({CoinViewModel.formatChangeRate(signed_change_rate)})</span>
          </div>
        </div>
      </div>
      <FavoriteCoinButton coinId={coin.symbol} starClassName="h-6 w-6" />
    </section>
  );
};
