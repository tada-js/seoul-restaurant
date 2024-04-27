'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiViewList, CiUser, CiHeart, CiSaveUp2 } from 'react-icons/ci';

const Navbar = () => {
  const pathName = usePathname();
  const isSelected = (path: string) => {
    return pathName === path ? `text-[#2CBFB1]` : 'text-gray-700';
  };
  const { data: session, status } = useSession();

  return (
    <>
      <div className="max-w-screen-xl fixed top-0 z-[100] flex h-[60px] w-full items-center justify-between  bg-white shadow-sm">
        <div
          className={`cursor-pointer px-[18px] text-lg font-extrabold text-[#2CBFB1]`}
        >
          <Link href="/" aria-label="Home">
            서울식당
          </Link>
        </div>
        {session && status === 'authenticated' && (
          <button
            className="px-6 hover:text-gray-600 focus:text-gray-600"
            onClick={() => signOut()}
            aria-label="Sign out"
          >
            로그아웃
          </button>
        )}
        {status === 'unauthenticated' && (
          <Link
            className="px-6 hover:text-gray-600 focus:text-gray-600"
            href="/api/auth/signin"
            aria-label="Sign in"
          >
            로그인
          </Link>
        )}
      </div>
      <div className="md:px-20 p-1 max-w-screen-xl fixed bottom-0 z-[100] w-full h-[60px] bg-white border-t text-gray-700">
        <nav className="px-6">
          <ul className="flex items-center justify-between">
            <li key="/restaurants">
              <Link
                className={`text-sm flex flex-col items-center hover:text-gray-500 ${isSelected(
                  '/restaurants'
                )}`}
                href="/restaurants"
                aria-label="Restaurant List"
              >
                <CiViewList className="text-4xl" />
                식당 목록
              </Link>
            </li>
            <li key="/a">
              <Link
                className={`text-sm flex flex-col items-center hover:text-gray-500  ${isSelected(
                  '/restaurant/new'
                )}`}
                href="/restaurant/new"
                aria-label="Restaurant Register"
              >
                <CiSaveUp2 className="text-4xl" />
                식당 등록
              </Link>
            </li>
            <li key="/b">
              <Link
                className={`text-sm flex flex-col items-center hover:text-gray-500  ${isSelected(
                  '/user/likes'
                )}`}
                href="/user/likes"
                aria-label="Like Restaurant"
              >
                <CiHeart className="text-4xl" />
                찜한 식당
              </Link>
            </li>
            <li key="/user/my">
              <Link
                className={`text-sm flex flex-col items-center hover:text-gray-500 ${isSelected(
                  '/user/my'
                )}`}
                href="/user/my"
                aria-label="My Page"
              >
                <CiUser className="text-4xl" />
                마이페이지
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
