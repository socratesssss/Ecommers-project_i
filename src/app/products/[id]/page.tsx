'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { products, ProductColor } from '@/db/product';

const ProductPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string, 10);
  const product = products.find((p) => p.id === productId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setSelectedColor(null);
  }, [product]);

  const getDisplayImages = () => {
    return selectedColor?.images?.length ? selectedColor.images : getAllImages();
  };

  const getAllImages = () => {
    const base = product?.images || [];
    const colors = product?.productColors?.flatMap((c) => c.images) || [];
    return [...base, ...colors];
  };

  const displayImages = getDisplayImages();
  const allImages = getAllImages();

  const handleColorClick = (color: ProductColor | null) => {
    setSelectedColor(color);
    setActiveImageIndex(0);
    scrollToIndex(0);
  };

  const handleNext = () => {
    const nextIndex = (activeImageIndex + 1) % displayImages.length;
    setActiveImageIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeImageIndex === 0 ? displayImages.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.offsetWidth;

    const index = Math.round(scrollLeft / width);
    setActiveImageIndex(index);
  };

  const discountPercent =
    product?.discountPrice && product?.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="px-4 relative lg:px-16 xl:px-32 2xl:px-64 py-4 sm:py-10 flex flex-col lg:flex-row gap-4 sm:gap-16">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        {/* Mobile Gallery */}
        <div
          className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          ref={scrollContainerRef}
          onScroll={handleMobileScroll}
        >
          {displayImages.map((img, i) => (
            <div
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              className="min-w-full snap-center relative aspect-12/9 rounded-xl overflow-hidden"
              onClick={() => setActiveImageIndex(i)}
            >
              <Image
                src={img}
                alt={`${product.name} variant ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop Slider */}
        <div className="relative hidden lg:block w-full aspect-square rounded-xl overflow-hidden">
          {displayImages.length > 0 && (
            <Image
              src={displayImages[activeImageIndex]}
              alt={`${product.name} ${activeImageIndex + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          )}
          {displayImages.length > 1 && (
            <>
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
            </>
          )}
        </div>

        {/* Dots */}
        {displayImages.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {displayImages.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveImageIndex(i);
                  scrollToIndex(i);
                }}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  i === activeImageIndex ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="mt-4 flex gap-3 justify-start overflow-x-auto lg:justify-center lg:flex-wrap scrollbar-hide">
            {allImages.map((img, i) => (
              <div
                key={i}
                onClick={() => {
                  const indexInDisplay = displayImages.indexOf(img);
                  setActiveImageIndex(indexInDisplay !== -1 ? indexInDisplay : 0);
                  scrollToIndex(indexInDisplay !== -1 ? indexInDisplay : 0);
                }}
                className={`relative w-15 h-15 sm:w-20 sm:h-20 shrink-0 rounded-lg cursor-pointer border transition-opacity duration-200 ${
                  displayImages[activeImageIndex] === img
                    ? 'opacity-100 border-black'
                    : 'opacity-50'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="20vw"
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-2 sm:gap-4 w-full lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-500 sm:text-base text-sm">{product.miniDescription}</p>
        <div className="h-[2px] bg-gray-100" />

        {/* Price */}
        <div className="flex items-center gap-4">
          {product.discountPrice ? (
            <>
              <h3 className="text-md sm:text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </h3>
              <h3 className="flex items-center text-2xl sm:text-3xl font-semibold text-[#FB7009]">
                <span className="text-3xl sm:text-4xl">$</span>
                {product.discountPrice.toFixed(2)}
             
              </h3>
              <span className="bg-green-100 text-green-700 text-[12px] sm:text-sm font-medium px-1 py-1 rounded">
                {discountPercent}% OFF
              </span>
            </>
          ) : (
            <h3 className="text-2xl font-semibold text-[#FB7009]">
              ${product.price.toFixed(2)}
            </h3>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />

        {/* Stock & Color Selection */}
        <div className="flex flex-col gap-2">
          <span
            className={`font-medium text-sm ${
              product.inStock ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
          </span>

          {product.productColors && product.productColors.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm text-gray-700">Colors:</span>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`flex items-center gap-2 sm:px-3 px-1 pr-2 py-1 sm:py-2 rounded-full transition-all border ${
                    selectedColor === null
                      ? 'sm:ring-2 ring-1 ring-black bg-gray-100'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleColorClick(null)}
                >
                  <div className="sm:w-6 h-5 w-5 sm:h-6 rounded-full border bg-gradient-to-r from-gray-300 via-white to-gray-300" />
                  <span className="text-xs">All</span>
                </button>

                {product.productColors.map((colorOption, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center gap-2 px-1 pr-2 sm:px-3 py-1 sm:py-2 rounded-full transition-all border ${
                      selectedColor?.color === colorOption.color
                        ? 'ring-2 ring-black bg-gray-100'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleColorClick(colorOption)}
                  >
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: colorOption.color }}
                    />
                    <span className="text-sm">Color {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 capitalize">
          Category: {product.category}
        </p>

        <p className="text-md mb-16 sm:mb-0 text-gray-800 leading-relaxed">
          {product.description || 'No description provided.'}
        </p>

        <div className="mt-6 flex gap-8 fixed bottom-2 flex-row ">
          <button
            disabled={!product.inStock}
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              product.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
          <button
            disabled={!product.inStock}
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              product.inStock
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
