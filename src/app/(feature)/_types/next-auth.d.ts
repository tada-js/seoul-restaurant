import NextAuth from 'next-auth';
import { AuthUserType } from '../_model/user';

declare module 'next-auth' {
  interface Session {
    user: AuthUserType;
  }
}
