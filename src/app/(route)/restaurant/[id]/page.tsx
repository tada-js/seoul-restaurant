import Restaurant from 'app/(feature)/_components/restaurant/Restaurant';
import { BASEURL } from 'app/(feature)/_constants/config';
import { RestaurantType } from 'app/(feature)/_model/restaurant';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: Props) => {
  return <Restaurant id={id} />;
};

export default RestaurantPage;

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const res: RestaurantType = await fetch(`${BASEURL}/api/restaurants?id=${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    title: `${res.name}`,
    description: `${res.name}`,
  };
};
