import { CoinViewModel } from '@/src/entities/coin';
import React from 'react';

interface LegendData {
  open: number;
  high: number;
  low: number;
  close: number;
  changeRate: number;
}

interface ChartLegendProps {
  legendData: LegendData | null;
}

export const ChartLegend = ({ legendData }: ChartLegendProps) => {
  if (!legendData) {
    return null;
  }

  const changeType = legendData ? CoinViewModel.getChangeType(legendData.close, legendData.open) : 'EVEN';
  const colorClass = CoinViewModel.changeColorClass(changeType);

  return (
    <div className="pointer-events-none absolute top-0 left-3 z-10 flex gap-3 rounded border border-gray-100 bg-white/90 text-xs shadow-sm backdrop-blur-sm">
      <div className="flex gap-1">
        <span className="text-gray-500">시</span>
        <span className={colorClass}>{CoinViewModel.formatPrice(legendData.open)}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-gray-500">고</span>
        <span className={colorClass}>{CoinViewModel.formatPrice(legendData.high)}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-gray-500">저</span>
        <span className={colorClass}>{CoinViewModel.formatPrice(legendData.low)}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-gray-500">종</span>
        <span className={colorClass}>
          {CoinViewModel.formatPrice(legendData.close)}{' '}
          <span className="ml-1">({CoinViewModel.formatChangeRate(legendData.changeRate)})</span>
        </span>
      </div>
    </div>
  );
};
