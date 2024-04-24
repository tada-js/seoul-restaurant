import { LikeType } from './likes';

export interface RestaurantType {
  id: number;
  name?: string | null;
  address?: string | null;
  rodaddress?: string | null;
  category?: string | null;
  lng?: string;
  lat?: string;
  wgs?: boolean;
  likes?: LikeType[];
}
