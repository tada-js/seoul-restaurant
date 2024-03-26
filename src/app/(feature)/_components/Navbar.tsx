'use client';

import Link from 'next/link';
import { CiViewList, CiUser, CiHeart, CiSaveUp2 } from 'react-icons/ci';

const Navbar = () => {
  return (
    <>
      <div className="max-w-screen-xl fixed top-0 z-[100] flex h-[60px] w-full items-center justify-between bg-white shadow-sm">
        <div className="cursor-pointer px-[18px] text-lg font-extrabold text-[#2CBFB1]">
          <Link href="/">서울식당</Link>
        </div>
        <Link className="px-6" href="/api/auth/signin">
          로그인
        </Link>
      </div>
      <div className="md:px-20 p-1 max-w-screen-xl fixed bottom-0 z-[100] w-full h-[60px] bg-white border-t text-gray-700">
        <div className="flex items-center justify-between px-6">
          <div className="flex flex-col justify-center items-center">
            <CiViewList className="text-4xl" />
            <Link className="text-sm" href="/restaurants">
              식당 목록
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiSaveUp2 className="text-4xl" />
            <Link className="text-sm" href="/user/my">
              식당 등록
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiHeart className="text-4xl" />
            <Link className="text-sm" href="/user/my">
              찜한 식당
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiUser className="text-4xl" />
            <Link className="text-sm" href="/user/my">
              마이페이지
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
