import { create } from 'zustand';

interface mapState {
  kakaoMap: any;
  setKaKaoMap(map: any): void;
}

export const useKaKaoMapStore = create<mapState>((set) => ({
  kakaoMap: null,
  setKaKaoMap(kakaoMap) {
    set({ kakaoMap });
  },
}));
