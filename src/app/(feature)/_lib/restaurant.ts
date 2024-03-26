import { RestaurantType } from '../_model/restaurant';

export const fetchRestaurant = async (id: string) => {
  const res = await fetch(`/api/restaurants?id=${id}`);
  return res.json() as Promise<RestaurantType>;
};
