import { Coin } from '@/src/entities/coin/model';
import { useMemo, useState } from 'react';

export const useSearchCoins = (coins: Coin[]) => {
  const [searchQuery, setQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchedCoins = useMemo(() => {
    if (normalizedQuery === '') {
      return coins;
    }

    return coins.filter(
      coin =>
        coin.korean_name.toLowerCase().includes(normalizedQuery) ||
        coin.english_name.toLowerCase().includes(normalizedQuery) ||
        coin.symbol.toLowerCase().includes(normalizedQuery)
    );
  }, [coins, normalizedQuery]);

  return {
    searchedCoins,
    searchQuery,
    setQuery,
  };
};
