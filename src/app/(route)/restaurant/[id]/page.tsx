'use client';

import { useQuery } from '@tanstack/react-query';
import KakaoMapMarker from 'app/(feature)/_components/kakao/KakaoMapMarker';
import KakaoMap from 'app/(feature)/_components/kakao/KakaoMap';
import useImageSrc from 'app/(feature)/_hooks/useImageSrc';
import { fetchRestaurant } from 'app/(feature)/_lib/restaurant';
import Image from 'next/image';
import ErrorMessage from 'app/(feature)/_components/ui/ErrorMessage';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Props {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: Props) => {
  const {
    data: restautant,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`restaurant-${id}`],
    queryFn: () => fetchRestaurant(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const imageSrc = useImageSrc(restautant?.category);
  const { status } = useSession();

  if (isError) {
    return (
      <ErrorMessage
        message={'일시적인 문제가 발생하였습니다. 다시 시도해 주세요.'}
      />
    );
  }

  return (
    <>
      {restautant && imageSrc && (
        <div className="pt-20 max-w-screen-xl px-4 py-8 mx-auto">
          {status === 'authenticated' && restautant && (
            <div className="flex justify-end gap-4 text-gray-500 pr-4">
              <Link
                href={`/restaurant/edit/${restautant.id}`}
                className=" hover:text-gray-800"
              >
                수정
              </Link>
              <Link
                href={`/restaurant/delete/${restautant.id}`}
                className=" hover:text-gray-800"
              >
                삭제
              </Link>
            </div>
          )}
          <div className="px-2 sm:px-0 py-4">
            <div className="flex items-center justify-center gap-8">
              <div>
                <Image
                  className="object-cover aspect-square"
                  src={imageSrc}
                  width={50}
                  height={50}
                  priority
                  alt="아이콘 이미지"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-7 text-gray-900 ">
                  {restautant?.name}
                </h3>
                <p className="max-w-2xl mt-1 text-sm font-medium leading-6 text-gray-600">
                  {restautant?.category}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 ">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:text-center">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  주소
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {restautant?.address}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:text-center">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  도로명 주소
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {restautant?.rodaddress}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      {isSuccess && (
        <>
          <div className="overflow-hidden w-full mb-20 mx-auto max-h-[600px]">
            <KakaoMap
              lat={restautant?.lat}
              lng={restautant?.lng}
              zoom={3}
              wgs={restautant?.wgs}
            />
            <KakaoMapMarker restautant={restautant} />
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantPage;
