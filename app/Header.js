'use client';
import { FaShoppingCart } from 'react-icons/fa';
import React from 'react';
import useCart from './(store)/store';
import Link from 'next/link';
import Modal from './Modal';

const Header = () => {
  const cartItems = useCart((state) => state.cart);
  const openModal = useCart((state) => state.openModal);
  const setOpenModal = useCart((state) => state.setOpenModal);
  return (
    <header className='text-black sticky top-0 p-6 bg-white border-b border-solid border-blue-900 shadow-md z-50 text-2xl sm:text-3xl md:text-4xl sm:p-8 flex items-center justify-between'>
      {openModal && <Modal />}
      <Link href={'/'}>
        <h1 className='uppercase cursor-pointer hover:scale-110'>
          Fruit Shope
        </h1>
      </Link>
      <div className='relative grid place-items-center cursor-pointer group'>
        {cartItems.length > 0 && (
          <div className='absolute  -translate-y-full -translate-x-full aspect-square top-0 h-4 sm:h-5 grid place-items-center  bg-blue-400 text-white rounded-full right-0'>
            <p className='text-xs sm:text-sm'>{cartItems.length}</p>
          </div>
        )}
        <FaShoppingCart
          onClick={setOpenModal}
          className='cursor-pointer group-hover:text-slate-500'
        />
      </div>
    </header>
  );
};

export default Header;
