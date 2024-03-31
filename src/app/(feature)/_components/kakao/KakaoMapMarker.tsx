import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import useImageSrc from 'app/(feature)/_hooks/useImageSrc';
import { RestaurantType } from 'app/(feature)/_model/restaurant';
import { useKakaoMapStore } from 'app/(feature)/_store/kakaoMap';
import proj4 from 'proj4';
import { useCallback, useEffect } from 'react';

interface Props {
  restautant: RestaurantType;
}

const KakaoMapMarker = ({ restautant }: Props) => {
  const kakaoMap = useKakaoMapStore((state) => state.kakaoMap);
  const imageSrc = useImageSrc(restautant.category);

  const loadKakoMarker = useCallback(() => {
    if (kakaoMap && restautant) {
      // Proj4js에 TM 좌표계와 WGS84 좌표계 정의 추가
      proj4.defs(
        'EPSG:2097',
        '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +towgs84=-146.43,507.89,681.46 +units=m +no_defs'
      );

      const imageSize = new window.kakao.maps.Size(35, 35); // 마커이미지 크기
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션(이미지 좌표 설정)

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      // TM 좌표 예시 -> x, y 좌표(lng x, lat y)
      const tmCoords = [Number(restautant.lng), Number(restautant.lat)];

      // TM -> WGS84 좌표 변환
      const wgs84Coords = proj4('EPSG:2097', 'EPSG:4326', tmCoords);

      // 마커 표시될 위치
      const markerPosition = new window.kakao.maps.LatLng(
        wgs84Coords[1],
        wgs84Coords[0]
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 지도에 마커 표시
      marker.setMap(kakaoMap);

      // 커서 오버시 마커 위에 표시할 인포윈도우 생성
      const content = `<div class="bg-[#2CBFB1] text-white flex items-center justify-center  h-8 rounded-md px-3 leading-6">${restautant?.name}</div>`;

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.8,
      });
      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
        customOverlay.setMap(kakaoMap);
      });

      // 마커에 마우스오버 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
        customOverlay.setMap(kakaoMap);
      });

      // 마커에 마우스아웃 이벤트를 등록
      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거
        customOverlay.setMap(null);
      });
    }
  }, [kakaoMap, restautant]);

  useEffect(() => {
    loadKakoMarker();
  }, [loadKakoMarker]);
  return <></>;
};

export default KakaoMapMarker;
