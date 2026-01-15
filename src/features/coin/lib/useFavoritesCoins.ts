import { Coin } from '@/src/entities/coin/model';
import { useFavoriteCoinStore } from '@/src/features/coin/model/favoriteCoinStore';
import { useMemo } from 'react';

export const useFavoritesCoins = (coins: Coin[]) => {
  const favoriteCoinIds = useFavoriteCoinStore(state => state.favoriteCoinIds);
  const favoriteCoinIdsSet = useMemo(() => new Set(favoriteCoinIds), [favoriteCoinIds]);
  const favoriteCoins = useMemo(
    () => coins.filter(coin => favoriteCoinIdsSet.has(coin.name)),
    [coins, favoriteCoinIdsSet]
  );

  return favoriteCoins;
};
