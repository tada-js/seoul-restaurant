'use client';

import Image from 'next/image';
import ModalPortal from '../ui/ModalPortal';
import { LiaRoadSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { MdOutlineFoodBank } from 'react-icons/md';
import Link from 'next/link';
import {
  useCurrentRestaurantStore,
  useImageSrcStore,
} from 'app/(feature)/_store/restaurant';
import RestaurantLike from '../RestaurantLike';

const KakaoMapSimpleModal = () => {
  const restaurant = useCurrentRestaurantStore(
    (state) => state.currentRestaurant
  );
  const setCurrentRestaurant = useCurrentRestaurantStore(
    (state) => state.setCurrentRestaurant
  );
  const imageSrc = useImageSrcStore((state) => state.imageSrc);

  return (
    <>
      {restaurant && (
        <ModalPortal>
          <div className="fixed inset-x-0 z-10 w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg bottom-20 md:max-w-xl">
            <div className="p-8">
              <div className="flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Image
                    className="object-cover aspect-square"
                    src={imageSrc}
                    width={50}
                    height={50}
                    alt="아이콘 이미지"
                  />
                  <div>
                    <div className="flex gap-1">
                      <div className="font-semibold">{restaurant?.name}</div>
                      <RestaurantLike restaurantId={restaurant.id} />
                    </div>
                  </div>
                </div>
                <button
                  className="pt-3"
                  type="button"
                  onClick={() => setCurrentRestaurant(null)}
                >
                  <AiOutlineClose className="w-5 h-5 text-gray-600 hover:text-gray-900 foucs:text-gray-900" />
                </button>
              </div>
              <div className="pt-4 flex items-center gap-3 border-[#f2f2f2]">
                <HiOutlineMapPin />
                {restaurant?.address}
              </div>
              <div className="flex items-center gap-3 pt-4">
                <LiaRoadSolid />
                {restaurant?.rodaddress}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <MdOutlineFoodBank /> {restaurant?.category}
              </div>
            </div>
            <Link
              href={`/restaurant/${restaurant.id}`}
              className={`flex justify-center items-center w-full rounded-b-lg bg-[#2CBFB1] py-3 font-semibold text-white hover:bg-[#038C7F] focus:bg-[#038C7F]`}
              onClick={() => {
                setCurrentRestaurant(null);
              }}
            >
              상세보기
            </Link>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default KakaoMapSimpleModal;
