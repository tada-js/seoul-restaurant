import KaKaoMapSimpleModal from 'app/(feature)/_components/kakao/KaKaoMapSimpleModal';
import KakaoMap from 'app/(feature)/_components/kakao/KakaoMap';
import KakaoMapMarkers from 'app/(feature)/_components/kakao/KakaoMapMarkers';

export default async function Home() {
  const restaurants = await getData();
  return (
    <>
      <KakaoMap />
      <KakaoMapMarkers restaurants={restaurants} />
      <KaKaoMapSimpleModal />
    </>
  );
}

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
      {
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      throw new Error('Failed fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
