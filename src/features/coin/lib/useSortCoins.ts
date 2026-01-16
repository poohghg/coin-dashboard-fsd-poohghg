'use client';

import { Coin } from '@/src/entities/coin/model';
import { CoinSortableField, CoinSortState } from '@/src/features/coin/model/type';
import { useMemo, useState } from 'react';

export const useSortCoins = (coins: Coin[]) => {
  const [sortState, setSortState] = useState<CoinSortState>({ field: 'signed_change_rate', direction: 'DESC' });

  const changeSortState = (field: CoinSortableField) => {
    setSortState(prevState => {
      if (prevState.field === field) {
        const newDirection = prevState.direction === 'ASC' ? 'DESC' : 'ASC';
        return { field, direction: newDirection };
      } else {
        return { field, direction: 'DESC' };
      }
    });
  };

  const sortedCoins = useMemo(() => {
    return [...coins].sort((a, b) => {
      const aValue = a[sortState.field];
      const bValue = b[sortState.field];

      if (aValue < bValue) return sortState.direction === 'ASC' ? -1 : 1;
      if (aValue > bValue) return sortState.direction === 'ASC' ? 1 : -1;
      return 0;
    });
  }, [sortState, coins]);

  return {
    sortedCoins,
    sortState,
    changeSortState,
    direction: sortState.direction,
  };
};
