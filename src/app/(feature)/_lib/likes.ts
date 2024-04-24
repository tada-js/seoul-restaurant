import qs from 'qs';

interface FecthLikesParams {
  pageParam?: number;
  limit?: number;
  searchParams: { q?: string | null; district?: string };
}

export const fetchLikes = async ({
  pageParam = 1,
  limit = 20,
  searchParams,
}: FecthLikesParams) => {
  const fullParams = { page: pageParam, limit, ...searchParams };
  const queryParams = qs.stringify(fullParams, { skipNulls: true });
  const res = await fetch(`/api/likes?${queryParams}`);
  return res.json();
};
