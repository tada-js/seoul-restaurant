import RestaurantRegister from 'app/(feature)/_components/restaurant/RestaurantRegister';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식당 등록',
  description: '서울식당 식당 등록',
};

const RestaurantRegisterPage = () => {
  return <RestaurantRegister />;
};

export default RestaurantRegisterPage;
