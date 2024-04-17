import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { RestaurantType } from '../_model/restaurant';
import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import FormErrorMesssage from './ui/FormErrorMesssage';

interface Props {
  register: UseFormRegister<RestaurantType>;
  errors: FieldErrors<RestaurantType>;
  setValue: UseFormSetValue<RestaurantType>;
}

const DaumAddressSearch = ({ register, errors, setValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let jibunAddress = data.jibunAddress || data.autoJibunAddress;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setValue('rodaddress', fullAddress);
    setValue('address', jibunAddress);
    setIsOpen(false);
  };
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="flex text-sm font-medium leading-6 text-gray-900"
        >
          <strong className="text-red-500">*</strong>
          <h3>주소</h3>
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              readOnly
              placeholder="주소 검색"
              {...register('rodaddress', { required: true })}
              className="col-span-3 block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2CBFB1] sm:text-sm sm:leading-6"
            />
            {/* <input readOnly {...register('address')} className="hidden" /> */}
            <button
              type="button"
              onClick={() => setIsOpen((io) => !io)}
              className="bg-[#2CBFB1] hover:bg-[#038C7F] w-28  py-1.5 px-2 rounded text-white"
            >
              {isOpen ? '닫기' : '주소 검색'}
            </button>
          </div>
          {errors?.rodaddress?.type === 'required' && (
            <FormErrorMesssage name="주소를" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
};

export default DaumAddressSearch;
