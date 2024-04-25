import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Navbar from './(feature)/_components/Navbar';
import Providers from './(feature)/_components/Providers';

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: '서울식당',
    template: '서울식당 | %s',
  },
  description: '서울식당',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSansKr.className}>
      <body className="bg-neutral-50">
        <Providers>
          <header className="max-w-screen-xl mx-auto">
            <Navbar />
          </header>
          <main className="max-w-screen-xl mx-auto w-full bg-white">
            {children}
          </main>
        </Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
