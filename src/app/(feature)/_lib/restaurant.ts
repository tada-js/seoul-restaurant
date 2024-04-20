import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { RestaurantType } from '../_model/restaurant';
import { toast as toastType } from 'react-toastify';

export const fetchRestaurant = async (id: string) => {
  const res = await fetch(`/api/restaurants?id=${id}`);
  return res.json() as Promise<RestaurantType>;
};

export const deleteRestaurant = async (
  id: string,
  router: AppRouterInstance,
  toast: typeof toastType,
  name?: string | null
) => {
  const confirm = window.confirm(`${name} 식당을 삭제하시겠습니까?`);

  if (confirm) {
    try {
      const res = await fetch(`/api/restaurant?id=${id}`, {
        method: 'DELETE',
        body: JSON.stringify(id),
      });

      if (res.status === 200) {
        toast.success('삭제하였습니다.');
        router.replace('/restaurants');
      } else {
        toast.error('다시 시도해 주세요.');
      }
    } catch (e) {
      console.log(e);
      toast.error('다시 시도해 주세요.');
    }
  }
};
