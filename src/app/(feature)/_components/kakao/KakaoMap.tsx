/* global kakao */

'use client';

import {
  useKakaoMapStore,
  useLocationStore,
} from 'app/(feature)/_store/kakaoMap';
import Script from 'next/script';
import proj4 from 'proj4';
import { useState } from 'react';
import PingLoading from '../ui/PingLoading';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
  wgs?: boolean;
}

const KakaoMap = ({ lat, lng, zoom, wgs }: Props) => {
  const setKakaoMap = useKakaoMapStore((state) => state.setKakaoMap);
  const location = useLocationStore((state) => state.location);
  let [wgsLat, wgsLng]: null[] | number[] = [null, null];
  const [isMapLoading, setIsMapLoading] = useState(true);
  if (lat && lng && !wgs) {
    proj4.defs(
      'EPSG:2097',
      '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +towgs84=-146.43,507.89,681.46 +units=m +no_defs'
    );
    const tmCoords = [Number(lng), Number(lat)];
    [wgsLng, wgsLat] = proj4('EPSG:2097', 'EPSG:4326', tmCoords);
  }

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          wgs ? lat : wgsLat ?? location.lat,
          wgs ? lng : wgsLng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setKakaoMap(map);
      setIsMapLoading(false);
    });
  };

  return (
    <>
      {isMapLoading && <PingLoading mapLoading={true} />}
      <div id="map" className="w-full h-screen"></div>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        type="text/javascript"
        strategy="afterInteractive"
        onReady={loadKakaoMap}
      />
    </>
  );
};

export default KakaoMap;
