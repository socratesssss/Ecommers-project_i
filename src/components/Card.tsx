import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  id: number;
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
  // Calculate discount percentage rounded to integer
  const discountPercent =
    discountPrice && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
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

      <div className="p-1 sm:p-2 flex flex-col">
        <h3 className="text-[14px] sm:text-base leading-6 font-semibold text-gray-800 line-clamp-1">{name}</h3>

        {/* Price display */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[#FB7009] text-[14px] sm:text-base font-semibold">
              {discountPrice !== undefined ? `$${discountPrice.toFixed(2)}` : `$${price.toFixed(2)}`}
            </p>
          
          </div>
          {!inStock && (
            <span className="text-red-500 text-[10px] sm:text-xs font-semibold">
              Out of stock
            </span>
          )}
        </div>

   
        {
          discountPrice && <div className="flex gap-4 items-center ">
            <p className="text-gray-400 text-[10px] sm:text-xs line-through">${price.toFixed(2)}</p>
             <span className="text-green-600 text-[10px] sm:text-xs font-medium">
            {discountPercent}% OFF
          </span>

          </div>
        }
       

       
          <Link href={inStock ? "/cart" : "#"}>
            <div
              className={`cursor-pointer mt-2 text-xs mb-1 sm:mb-0 font-semibold py-1 px-3 rounded-full flex justify-center items-center gap-2 transition-all duration-200 ease-in
              ${
                inStock
                  ? "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  : "bg-gray-200 text-gray-500 pointer-events-none"
              }`}
            >
              <ShoppingCart className="size-3 sm:size-5" />
              Add to cart
            </div>
          </Link>
       
      </div>
    </div>
  );
}
