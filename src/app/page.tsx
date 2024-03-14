import KakaoMap from './_components/KakaoMap';
import KakaoMapMarkers from './_components/KakaoMapMarkers';

export default async function Home() {
  const restaurants = await getData();
  return (
    <main>
      <KakaoMap />
      <KakaoMapMarkers restaurants={restaurants} />
    </main>
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
