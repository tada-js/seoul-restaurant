import { useQuery } from '@tanstack/react-query';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { fetchRestaurant } from '../_lib/restaurant';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface Props {
  restaurantId: number;
}

const RestaurantLike = ({ restaurantId }: Props) => {
  const { data: session, status } = useSession();

  const { data: restautant, refetch } = useQuery({
    queryKey: [`like-restaurant-${restaurantId}`],
    queryFn: () => fetchRestaurant(restaurantId),
    enabled: !!restaurantId,
    refetchOnWindowFocus: false,
  });

  const toggleLike = async () => {
    if (session?.user && restautant) {
      try {
        const like = await fetch('/api/likes', {
          method: 'POST',
          body: JSON.stringify({
            restaurantId: restautant.id,
          }),
        });

        if (like.status === 201) {
          toast.success('식당을 찜 하였습니다.');
        } else {
          toast.success('식당을 찜 취소하였습니다.');
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
    if (status === 'unauthenticated') {
      toast.info('로그인 후 찜하기를 해 주세요.');
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {restautant?.likes?.length ? (
        <AiFillHeart className="text-red-500 hover:text-red-600 focus:text-red-600" />
      ) : (
        <AiOutlineHeart className="text-red-500 hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
};

export default RestaurantLike;
