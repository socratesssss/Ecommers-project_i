'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

type ProductCardProps = {
  id: string | number;
  images: string[];
  name: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
};

export default function ProductCard({
  id,
  images = [],
  name,
  price,
  discountPrice,
  inStock,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart({
      _id: id.toString(),
      productName: { original: name },
      price: { amount: discountPrice || price },
      quantity: 1,
      imageUrl: images[0],
      availability: { status: inStock ? 'In Stock' : 'Out of Stock' },
    }));

    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const discountPercent =
    discountPrice && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;
console.log(id)
  return (
    <div className="relative bg-white     rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 p-2">
      {animate && (
        <div className="absolute top-3 right-3 z-50 bg-white rounded-4xl px-2 py-1 text-green-500 animate-bounce flex items-center gap-1">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Added!</span>
        </div>
      )}

      <Link href={`/products/${id}`}>
        <div className="relative w-full aspect-[4/3] group">
          {images[0] && (
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
          )}
          {images[1] && (
            <Image
              src={images[1]}
              alt={`${name} hover`}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>
      </Link>

      <div className=" sm:py-2 mt-2 flex flex-col">
        <h3 className="sm:text-sm text-xs font-semibold text-gray-800 line-clamp-2">{name}</h3>

        <div className="flex justify-between text-sm sm:text-base items-center sm:mt-1">
          <p className="text-[#FB7009] font-semibold">
            {discountPrice ? `$${discountPrice.toFixed(2)}` : `$${price.toFixed(2)}`}
          </p>
          {!inStock && (
            <span className="text-red-500 text-[10px] sm:text-xs font-semibold">Out of stock</span>
          )}
        </div>

        {discountPrice && (
          <div className="flex gap-3 items-center sm:mt-1">
            <p className="text-gray-400 text-[10px] sm:text-xs line-through">${price.toFixed(2)}</p>
            <span className="text-green-600 text-[10px] sm:text-xs">{discountPercent}% OFF</span>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`sm:mt-3 mt-2 text-xs font-semibold py-1 px-3 rounded-full flex justify-center items-center gap-2 transition-all duration-200 ease-in
            ${inStock
              ? "border border-green-500  active:bg-gray-400 text-green-500 hover:bg-green-500 hover:text-white"
              : "bg-gray-200 text-gray-500 pointer-events-none"
            }`}
        >
          <ShoppingCart className="size-3 sm:size-5 " />
          Add to cart
        </button>
      </div>
    </div>
  );
};
