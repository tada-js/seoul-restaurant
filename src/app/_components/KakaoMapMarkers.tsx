'use client';

import { useCallback, useEffect } from 'react';
import { useMapStore } from '../_store/map';
import proj4 from 'proj4';
import { RestaurantsType } from '../restaurants/_model';

interface Props {
  restaurants: RestaurantsType[];
}

const KakaoMapMarkers = ({ restaurants }: Props) => {
  const map = useMapStore().map;

  const loadKakaoMarkers = useCallback(() => {
    // Proj4js에 TM 좌표계와 WGS84 좌표계 정의 추가
    proj4.defs(
      'EPSG:2097',
      '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +towgs84=-146.43,507.89,681.46 +units=m +no_defs'
    );

    if (map) {
      restaurants?.map((rest: RestaurantsType) => {
        if (rest.lng && rest.lat) {
          // TM 좌표 예시 -> x, y 좌표(lng x, lat y)
          const tmCoords = [Number(rest.lng), Number(rest.lat)];

          // TM -> WGS84 좌표 변환
          const wgs84Coords = proj4('EPSG:2097', 'EPSG:4326', tmCoords);

          // 마커 표시될 위치
          var markerPosition = new window.kakao.maps.LatLng(
            wgs84Coords[1],
            wgs84Coords[0]
          );

          // 마커 생성
          var marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 지도에 마커 표시
          marker.setMap(map);

          // 커서 오버시 마커 위에 표시할 인포윈도우 생성
          var content = `<div>${rest?.name}</div>`;

          // 커스텀 오버레이 생성
          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            xAnchor: 0.6,
            yAnchor: 0.91,
          });

          // 마커에 마우스오버 이벤트 등록
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
            customOverlay.setMap(map);
          });

          // 마커에 마우스아웃 이벤트를 등록
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거
            customOverlay.setMap(null);
          });
        }
      });
    }
  }, [map]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [map, restaurants]);

  return <div></div>;
};

export default KakaoMapMarkers;
