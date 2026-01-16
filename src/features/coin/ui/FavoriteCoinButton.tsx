'use client';

import { useFavoriteCoinStore } from '@/src/features/coin/model/favoriteCoinStore';
import { toasts } from '@/src/shared/uiKit';
import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';

interface FavoriteCoinButtonProps {
  coinId: string;
}

const FavoriteCoinButton = ({ coinId }: FavoriteCoinButtonProps) => {
  const favoriteCoinIds = useFavoriteCoinStore(state => state.favoriteCoinIds);
  const toggleFavorite = useFavoriteCoinStore(state => state.toggleFavorite);

  const isFavorite = (id: string) => {
    return favoriteCoinIds.includes(id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isToggled = toggleFavorite(coinId);
    toasts.success(isToggled ? 'Successfully added!' : 'Successfully deleted!');
  };

  return (
    <button onClick={handleToggleFavorite} className={'cursor-pointer'}>
      <Star className={`w-4/5 h-4/5 ${isFavorite(coinId) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    </button>
  );
};

export default dynamic(() => Promise.resolve(FavoriteCoinButton), {
  ssr: false,
  loading: () => (
    <button>
      <Star className={`w-4/5 h-4/5 text-gray-300`} />
    </button>
  ),
});
