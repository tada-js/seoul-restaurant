import RestaurantEdit from 'app/(feature)/_components/restaurant/RestaurantEdit';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: '식당 수정',
  description: '서울식당 식당 수정',
};

const RestaurantEditPage = ({ params: { id } }: Props) => {
  return <RestaurantEdit id={id} />;
};

export default RestaurantEditPage;
