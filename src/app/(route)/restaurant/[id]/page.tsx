import Restaurant from 'app/(feature)/_components/Restaurant';

interface Props {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: Props) => {
  return <Restaurant id={id} />;
};

export default RestaurantPage;
