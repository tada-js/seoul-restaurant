const getRestaurants = async () => {
  const res = await fetch('/api/restaurants');
  return res.json();
};

export default getRestaurants;
