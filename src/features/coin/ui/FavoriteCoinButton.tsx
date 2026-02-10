'use client';

import { useFavoriteCoinStore } from '@/src/features/coin/model/favoriteCoinStore';
import { toasts } from '@/src/shared/uiKit';
import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';

interface FavoriteCoinButtonProps {
  coinId: string;
  starClassName?: string;
}

const FavoriteCoinButton = ({ coinId, starClassName }: FavoriteCoinButtonProps) => {
  const favoriteCoinIds = useFavoriteCoinStore(state => state.favoriteCoinIds);
  const toggleFavorite = useFavoriteCoinStore(state => state.toggleFavorite);

  const isFavorite = (id: string) => {
    return favoriteCoinIds.includes(id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const isToggled = toggleFavorite(coinId);
    const message = isToggled ? `${coinId}를 즐겨찾기에 추가했습니다!` : `${coinId}를 즐겨찾기에서 제거했습니다!`;
    toasts.success(message);
  };

  return (
    <button onClick={handleToggleFavorite} className={'cursor-pointer'}>
      <Star
        className={`h-4/5 w-4/5 ${isFavorite(coinId) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${starClassName ?? ''}`}
      />
    </button>
  );
};

export default dynamic(() => Promise.resolve(FavoriteCoinButton), {
  ssr: false,
  loading: () => (
    <button>
      <Star className={`h-4/5 w-4/5 text-gray-300`} />
    </button>
  ),
});
