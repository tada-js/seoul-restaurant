import UserMy from 'app/(feature)/_components/user/UserMy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '서울식당 마이페이지',
};

const UserMyPage = () => {
  return <UserMy />;
};

export default UserMyPage;
