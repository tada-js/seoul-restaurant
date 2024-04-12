'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import useIntersectionObserver from 'app/(feature)/_hooks/useIntersectionObserver';
import { fetchRestaurants } from 'app/(feature)/_lib/restaurants';
import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import ErrorMessage from 'app/(feature)/_components/ui/ErrorMessage';
import PingLoading from 'app/(feature)/_components/ui/PingLoading';
import { RestaurantType } from 'app/(feature)/_model/restaurant';
import PulseLoading from 'app/(feature)/_components/ui/PulseLoading';
import { useRouter } from 'next/navigation';
import SearchFilter from 'app/(feature)/_components/SearchFilter';
import { useSearchFilterStore } from 'app/(feature)/_store/restaurant';

const RestaurantsPage = () => {
  const validCategories = CATEGORIES;

  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const intersectionObserver = useIntersectionObserver(ref, {});
  const search = useSearchFilterStore((state) => state.search);
  const searchParams = {
    q: search?.q,
    district: search?.district,
  };
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
    queryKey: ['restaurants', searchParams],
    queryFn: () => fetchRestaurants({ searchParams }),
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
    <div className="w-full px-4 py-8 mx-auto">
      <SearchFilter />
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
                    <li
                      className="flex justify-between py-5 gap-x-6 cursor-pointer hover:bg-teal-50 focus:bg-teal-50"
                      key={rest.id}
                      onClick={() => router.push(`/restaurant/${rest.id}`)}
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
                          <div className="mt-1 text-xs font-semibold leading-5 text-gray-500 truncate">
                            {rest?.category}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          {rest?.address}
                        </div>
                        <div className="mt-1 text-xs font-semibold leading-5 text-gray-500 truncate">
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
      {(isFetching || hasNextPage || isFetchingNextPage) && <PingLoading />}
      <div className="w-full h-10 mb-10 touch-none" ref={ref} />
    </div>
  );
};

export default RestaurantsPage;
