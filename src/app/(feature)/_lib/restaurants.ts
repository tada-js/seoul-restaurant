interface FetchRestaurantsParams {
  pageParam?: number;
  limit?: number;
  searchParams: { q?: string | null; district?: string };
}

const objectToParams = (object: Object): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, value.toString());
  });

  return searchParams;
};

export const fetchRestaurants = async ({
  pageParam = 1,
  limit = 20,
  searchParams,
}: FetchRestaurantsParams) => {
  const fullParams = { page: pageParam, limit, ...searchParams };

  // objectToParams 함수를 사용하여 value !== undefined인 URLSearchParams 객체 생성
  const queryParams = objectToParams(fullParams);

  const res = await fetch(`/api/restaurants?${queryParams}`);
  return res.json();
};
