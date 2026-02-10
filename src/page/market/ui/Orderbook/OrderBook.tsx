'use client';

import { ScrollIntoView } from '@/src/shared/uiKit';
import React, { useCallback } from 'react';

interface OrderBookProps {
  AskOrderBooks: React.ReactNode;
  BidOrderBooks: React.ReactNode;
  PriceInfo: React.ReactNode;
  RecentTrades: React.ReactNode;
}

export const SIDE_WIDTH = '32vw';

export const OrderBook = ({ AskOrderBooks, BidOrderBooks, PriceInfo, RecentTrades }: OrderBookProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollCallback = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div ref={containerRef} className="opacity-0">
      <div className="flex w-full">
        {/* 매도 리스트 */}
        {AskOrderBooks}
        {/* 우측 정보 패널 */}
        <div className={`relative w-[${SIDE_WIDTH}]`}>
          <div className={'absolute bottom-0 left-0 w-full'}>{PriceInfo}</div>
        </div>
      </div>
      <ScrollIntoView className={'flex-shink-0 h-[1px] bg-gray-300'} scrollCallback={scrollCallback} />
      <div className="flex w-full">
        {/* 체결창 */}
        <div className={`w-[${SIDE_WIDTH}]`}>{RecentTrades}</div>
        {/* 매수 리스트 */}
        {BidOrderBooks}
      </div>
    </div>
  );
};
