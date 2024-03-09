'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu, BiStore } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { PiListMagnifyingGlassBold } from 'react-icons/pi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 z-[100] flex h-14 w-full items-center justify-between bg-white shadow-sm">
        <div className="cursor-pointer px-[18px] text-lg font-extrabold text-[#2CBFB1]">
          <Link href="/">서울식당</Link>
        </div>
        <div className="hidden md:flex items-center gap-2 px-[18px]">
          <Link href="/restaurants">식당 목록</Link>
          <Link href="/user/my">마이페이지</Link>
        </div>
        {/* MOBILE BUTTON */}
        <div
          className="sm:block sm:px-[18px] md:hidden px-[18px]"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      {isOpen && (
        <div className="fixed top-[56px] z-[100] w-full h-auto bg-[#2CBFB1] text-[#f2f2f2] shadow-md sm:hidden">
          <div className="flex flex-col gap-4 px-[18px] py-10">
            <Link
              className="flex gap-4 items-center"
              href="/restaurants"
              onClick={() => setIsOpen(false)}
            >
              <PiListMagnifyingGlassBold />
              식당 목록
            </Link>
            <Link
              className="flex gap-4 items-center"
              href="/user/my"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle />
              마이페이지
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
