export const fetchRestaurants = async ({ pageParam = 1, limit = 20 }) => {
  const queryParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`/api/restaurants?${queryParams}`);
  return res.json();
};
