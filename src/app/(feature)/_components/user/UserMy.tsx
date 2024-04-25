/* eslint-disable @next/next/no-img-element */
'use client';

import { useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiFillHeart } from 'react-icons/ai';
import PingLoading from 'app/(feature)/_components/ui/PingLoading';
import { fetchLikesCount } from 'app/(feature)/_lib/likes';

const UserMy = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: likes, isLoading } = useQuery({
    queryKey: ['mypage-likes'],
    queryFn: fetchLikesCount,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-dvh">
          <PingLoading />
        </div>
      ) : (
        <div className="max-w-screen-xl h-dvh mx-auto pt-14 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-teal-200 via-cyan-400 to-emerald-200" />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-l-emerald-200  border-t-emerald-300 border-r-emerald-400 border-b-emerald-300 rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={session?.user.image || '/images/DefaultProfile.png'}
              alt="프로필 이미지"
              width={120}
              height={128}
            />
          </div>
          <div className="text-center mt-2 pt-4">
            <h2 className="font-semibold text-2xl">{session?.user.name}</h2>
            <p className="text-gray-500">{session?.user.email}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li
              className="flex flex-col items-center justify-around cursor-pointer"
              onClick={() => router.replace('/user/likes')}
            >
              <h3 className="font-semibold text-gray-600 hover:text-gray-900">
                찜한 식당
              </h3>
              <div className="flex items-center gap-1">
                <AiFillHeart className="text-red-500" />
                <div>{likes?.data.length}</div>
              </div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2">
            <button
              className="w-1/2 md:w-1/4  block mx-auto rounded-full bg-[#2CBFB1] hover:shadow-md hover:bg-[#038C7F] font-semibold text-white px-6 py-2"
              onClick={() => signOut()}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMy;
