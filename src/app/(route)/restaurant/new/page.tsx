'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import React from 'react';
import { RestaurantType } from 'app/(feature)/_model/restaurant';
import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import FormErrorMesssage from 'app/(feature)/_components/ui/FormErrorMesssage';
import { toast } from 'react-toastify';
import DaumAddressSearch from 'app/(feature)/_components/DaumAddressSearch';

const RestaurantRegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RestaurantType>();

  return (
    <form
      className="pt-24 px-4 mx-auto py-8 overflow-hidden h-screen"
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await fetch('/api/restaurant', {
            method: 'POST',
            body: JSON.stringify(data),
          });
          if (res.status === 200) {
            const { id } = await res.json();
            toast.success('🎉 식당을 등록하였습니다.');
            router.replace(`/restaurant/${id}`);
          } else {
            toast.error('❌ 다시 시도해 주세요.');
          }
        } catch (error) {
          console.log(error);
          toast.error('❌ 문제가 발생하였습니다. 다시 시도해주세요.');
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            식당 등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            식당을 등록하면 지도와 목록에 추가 됩니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                <strong className="text-red-500">*</strong>
                <h3>식당명</h3>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="식당명"
                  {...register('name', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2CBFB1] sm:text-sm sm:leading-6"
                />
                {errors.name?.type === 'required' && (
                  <FormErrorMesssage name="식당명을" />
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                <strong className="text-red-500">*</strong>
                <h3>메뉴</h3>
              </label>
              <div className="mt-2">
                <select
                  {...register('category', { required: true })}
                  className="block w-full rounded-md border-0 px-2 outline-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2CBFB1] sm:text-sm sm:leading-6"
                >
                  <option value="">선택</option>
                  {CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category?.type === 'required' && (
                  <FormErrorMesssage name="메뉴를" />
                )}
              </div>
            </div>

            <DaumAddressSearch
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-[#2CBFB1] hover:text-[#038C7F]"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#2CBFB1] px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#038C7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CBFB1]"
        >
          제출
        </button>
      </div>
    </form>
  );
};

export default RestaurantRegisterPage;
