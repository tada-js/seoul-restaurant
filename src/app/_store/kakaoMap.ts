import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_ZOOM,
} from 'app/_constants/restaurant';
import { create } from 'zustand';

interface KaKaoMapState {
  kakaoMap: any;
  setKaKaoMap(map: any): void;
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

export const useKaKaoMapStore = create<KaKaoMapState>((set) => ({
  kakaoMap: null,
  setKaKaoMap(kakaoMap) {
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
