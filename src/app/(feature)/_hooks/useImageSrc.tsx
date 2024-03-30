import { CATEGORIES } from 'app/(feature)/_constants/restaurant';
import { RestaurantType } from '../_model/restaurant';

const useImageSrc = (category: RestaurantType['category']) => {
  const validCategories = CATEGORIES;

  if (category && !validCategories.includes(category)) {
    // 카테고리 항목에 없는 음식 종류라면 기타로 지정
    category = '기타';
  }

  if (category) {
    // 이미지 경로 반환
    return `/images/${category}.png`;
  }
};

export default useImageSrc;
