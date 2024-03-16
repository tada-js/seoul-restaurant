import { create } from 'zustand';

interface KaKaoMapState {
  kakaoMap: any;
  setKaKaoMap(map: any): void;
}

export const useKaKaoMapStore = create<KaKaoMapState>((set) => ({
  kakaoMap: null,
  setKaKaoMap(kakaoMap) {
    set({ kakaoMap });
  },
}));
