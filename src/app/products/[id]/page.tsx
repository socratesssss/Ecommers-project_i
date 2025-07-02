'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { products } from '@/db/product';

const ProductPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string, 10);

  const product = products.find((p) => p.id === productId);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found.</div>;
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="px-4 lg:px-16 xl:px-32 2xl:px-64 py-10 flex flex-col lg:flex-row gap-16">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        {/* Mobile Scrollable Gallery */}
        <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory">
          {product.images.map((img, i) => (
            <div key={i} className="min-w-full snap-center relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`Product ${i + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop Slider */}
        <div className="relative hidden lg:block w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={product.images[activeIndex]}
            alt={`Product ${activeIndex + 1}`}
            fill
            sizes="50vw"
            className="object-cover"
          />
          {/* Prev / Next Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {product.images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === activeIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="mt-4 flex gap-3 justify-center">
          {product.images.map((img, i) => (
            <div
              key={i}
              className={`relative w-20 h-20 rounded-lg cursor-pointer border ${
                i === activeIndex ? 'opacity-100 border-black' : 'opacity-50'
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={img}
                alt={`Thumb ${i + 1}`}
                fill
                sizes="20vw"
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg text-red-600 font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 capitalize">Category: {product.category}</p>
        {product.inStock ? (
          <span className="text-green-600 text-sm font-medium">In Stock</span>
        ) : (
          <span className="text-red-500 text-sm font-medium">Out of Stock</span>
        )}
        <p className="text-md text-gray-800 leading-relaxed">
          {product.description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
