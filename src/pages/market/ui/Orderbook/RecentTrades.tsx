'use client';

import { CoinViewModel } from '@/src/entities/coin';
import { TradeTick, useTradeTicks } from '@/src/entities/trade';
import { useLiveTradeTick } from '@/src/entities/trade/lib/useLiveTradeTick';
import React, { useEffect } from 'react';

const calculateTradingIntensity = (ticks: TradeTick[]): number => {
  if (ticks.length === 0) return 0;

  const { totalBidVolume, totalAskVolume } = ticks.reduce(
    (acc, tick) => {
      if (tick.side === 'BID') {
        acc.totalBidVolume += tick.volume;
      } else if (tick.side === 'ASK') {
        acc.totalAskVolume += tick.volume;
      }
      return acc;
    },
    { totalBidVolume: 0, totalAskVolume: 0 }
  );

  if (totalAskVolume === 0) return 100.0;

  //체결강도 공식: (매수체결량 / 매도체결량) * 100
  const intensity = (totalBidVolume / totalAskVolume) * 100;

  // 소수점 둘째 자리까지 반올림
  return Math.round(intensity * 100) / 100;
};

interface RecentTradeProps {
  market: string;
  tradeTicks: TradeTick[];
}

const VIEW_LIMIT = 21;
export const RecentTrades = ({ market, tradeTicks }: RecentTradeProps) => {
  const [currentTradeTicks, setCurrentTradeTicks] = useTradeTicks(tradeTicks);
  const { tradeTicks: liveTradeTicks } = useLiveTradeTick(market);
  const strength = calculateTradingIntensity(currentTradeTicks);

  useEffect(() => {
    if (liveTradeTicks) {
      setCurrentTradeTicks(liveTradeTicks);
    }
  }, [liveTradeTicks, setCurrentTradeTicks]);

  return (
    <div className={`text-[11px]`}>
      <div className="flex justify-between border-b border-gray-300 px-1 py-2">
        <span className="text-gray-500">체결강도</span>
        <span className="font-bold">{strength.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between border-b border-gray-300 px-1 py-2 text-gray-500">
        <span>체결가</span>
        <span>체결량</span>
      </div>
      <div className="p-2">
        {currentTradeTicks.slice(0, VIEW_LIMIT).map((tick, index) => (
          <div key={tick.id.toString() + index.toString()} className="flex justify-between">
            <span>{CoinViewModel.formatPrice(tick.price)}</span>
            <span className={tick.side === 'BID' ? 'text-red-500' : 'text-blue-500'}>
              {CoinViewModel.formatVolume(tick.volume)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
