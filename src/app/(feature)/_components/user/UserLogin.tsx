'use client';

import { useEffect } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserLogin = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  return (
    <div className="h-dvh">
      <div className="flex flex-col justify-center px-6 lg:px-8 h-[85vh]">
        <div className="w-full max-w-sm mx-auto">
          <div className="mt-6 text-2xl font-bold text-center text-gray-700">
            로그인
          </div>
          <p className="mt-2 text-sm text-center text-gray-500">
            SNS 계정으로 로그인 또는 회원가입이 진행됩니다.
          </p>
        </div>
        <div className="w-full max-w-sm mx-auto mt-10">
          <ul className="flex flex-col gap-3">
            <li key="google">
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="text-gray-700 flex justify-center items-center border-2  hover:border-[#4285F4] font-medium rounded-lg w-full px-5 py-4"
              >
                <AiOutlineGoogle className="w-6 h-6 text-[#4285F4]/90 flex-none" />
                <p className="flex-1">Google</p>
              </button>
            </li>
            <li key="naver">
              <button
                type="button"
                onClick={() => signIn('naver', { callbackUrl: '/' })}
                className="text-gray-700 flex justify-center items-center border-2 hover:border-[#2db400] font-medium rounded-lg w-full px-5 py-4"
              >
                <SiNaver className="w-4 h-4 text-[#2db400]/90 flex-none ml-1" />
                <p className="flex-1">Naver</p>
              </button>
            </li>
            <li key="kakao">
              <button
                type="button"
                onClick={() => signIn('kakao', { callbackUrl: '/' })}
                className="text-gray-700 flex justify-center items-center border-2 hover:border-[#fef01b] font-medium rounded-lg w-full px-5 py-4"
              >
                <RiKakaoTalkFill className="flex-none w-6 h-6" />
                <p className="flex-1">Kakao</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
