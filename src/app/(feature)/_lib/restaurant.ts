import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { RestaurantType } from '../_model/restaurant';
import { toast as toastType } from 'react-toastify';

export const fetchRestaurant = async (id: string | number) => {
  const res = await fetch(`/api/restaurants?id=${id}`);
  return res.json() as Promise<RestaurantType>;
};

export const updateRestaurant = async (
  data: {
    id: number;
    name?: string | null;
    category?: string | null;
    rodaddress?: string | null;
  },
  router: AppRouterInstance,
  toast: typeof toastType
) => {
  try {
    const res = await fetch('/api/restaurant', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const { id } = await res.json();
      toast.success('식당을 수정하였습니다.');
      router.replace(`/restaurant/${id}`);
    } else {
      toast.error('❌ 다시 시도해 주세요.');
    }
  } catch (error) {
    console.log(error);
    toast.error('❌ 문제가 발생하였습니다. 다시 시도해주세요.');
  }
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
