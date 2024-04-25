import Restaurants from 'app/(feature)/_components/Restaurants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식당 목록',
  description: '서울식당 식당 목록',
};

const RestaurantsPage = () => {
  return <Restaurants />;
};

export default RestaurantsPage;
