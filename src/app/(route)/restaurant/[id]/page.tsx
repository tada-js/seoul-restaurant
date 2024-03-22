'use client';

import { useQuery } from '@tanstack/react-query';
import KaKaoMapMarker from 'app/(feature)/_components/kakao/KaKaoMapMarker';
import KakaoMap from 'app/(feature)/_components/kakao/KakaoMap';
import { fetchRestaurant } from 'app/(feature)/_lib/restaurant';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id: id } }: Props) => {
  const {
    data: restautant,
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`restaurant-${id}`],
    queryFn: () => fetchRestaurant(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="px-2 sm:px-0">
          <div className="flex gap-6 justify-center items-center">
            <div>
              <Image
                className="aspect-square object-cover"
                src={`/images/한식.png`}
                width={50}
                height={50}
                alt="아이콘 이미지"
              />
            </div>
            <div>
              <h3 className="font-semibold leading-7 text-gray-900 text-xl">
                {restautant?.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {restautant?.category}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {restautant?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                도로명 주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {restautant?.rodaddress}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
            <KakaoMap lat={restautant?.lat} lng={restautant?.lng} zoom={1} />
            <KaKaoMapMarker restautant={restautant} />
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantPage;
