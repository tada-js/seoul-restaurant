export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/user/likes',
    '/user/my',
    '/restaurant/new',
    '/restaurant/edit/:path*',
  ],
};
