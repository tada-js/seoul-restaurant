'use client';

import Image from 'next/image';
import ModalPortal from './ModalPortal';
import {
  useCurrentRestaurantStore,
  useImageSrcStore,
} from 'app/_store/restaurant';
import { LiaRoadSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { MdOutlineFoodBank } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const KaKaoMapSimpleModal = () => {
  const router = useRouter();
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
          <div className="fixed inset-x-0 bottom-20 z-10 mx-auto w-full max-w-sm rounded-lg bg-white shadow-lg md:max-w-xl">
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    className="aspect-square object-cover"
                    src={imageSrc}
                    width={50}
                    height={50}
                    alt="아이콘 이미지"
                  />
                  <div>
                    <div className="font-semibold">{restaurant?.name}</div>
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
              <div className="mt-4 flex items-center gap-3 border-t-2 pt-4 border-[#f2f2f2]">
                <HiOutlineMapPin />
                {restaurant?.address}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <LiaRoadSolid />
                {restaurant?.rodaddress}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <MdOutlineFoodBank /> {restaurant?.category}
              </div>
            </div>
            <button
              className="w-full rounded-b-lg bg-[#2CBFB1] py-3 font-semibold text-white hover:bg-[#038C7F] focus:bg-[#038C7F]"
              type="button"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              상세보기
            </button>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default KaKaoMapSimpleModal;
