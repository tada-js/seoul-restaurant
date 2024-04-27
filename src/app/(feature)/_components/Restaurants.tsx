'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useIntersectionObserver from 'app/(feature)/_hooks/useIntersectionObserver';
import { fetchRestaurants } from 'app/(feature)/_lib/restaurants';
import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import ErrorMessage from 'app/(feature)/_components/ui/ErrorMessage';
import PingLoading from 'app/(feature)/_components/ui/PingLoading';
import { RestaurantType } from 'app/(feature)/_model/restaurant';
import PulseLoading from 'app/(feature)/_components/ui/PulseLoading';
import SearchFilter from 'app/(feature)/_components/SearchFilter';
import useDebounce from 'app/(feature)/_hooks/useDebounce';
import RestaurantList from 'app/(feature)/_components/restaurant/RestaurantList';

interface LastPageParams {
  page: number;
  data: RestaurantType[];
  totalCount: number;
  totalPage: number;
}

const Restaurants = () => {
  const validCategories = CATEGORIES;
  const ref = useRef<HTMLDivElement | null>(null);
  const intersectionObserver = useIntersectionObserver(ref, {});
  const [search, setSearch] = useState({
    q: '',
    district: '',
  });
  const debouncedSearchQ = useDebounce(search?.q);
  const searchParams = {
    q: debouncedSearchQ,
    district: search?.district,
  };
  const isIntersecting = !!intersectionObserver?.isIntersecting;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearch((s) => ({ ...s, [name]: value }));
  };

  const {
    data: restaurants,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['restaurants', searchParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchRestaurants({ pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: LastPageParams) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isIntersecting && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isIntersecting, hasNextPage]);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  if (isError) {
    return (
      <ErrorMessage
        message={'일시적인 문제가 발생하였습니다. 다시 시도해 주세요.'}
      />
    );
  }
  return (
    <div className="pt-20 w-full px-4 py-8 mx-auto h-dvh">
      <h2 className="text-lg font-semibold">식당 목록</h2>
      <p className="text-sm text-gray-500 py-2">등록된 식당 목록입니다.</p>
      <SearchFilter onChange={onChange} placeholder="식당 이름" />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <PulseLoading />
        ) : (
          restaurants?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data &&
                page.data.map((rest: RestaurantType) => {
                  let category = rest.category;
                  if (category && !validCategories.includes(category)) {
                    category = '기타';
                  }
                  return (
                    <RestaurantList
                      key={rest.id}
                      rest={rest}
                      category={category}
                    />
                  );
                })}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <PingLoading />}
      <div className="w-full h-10 mb-10 touch-none" ref={ref} />
      {!isLoading && !isError && restaurants?.pages[0].data.length === 0 && (
        <div className="flex justify-center">🥲 검색된 식당이 없습니다.</div>
      )}
    </div>
  );
};

export default Restaurants;
