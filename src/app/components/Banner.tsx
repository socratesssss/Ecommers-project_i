'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Banner = {
  imageUrl: string;
};

const LOCAL_BANNERS: Banner[] = [
  { imageUrl: "/placeholderimage.webp" },
  { imageUrl: "/placeholderimage.webp" },
  { imageUrl: "/placeholderimage.webp" },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (LOCAL_BANNERS.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === LOCAL_BANNERS.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setCurrentIndex((prev) =>
        prev === LOCAL_BANNERS.length - 1 ? 0 : prev + 1
      );
    } else if (deltaX < -50) {
      setCurrentIndex((prev) =>
        prev === 0 ? LOCAL_BANNERS.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="relative w-full mx-auto overflow-hidden" aria-label="Banner Carousel">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {LOCAL_BANNERS.map((banner, idx) => (
          <div
            key={idx}
            className="relative w-full flex-shrink-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            aria-hidden={currentIndex !== idx}
          >
            <Image
              src={banner.imageUrl}
              alt={`Banner slide ${idx + 1}`}
              fill
              className="w-full h-full object-cover"
              sizes="100vw"
              priority={idx === 0}
              quality={80}
            />
          </div>
        ))}
      </div>

      {/* Dotted navigation */}
      <nav
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2"
        aria-label="Select banner slide"
      >
        {LOCAL_BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            } transition-colors duration-300`}
            aria-current={currentIndex === idx}
            aria-label={`Go to slide ${idx + 1}`}
            type="button"
          />
        ))}
      </nav>
    </section>
  );
}
