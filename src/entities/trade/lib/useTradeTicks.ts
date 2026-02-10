import { TradeTick } from '@/src/entities/trade';
import { useCallback, useEffect, useState } from 'react';

/**
 * @param initialTicks
 * @param limit
 * @returns 기존 틱들에 새로운 틱을 추가하는 함수와 현재 틱 배열을 반환
 */
export const useTradeTicks = (initialTicks: TradeTick[], liveTradeTicks: TradeTick[], limit: number = 500) => {
  const [ticks, setTicks] = useState<TradeTick[]>(initialTicks);

  const addTick = useCallback(
    (newTick: TradeTick | TradeTick[]) => {
      setTicks(prevTicks => {
        const newTicks = Array.isArray(newTick) ? [...newTick, ...prevTicks] : [newTick, ...prevTicks];

        while (limit < newTicks.length) {
          newTicks.pop();
        }

        return newTicks;
      });
    },
    [limit]
  );

  useEffect(() => {
    if (liveTradeTicks) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      addTick(liveTradeTicks);
    }
  }, [liveTradeTicks, addTick]);

  return ticks;
};
