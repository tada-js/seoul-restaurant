import { create } from 'zustand';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_ZOOM,
} from '../_constants/restaurant';

interface KakaoMapState {
  kakaoMap: any;
  setKakaoMap(map: any): void;
}

interface Location {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

interface LocationState {
  location: Location;

  setLocation: (
    lat: LocationState['location']['lat'],
    lng: LocationState['location']['lng'],
    zoom: LocationState['location']['zoom']
  ) => void;
}

export const useKakaoMapStore = create<KakaoMapState>((set) => ({
  kakaoMap: null,
  setKakaoMap(kakaoMap) {
    set({ kakaoMap });
  },
}));

export const useLocationStore = create<LocationState>((set) => ({
  location: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
  setLocation(lat?: string | null, lng?: string | null, zoom?: number) {
    set((state) => ({
      location: {
        lat: lat ?? state.location.lat,
        lng: lng ?? state.location.lng,
        zoom: zoom ?? state.location.zoom,
      },
    }));
  },
}));
