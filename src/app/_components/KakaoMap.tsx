/* global kakao */

'use client';

import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const Lat = 33.450701;
  const Lng = 126.570667;

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(Lat, Lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
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
