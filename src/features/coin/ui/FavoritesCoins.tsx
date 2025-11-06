import { Coin } from '@/src/entities/coin/model';
import { useFavoritesCoins } from '@/src/features/coin';
import React from 'react';

interface FavoritesCoinProps {
  coins: Coin[];
  children: (coins: Coin[]) => React.ReactNode;
}

const FavoritesCoins = ({ coins, children }: FavoritesCoinProps) => {
  const favoriteCoins = useFavoritesCoins(coins);
  return <>{children(favoriteCoins)}</>;
};

export default FavoritesCoins;
