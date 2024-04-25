'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import RestaurantList from 'app/(feature)/_components/restaurant/RestaurantList';
import SearchFilter from 'app/(feature)/_components/SearchFilter';
import ErrorMessage from 'app/(feature)/_components/ui/ErrorMessage';
import PingLoading from 'app/(feature)/_components/ui/PingLoading';
import PulseLoading from 'app/(feature)/_components/ui/PulseLoading';
import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import useDebounce from 'app/(feature)/_hooks/useDebounce';
import useIntersectionObserver from 'app/(feature)/_hooks/useIntersectionObserver';
import { fetchLikes } from 'app/(feature)/_lib/likes';
import { LikeType } from 'app/(feature)/_model/likes';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const UserLikes = () => {
  const validCategories = CATEGORIES;
  const [search, setSearch] = useState({
    q: '',
    district: '',
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const intersectionObserver = useIntersectionObserver(ref, {});
  const isIntersecting = !!intersectionObserver?.isIntersecting;
  const debouncedSearchQ = useDebounce(search?.q);
  const searchParams = {
    q: debouncedSearchQ,
    district: search?.district,
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearch((s) => ({ ...s, [name]: value }));
  };

  const {
    data: likes,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['likes', searchParams],
    queryFn: ({ pageParam = 1 }) => fetchLikes({ pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) =>
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

  if (isError) {
    return (
      <ErrorMessage
        message={'일시적인 문제가 발생하였습니다. 다시 시도해 주세요.'}
      />
    );
  }
  return (
    <div className="pt-20 w-full px-4 py-8 mx-auto h-dvh">
      <h2 className="text-lg font-semibold">찜한 식당</h2>
      <p className="text-sm text-gray-500 py-2">찜한 식당 목록입니다.</p>
      <SearchFilter onChange={onChange} placeholder="찜한 식당 이름" />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <PulseLoading />
        ) : (
          likes?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data &&
                page.data.map((data: LikeType) => {
                  let category = data.restaurant?.category;
                  if (category && !validCategories.includes(category)) {
                    category = '기타';
                  }
                  return (
                    <RestaurantList
                      key={data.createdAt}
                      rest={data.restaurant}
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
      {!isLoading && !isError && likes?.pages[0].data.length === 0 && (
        <div className="flex justify-center">
          🥲 검색된 찜한 식당이 없습니다.
        </div>
      )}
    </div>
  );
};

export default UserLikes;
