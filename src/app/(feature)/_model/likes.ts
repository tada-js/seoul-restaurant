import { RestaurantType } from './restaurant';

export interface LikeType {
  id: number;
  userId: number;
  createdAt: string;
  restaurant: RestaurantType;
  restaurantName: string;
  restaurantAddress: string;
  restaurantId: number;
}
