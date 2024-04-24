import { create } from 'zustand';
import { RestaurantType } from '../_model/restaurant';

interface RestaurantState {
  currentRestaurant: RestaurantType | null;
  setCurrentRestaurant(currentRestaurant: RestaurantType | null): void;
}

interface CategoryImageSrcState {
  imageSrc: string;
  setImageSrc(imageSrc: string): void;
}

export const useCurrentRestaurantStore = create<RestaurantState>((set) => ({
  currentRestaurant: null,
  setCurrentRestaurant(currentRestaurant) {
    set({ currentRestaurant });
  },
}));

export const useImageSrcStore = create<CategoryImageSrcState>((set) => ({
  imageSrc: '',
  setImageSrc(imageSrc) {
    set({ imageSrc });
  },
}));
