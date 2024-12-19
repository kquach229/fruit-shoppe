'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import useCart from './(store)/store';

const ProductCard = ({ product }) => {
  const { id: price_id, unit_amount: cost, product: productInfo } = product;
  const { name, description } = productInfo;
  const router = useRouter();

  const setProduct = useCart((state) => state.setProduct);

  const onProductClick = () => {
    const newProduct = {
      name,
      description,
      price_id,
      cost,
      productInfo,
    };

    setProduct({ newProduct });
    router.push(`/product?price_id=${price_id}`);
  };

  return (
    <div
      onClick={onProductClick}
      className='flex flex-col shadow bg-white hover:shadow-lg cursor-pointer'>
      <Image
        className='w-full h-full object-cover'
        src={productInfo.images[0]}
        alt={name}
        height={300}
        width={300}
      />
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex items-center justify-between'>
          <h3>{name}</h3>
          <p>${cost / 100}</p>
        </div>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
