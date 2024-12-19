'use client';
import React from 'react';
import ReactDom from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import useCart from './(store)/store';
import { useRouter } from 'next/navigation';

const Modal = () => {
  const closeModal = useCart((state) => state.setOpenModal);
  const cartItems = useCart((state) => state.cart);

  const router = useRouter();
  const checkout = async () => {
    const lineItems = cartItems.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: 1,
      };
    });

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ lineItems }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
    router.push(data.session.url);
  };

  return ReactDom.createPortal(
    <div className=' fixed top-0 left-0 h-screen z-50 w-screen '>
      <div
        onClick={closeModal}
        className='bg-transparent absolute inset-0'></div>
      <div className='flex flex-col gap-4 p-4 bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow-lg'>
        <div className='flex justify-between w-full items-center p-6 relative'>
          <h1>Cart</h1>
          <IoMdClose
            className='cursor-pointer hover:opacity-60'
            onClick={closeModal}
          />
          <div className='absolute  bg-slate-300 w-2/3 bottom-0 left-1/2 -translate-x-1/2 h-[1px]'></div>
        </div>
        <div className='p-4 flex flex-col gap-4 overflow-y-scroll'>
          {cartItems.length === 0
            ? 'There is nothing in your cart'
            : cartItems.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className=' flex flex-col gap-2 border-l border-solid border-slate-700 px-2'>
                  <div className='flex items-center justify-between'>
                    <h2>{item.name}</h2>
                    <p>${item.cost / 100}</p>
                  </div>
                  <p className='text-slate-600 text-sm'>Quantiy: 1</p>
                </div>
              ))}
        </div>
        <div
          onClick={checkout}
          className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase grid place-items-center hover:opacity-60 cursor-pointer'>
          Checkout
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
