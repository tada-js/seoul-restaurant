import UserLikes from 'app/(feature)/_components/user/UserLikes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 식당',
  description: '서울식당 찜한 식당',
};

const UserLikesPage = () => {
  return <UserLikes />;
};

export default UserLikesPage;
