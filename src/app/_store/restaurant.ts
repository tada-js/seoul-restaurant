import { RestaurantType } from 'app/restaurants/_model';
import { create } from 'zustand';

interface RestaurantState {
  currentRestaurant: RestaurantType | null;
  setCurrentRestaurantStore(currentRestaurant: RestaurantType | null): void;
}

export const useCurrentRestaurantStore = create<RestaurantState>((set) => ({
  currentRestaurant: null,
  setCurrentRestaurantStore(currentRestaurant) {
    set({ currentRestaurant });
  },
}));
