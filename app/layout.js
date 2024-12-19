import { Inter } from 'next/font/google';
import './globals.css';
import { FaShoppingCart } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fruit Shop',
  description: 'Hyperinflated Fruit Store',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`min-h-screen flex flex-col relative ${inter.className}`}>
        <Header />
        <div className='flex-1'>{children}</div>
        <footer className='flex items-center flex-wrap justify-center border-t border-solid p-10 border-slate-500'>
          <Link href={`https://www.instagram.com/fruitshoptm/`} target='_blank'>
            <FaInstagram className='text-slate-700 hover:text-slate-500 cursor-pointer text-2xl sm:text-3xl' />
          </Link>
        </footer>
        <div id='portal'></div>
      </body>
    </html>
  );
}
