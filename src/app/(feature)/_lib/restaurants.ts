import qs from 'qs';

interface FetchRestaurantsParams {
  pageParam?: number;
  limit?: number;
  searchParams: { q?: string | null; district?: string };
}

export const fetchRestaurants = async ({
  pageParam = 1,
  limit = 20,
  searchParams,
}: FetchRestaurantsParams) => {
  const fullParams = { page: pageParam, limit, ...searchParams };
  const queryParams = qs.stringify(fullParams, { skipNulls: true });

  const res = await fetch(`/api/restaurants?${queryParams}`);
  return res.json();
};
