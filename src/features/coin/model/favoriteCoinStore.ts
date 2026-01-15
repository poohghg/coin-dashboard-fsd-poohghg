import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FavoriteStoreState {
  favoriteCoinIds: string[];
  addFavorite: (coinId: string) => void;
  removeFavorite: (coinId: string) => void;
  toggleFavorite: (coinId: string) => boolean;
  isFavorite: (coinId: string) => boolean;
}

const FAVORITE_STORAGE_KEY = 'favorite-coin-ids';

export const useFavoriteCoinStore = create<FavoriteStoreState>()(
  persist(
    (set, get) => ({
      favoriteCoinIds: [],
      addFavorite: coinId => {
        set(state => ({
          favoriteCoinIds: state.favoriteCoinIds.includes(coinId)
            ? state.favoriteCoinIds
            : [...state.favoriteCoinIds, coinId],
        }));
      },
      removeFavorite: coinId => {
        set(state => ({
          favoriteCoinIds: state.favoriteCoinIds.filter(id => id !== coinId),
        }));
      },
      toggleFavorite: coinId => {
        const { favoriteCoinIds, addFavorite, removeFavorite } = get();
        const isCurrentlyFavorite = favoriteCoinIds.includes(coinId);

        if (isCurrentlyFavorite) {
          removeFavorite(coinId);
          return false;
        } else {
          addFavorite(coinId);
          return true;
        }
      },
      isFavorite: coinId => {
        return get().favoriteCoinIds.includes(coinId);
      },
    }),
    {
      name: FAVORITE_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // skipHydration: true,
    }
  )
);
