'use client';

import { useQuery } from '@tanstack/react-query';
import getRestaurants from '../_lib/getRestaurants';

const RestaurantsPage = () => {
  const { data: restaurant } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  console.log(restaurant);

  return <div>식당 목록 페이지</div>;
};

export default RestaurantsPage;
