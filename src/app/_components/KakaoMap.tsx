/* global kakao */

'use client';

import { useKaKaoMapStore } from 'app/_store/kakaoMap';
import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

const Lat = 37.497625203;
const Lng = 127.03088379;

const KakaoMap = () => {
  const setKaKaoMap = useKaKaoMapStore().setKaKaoMap;

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(Lat, Lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setKaKaoMap(map);
    });
  };

  return (
    <>
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
