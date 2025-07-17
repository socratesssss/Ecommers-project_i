'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';


type Banner = {
  _id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function Banner() {
    const port = 'http://localhost:4000'
  // banners is an array of strings (URLs)
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    // Fetch banners from API on mount
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${port}/api/banners`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Banner[] = await res.json();
        setBanners(data);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    // Auto-slide every 5 seconds if banners loaded
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setCurrentIndex((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    } else if (deltaX < -50) {
      setCurrentIndex((prev) =>
        prev === 0 ? banners.length - 1 : prev - 1
      );
    }
  };

  if (banners.length === 0) {
    return (
      // <div className="text-center p-6 text-gray-500" role="status" aria-live="polite">
      //   Loading banners...
      // </div>
      ''
    );
  }

  return (
    <section className="relative w-full mx-auto overflow-hidden" aria-label="Banner Carousel">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((src, idx) => (
          <div
            key={idx}
            className="   relative  w-full flex-shrink-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            aria-hidden={currentIndex !== idx}
          >
            <Image
              src={src.imageUrl}
              alt={`Banner slide ${idx + 1}`}
              fill
              className="w-full h-full  object-cover relative z-10"
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
        {banners.map((_, idx) => (
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
