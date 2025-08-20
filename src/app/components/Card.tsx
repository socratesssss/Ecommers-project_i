'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

type ProductCardProps = {
  id: string;
  images: string[];
  name: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  productColors?: { color: string; images: string[] }[];
  onClick?: () => void;
  firstImageOnly?: boolean; // New prop to control image loading
};

export default function ProductCard({
  id,
  images = [],
  name,
  price,
  discountPrice,
  inStock,
  productColors = [],
  onClick,
  firstImageOnly = false, // Default to false for backward compatibility
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const selectedColor = productColors[0] || null;

  // Determine which images to use (color-specific or main images)
  const displayImages = selectedColor?.images?.length > 0 ? selectedColor.images : images;
  
  // Get the first image for initial render
  const firstImage = displayImages[0] || '/placeholder.jpg';
  
  // Get the second image for hover if needed
  const hoverImage = displayImages.length > 1 ? displayImages[1] : firstImage;

  const handleAdd = () => {
    dispatch(addToCart({
      _id: id,
      productName: { original: name },
      price: { amount: discountPrice || price },
      quantity: 1,
      imageUrl: firstImage,
      inStock,
      selectedColor: selectedColor?.color || null,
      allColors: productColors || [],
    }));

    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const discountPercent =
    discountPrice && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  const showDiscount =
    discountPrice !== undefined &&
    discountPrice > 0 &&
    discountPrice < price;

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 p-2"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {animate && (
        <div className="absolute top-3 right-3 z-50 bg-white rounded-4xl px-2 py-1 text-green-500 animate-bounce flex items-center gap-1">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Added!</span>
        </div>
      )}

      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {onClick ? (
          <div className="w-full h-full cursor-pointer">
            {/* First image - always shown */}
            <Image
              src={firstImage}
              alt={name}
              fill
              className="object-cover"
              priority={true} // Load with priority for better LCP
            />
            
            {/* Second image on hover - only if not using firstImageOnly */}
            {!firstImageOnly && hoverImage !== firstImage && (
              <Image
                src={hoverImage}
                alt={name}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        ) : (
          <Link href={`/products/${id}`}>
            <div className="w-full h-full">
              {/* First image - always shown */}
              <Image
                src={firstImage}
                alt={name}
                fill
                className="object-cover"
                priority={true}
              />
              
              {/* Second image on hover - only if not using firstImageOnly */}
              {!firstImageOnly && hoverImage !== firstImage && (
                <Image
                  src={hoverImage}
                  alt={name}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>
          </Link>
        )}
      </div>

      <div className="sm:py-2 mt-2 flex flex-col">
        <h3 className="sm:text-sm text-xs font-semibold text-gray-800 line-clamp-2">
          {name}
        </h3>

        <div className="flex justify-between text-sm sm:text-base items-center sm:mt-1">
          <p className="text-[#FB7009] font-semibold">
            {showDiscount ? `$${discountPrice?.toFixed(2)}` : `$${price.toFixed(2)}`}
          </p>
          {!inStock && (
            <span className="text-red-500 text-[10px] sm:text-xs font-semibold">Out of stock</span>
          )}
        </div>

        {showDiscount && (
          <div className="flex gap-3 items-center sm:mt-1">
            <p className="text-gray-400 text-[10px] sm:text-xs line-through">${price.toFixed(2)}</p>
            {discountPercent > 0 && (
              <span className="text-green-600 text-[10px] sm:text-xs">{discountPercent}% OFF</span>
            )}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          disabled={!inStock}
          className={`sm:mt-3 mt-2 text-xs font-semibold py-1 px-3 rounded-full flex justify-center items-center gap-2 transition-all duration-200 ease-in
            ${inStock
              ? "border border-green-500 active:bg-gray-400 text-green-500 hover:bg-green-500 hover:text-white"
              : "bg-gray-200 text-gray-500 pointer-events-none"
            }`}
        >
          <ShoppingCart className="size-3 sm:size-5" />
          Add to cart
        </button>
      </div>
    </div>
  );
}