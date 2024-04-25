import RestaurantEdit from 'app/(feature)/_components/RestaurantEdit';

interface Props {
  params: {
    id: string;
  };
}

const RestaurantEditPage = ({ params: { id } }: Props) => {
  return <RestaurantEdit id={id} />;
};

export default RestaurantEditPage;
