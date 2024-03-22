import { RestaurantType } from 'app/(route)/restaurants/_model';

export const fetchRestaurant = async (id: string) => {
  const res = await fetch(`/api/restaurants?id=${id}`);
  return res.json() as Promise<RestaurantType>;
};
