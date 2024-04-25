import UserLogin from 'app/(feature)/_components/user/UserLogin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '서울식당 로그인',
};

const UserLoginPage = () => {
  return <UserLogin />;
};

export default UserLoginPage;
