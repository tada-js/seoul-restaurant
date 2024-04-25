import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RestaurantType } from '../../_model/restaurant';

interface Props {
  rest?: RestaurantType;
  category?: string | null;
}

const RestaurantList = ({ rest, category }: Props) => {
  const router = useRouter();
  return (
    <li
      className="flex justify-between py-5 gap-x-6 cursor-pointer hover:bg-teal-50 focus:bg-teal-50"
      key={rest?.id}
      onClick={() => router.push(`/restaurant/${rest?.id}`)}
    >
      <div className="flex gap-x-4">
        <Image
          src={`/images/${category}.png`}
          width={48}
          height={48}
          alt="아이콘 이미지"
        />
        <div>
          <div className="text-sm font-semibold leading-6 text-gray-900">
            {rest?.name}
          </div>
          <div className="mt-1 text-xs font-semibold leading-5 text-gray-500 truncate">
            {rest?.category}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm font-semibold leading-6 text-gray-900">
          {rest?.address}
        </div>
        <div className="mt-1 text-xs font-semibold leading-5 text-gray-500 truncate">
          {rest?.rodaddress}
        </div>
      </div>
    </li>
  );
};

export default RestaurantList;
