import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  id: number;
  images: string[];
  name: string;
  price: string;
  inStock: boolean;
};

export default function ProductCard({
  id,
  images = [],
  name,
  price,
  inStock,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* ✅ Correct route to dynamic product page */}
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

      <div className="p-2 flex flex-col">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>

        <div className="flex text-sm justify-between">
          <p
            className={
              inStock
                ? "text-red-500"
                : "line-through text-gray-500 decoration-gray-400/60"
            }
          >
            {price}
          </p>
          {!inStock && <p className="text-red-500">Out of stock</p>}
        </div>

        <div className="flex justify-between">
          <Link href={inStock ? "/cart" : "#"}>
            <div
              className={`cursor-pointer mt-2 text-sm font-semibold py-1 px-3 rounded-full flex justify-center items-center gap-2 transition-all duration-200 ease-in
              ${
                inStock
                  ? "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  : "bg-gray-200 text-gray-500 pointer-events-none"
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 transition-all duration-200 ease-in ${
                  inStock
                    ? "text-green-500 group-hover:text-white"
                    : "text-gray-500"
                }`}
              />
              Add to cart
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
