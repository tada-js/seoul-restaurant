'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';
import { RestaurantType } from './_model';
import Image from 'next/image';
import useIntersectionObserver from 'app/(feature)/_hooks/useIntersectionObserver';
import { fetchRestaurants } from 'app/(feature)/_lib/restaurants';
import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import ErrorMessage from 'app/(feature)/_components/ui/ErrorMessage';
import Loader from 'app/(feature)/_components/ui/Loader';

const RestaurantsPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const intersectionObserver = useIntersectionObserver(ref, {});
  const isIntersecting = !!intersectionObserver?.isIntersecting;
  const {
    data: restaurants,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchRestaurants,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });
  const validCategories = CATEGORIES;

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
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <div>Loading.....</div>
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
                    <li
                      className="flex justify-between gap-x-6 py-5"
                      key={rest.id}
                    >
                      <div className="flex gap-x-4">
                        <Image
                          src={`/images/${category}.png`}
                          width={48}
                          height={48}
                          alt="아이콘 이미지"
                        />
                        <div>
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            {rest?.name}
                          </div>
                          <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                            {rest?.category}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          {rest?.address}
                        </div>
                        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                          {rest?.rodaddress}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};

export default RestaurantsPage;
