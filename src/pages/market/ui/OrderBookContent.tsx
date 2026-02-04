'use client';

import { CoinDetail, CoinViewModel } from '@/src/entities/coin';
import { Orderbook } from '@/src/entities/orderbook';
import React from 'react';

interface OrderListProps {
  coin: CoinDetail;
  orderBook: Orderbook;
}

const renderRowHeight = 'h-[44px]'; // 행

export const OrderBookContent = ({ coin, orderBook }: OrderListProps) => {
  return (
    <div className="animate-fade-in text-sm">
      {/* 3열 레이아웃: 좌측(체결/잔량) | 중앙(가격) | 우측(정보/잔량) */}
      <div className="flex">
        {/* [좌측 열] */}
        {/*<div className="flex flex-1 flex-col border-r border-gray-50">*/}
        {/*  /!* 상단: 매도 잔량 (Ask Size) *!/*/}
        {/*  <div className="flex flex-col justify-end">*/}
        {/*    /!*{dummyOrderbook.orderbook_units*!/*/}
        {/*    /!*  .filter(u => u.ask_price > 0)*!/*/}
        {/*    /!*  .map((unit, i) => (*!/*/}
        {/*    /!*    <div key={`ask-vol-${i}`} className={`${renderRowHeight} relative flex items-center justify-end px-2`}>*!/*/}
        {/*    /!*      /!* 파란색 바 (오른쪽 정렬 효과를 위해 div 배치) *!/*!/*/}
        {/*    /!*      <div*!/*/}
        {/*    /!*        className="absolute top-1 right-0 bottom-1 bg-blue-100/50"*!/*/}
        {/*    /!*        style={{ width: `${(unit.ask_size / maxOrderVol) * 100}%` }}*!/*/}
        {/*    /!*      />*!/*/}
        {/*    /!*      <span className="z-10 font-medium text-gray-600">{unit.ask_size.toFixed(3)}</span>*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*  ))}*!/*/}
        {/*  </div>*/}

        {/*  /!* 하단: 체결 내역 (Trades) *!/*/}
        {/*  <div className="border-t border-gray-100">*/}
        {/*    <div className="flex h-[40px] items-center justify-between bg-gray-50/50 px-2">*/}
        {/*      <span className="text-xs text-gray-400">체결강도</span>*/}
        {/*      <span className="text-xs font-bold text-red-500">166.96%</span>*/}
        {/*    </div>*/}
        {/*    <div className="flex flex-col">*/}
        {/*      /!*{dummyTrades.map((trade, i) => (*!/*/}
        {/*      /!*  <div key={i} className="flex h-[30px] items-center justify-between px-2 text-xs">*!/*/}
        {/*      /!*    <span className={trade.type === 'bid' ? 'text-gray-800' : 'text-gray-800'}>*!/*/}
        {/*      /!*      {trade.price.toLocaleString()}*!/*/}
        {/*      /!*    </span>*!/*/}
        {/*      /!*    <span className={trade.type === 'bid' ? 'text-red-500' : 'text-blue-500'}>*!/*/}
        {/*      /!*      {trade.volume.toFixed(3)}*!/*/}
        {/*      /!*    </span>*!/*/}
        {/*      /!*  </div>*!/*/}
        {/*      /!*))}*!/*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/* [중앙 열] 가격 (Prices) */}
        <div className="flex w-[120px] flex-col border-r border-gray-50">
          {/* 매도 호가 (파란색) */}
          {orderBook.units.map((unit, i) => (
            <div
              key={`ask-price-${i}`}
              className={`${renderRowHeight} flex cursor-pointer flex-col items-center justify-center border-b border-white bg-blue-50/30 hover:bg-gray-50`}
              // onClick={() => setPrice(unit.ask_price)}
            >
              <span className="text-[15px] font-bold text-blue-600">{CoinViewModel.formatPrice(unit.askPrice)}</span>
              <span className="text-[10px] text-blue-400">
                {CoinViewModel.formatChangeRate(coin.signed_change_rate)}
              </span>
            </div>
          ))}

          {/* 매수 호가 (빨간색) */}
          {/*{orderBook.units.map((unit, i) => (*/}
          {/*  <div*/}
          {/*    key={`bid-price-${i}`}*/}
          {/*    className={`${renderRowHeight} relative flex cursor-pointer flex-col items-center justify-center border-b border-white bg-red-50/30 hover:bg-gray-50`}*/}
          {/*    // onClick={() => setPrice(unit.bid_price)}*/}
          {/*  >*/}
          {/*    /!* 현재가 테두리 표시 (첫번째 매수호가에 ��시) *!/*/}
          {/*    {i === 0 && <div className="pointer-events-none absolute inset-0 border-2 border-black" />}*/}
          {/*    <span className="text-[15px] font-bold text-red-600">{unit.bidPrice.toLocaleString()}</span>*/}
          {/*    <span className="text-[10px] text-red-400">-1.03%</span>*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>

        {/* [우측 열] */}
        <div className="flex flex-1 flex-col">
          {/* 상단: 종목 정보 (요청하신 부분) */}
          {/*  <div className="flex h-[220px] flex-col gap-3 p-3 text-xs">*/}
          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">52주 최고</span>*/}
          {/*      <span className="font-medium text-gray-700">{dummyTicker.high_price.toLocaleString()}</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">52주 최저</span>*/}
          {/*      <span className="font-medium text-gray-700">*/}
          {/*        /!*{dummyTicker.lowest_52_week_price?.toLocaleString() || '48,333'}*!/*/}
          {/*      </span>*/}
          {/*    </div>*/}
          {/*    <div className="my-1 h-px bg-gray-100" />*/}

          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">시작</span>*/}
          {/*      <span className="font-medium text-gray-700">{dummyTicker.opening_price.toLocaleString()}</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">최고</span>*/}
          {/*      <span className="font-medium text-red-500">{dummyTicker.high_price.toLocaleString()}</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">최저</span>*/}
          {/*      <span className="font-medium text-blue-500">{dummyTicker.low_price.toLocaleString()}</span>*/}
          {/*    </div>*/}

          {/*    <div className="my-1 h-px bg-gray-100" />*/}

          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">거래량</span>*/}
          {/*      <span className="font-medium text-gray-700">{dummyTicker.acc_trade_volume_24h.toLocaleString()}</span>*/}
          {/*    </div>*/}
          {/*    <div className="flex justify-between">*/}
          {/*      <span className="text-gray-400">어제보다</span>*/}
          {/*      <span className="font-medium text-red-500">2.17%</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  /!* 하단: 매수 잔량 (Bid Size) *!/*/}
          {/*  <div className="flex flex-col border-t border-gray-100">*/}
          {/*    {dummyOrderbook.orderbook_units*/}
          {/*      .filter(u => u.bid_price > 0)*/}
          {/*      .map((unit, i) => (*/}
          {/*        <div key={`bid-vol-${i}`} className={`${renderRowHeight} relative flex items-center px-2`}>*/}
          {/*          /!* 빨간색 바 (왼쪽 정렬) *!/*/}
          {/*          <div*/}
          {/*            className="absolute top-1 bottom-1 left-0 bg-red-100/50"*/}
          {/*            style={{ width: `${(unit.bid_size / maxOrderVol) * 100}%` }}*/}
          {/*          />*/}
          {/*          <span className="z-10 text-left font-medium text-gray-600">{unit.bid_size.toFixed(3)}</span>*/}
          {/*        </div>*/}
          {/*      ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
