import { TimeFrame } from '@/src/entities/candle';
import React from 'react';

const TimeFrames: Array<{ label: string; value: TimeFrame }> = [
  { label: '1분', value: 'minutes/1' },
  { label: '15분', value: 'minutes/15' },
  { label: '1시간', value: 'minutes/60' },
  { label: '4시간', value: 'minutes/240' },
  { label: '일', value: 'days' },
  { label: '주', value: 'weeks' },
  { label: '월', value: 'months' },
];

interface TimeFramesProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
}

export const ChartTimeFrames = ({ timeFrame, setTimeFrame }: TimeFramesProps) => {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100">
      {TimeFrames.map(tf => (
        <button
          key={tf.value}
          onClick={() => setTimeFrame(tf.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            timeFrame === tf.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
};
