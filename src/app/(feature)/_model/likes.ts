import { RestaurantType } from './restaurant';

export interface LikeType {
  id: number;
  restaurantId: number;
  userId: number;
  restaurant?: RestaurantType;
}
