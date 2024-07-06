import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import Nav from '@/components/nav';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'ZielonaPaka',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='scroll-smooth' lang='pl'>
      <body className={poppins.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
