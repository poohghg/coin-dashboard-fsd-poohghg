'use client';

import { Tabs } from '@/src/shared/uiKit';
import React, { useState } from 'react';

// Swiper CSS 파일 임포트
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css/free-mode';

const tabs: string[] = ['서울', '부산', '대구', '광주', '인천']; // 탭 항목 추가

const TabbedSwiper: React.FC = () => {
  const [contentSwiper, setContentSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const barRef = React.useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    if (contentSwiper) {
      contentSwiper.slideTo(index);
    }
  };

  // 3. 콘텐츠 Swiper 슬라이드 변경 시 핸들러: 현재 인덱스 업데이트
  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="max-w-xl mx-auto border border-gray-200 rounded-lg shadow-md">
      <Tabs
        defaultKey={activeIndex.toString()}
        controlledKey={activeIndex.toString()}
        onChange={key => {
          const index = parseInt(key, 10);
          handleTabClick(index);
        }}
      >
        <Tabs.List className="flex overflow-x-auto border-b bg-white border-gray-300">
          <Tabs.ListBar ref={barRef} />
          {tabs.map((tabName, index) => (
            <Tabs.Trigger
              tabKey={index.toString()}
              key={index}
              className={`py-3 px-5 text-lg transition-all duration-200 ${
                index === activeIndex ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tabName}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Swiper
          onSwiper={setContentSwiper}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onProgress={(swiper, progress) => {
            // Swiper 진행 상황에 따라 탭 인덱스 업데이트
            console.log(progress);
            if (barRef.current) {
              // console.log(barRef.current);
              // contentSwiper.width * -progress
              // barRef.current.style.transform = `translateX(${swiper.width * progress}px)`;
            }
          }}
          className="w-full h-48 bg-gray-50" // 높이 지정
        >
          {tabs.map((tabName, index) => (
            <SwiperSlide key={index}>
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 {tabName} 콘텐츠</h2>
                <p className="text-gray-600">여기는 {tabName}에 대한 정보가 표시되는 영역입니다.</p>
                <p className="mt-1 text-sm text-gray-400">현재 활성 인덱스: {activeIndex}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Tabs>
    </div>
  );
};

export default TabbedSwiper;
