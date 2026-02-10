'use client';

import { Coin } from '@/src/entities/coin/model';
import { CoinSortableField } from '@/src/features/coin/model/type';
import { useMemo, useState } from 'react';

export const useSortCoins = (coins: Coin[]) => {
  const [sort, setSort] = useState<CoinSortableField>('signed_change_rate');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('DESC');

  const changeSortState = (field: CoinSortableField) => {
    setSort(field);
  };

  const changeDirection = (newDirection: 'ASC' | 'DESC') => {
    setDirection(newDirection);
  };

  const sortedCoins = useMemo(() => {
    return [...coins].sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue < bValue) {
        return direction === 'ASC' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ASC' ? 1 : -1;
      }

      return 0;
    });
  }, [coins, sort, direction]);

  return {
    sortedCoins,
    sortState: {
      field: sort,
      direction,
    },
    changeSortState,
    changeDirection,
  };
};
