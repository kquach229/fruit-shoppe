'use client';

import React from 'react';
import useCart from '../(store)/store';
import Image from 'next/image';

const ProductPage = (props) => {
  const product = useCart((state) => state.product);
  const addItemToCart = useCart((state) => state.addItemToCart);

  const { cost, productInfo, name, description } = product;

  if (!product?.name) {
    if (typeof window !== 'undefined') window.location.href = '/';
  }

  const handleAddToCart = () => {
    const newItem = {
      name,
      quantity: 1,
      cost,
      price_id: props.searchParams.price_id,
    };

    addItemToCart({ newItem });
  };
  return (
    <div className='flex flex-col p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto'>
        <div className='md:p-2 md:shadow'>
          <Image
            className='w-full h-full object-cover'
            src={productInfo.images[0]}
            alt={product.name}
            height={300}
            width={300}
          />
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <div className='flex items-center justify-between text-xl md:flex-col md:items-start gap-2'>
            <h3>{name}</h3>
            <p className='md:text-base'>${cost / 100}</p>
          </div>
          <p className='text-sm flex-1'>{description}</p>
          <button
            onClick={handleAddToCart}
            className='bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto px-4 py-2'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
