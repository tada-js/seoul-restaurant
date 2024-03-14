import { create } from 'zustand';

interface mapState {
  map: any;
  setMap(map: any): void;
}

export const useMapStore = create<mapState>((set) => ({
  map: null,
  setMap(map) {
    set({ map });
  },
}));
