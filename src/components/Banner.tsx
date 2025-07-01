'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const images = [
  'https://www.vaporzonebd.com/admin_assats/slider_images/1726170721-Vapor-Zone.webp',
  'https://www.vaporzonebd.com/admin_assats/slider_images/1680163798-Vapor-Zone.webp',
  'https://www.vaporzonebd.com/admin_assats/slider_images/1680165428-Vapor-Zone.webp',
  // Add more if needed
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (deltaX < -50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden  my-3">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full flex-shrink-0 h-[200px] md:h-[400px] relative">
            <Image
              src={src}
              alt={`Slide ${idx}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={idx === 0} // load first image eagerly
            />
          </div>
        ))}
      </div>

      {/* Dotted Navigation */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            } transition-colors duration-300`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
