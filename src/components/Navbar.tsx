'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBox from './SearchBox';
import CartModel from './CartModel';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (currentScrollY > lastScrollY.current && currentScrollY > 250) {
          setShow(false); // Hide on scroll down
        } else if (currentScrollY < lastScrollY.current && currentScrollY > 250) {
          setShow(true); // Show on scroll up
        }
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full bg-gray-200 relative md:fixed top-0 left-0 z-50 shadow transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="relative container mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
        {/* Logo and mobile search */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-7">
            <Link href="/" className="text-2xl font-bold text-black whitespace-nowrap">
              <Image src="/logoo.png" width={18} height={18} alt="Logo" />
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700 ml-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/orders">Orders</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/location">Location</Link></li>
        </ul>

        {/* Desktop right icons */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBox />
          <div className="relative">
            <AnimatePresence>
              <button aria-label="Cart" onClick={() => setIsCartOpen(prev => !prev)}>
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
              </button>
              {totalQuantity > 0 && (
                <motion.div
                  key={totalQuantity}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -top-3 -right-3 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-[11px] flex items-center justify-center font-medium"
                >
                  {totalQuantity}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cart modal */}
        {isCartOpen && <CartModel />}

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
            <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
              <li><Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link></li>
              <li><Link href="/orders" onClick={() => setIsOpen(false)}>Orders</Link></li>
              <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              <li><Link href="/location" onClick={() => setIsOpen(false)}>Location</Link></li>
              <li className="pt-2">
                <div className="relative">
                  <AnimatePresence>
                    <button
                      aria-label="Cart"
                      onClick={() => {
                        setIsOpen(false);
                        setIsCartOpen(prev => !prev);
                      }}
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
                    </button>
                    {totalQuantity > 0 && (
                      <motion.div
                        key={totalQuantity}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="absolute -top-3 left-3 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-[11px] flex items-center justify-center font-medium"
                      >
                        {totalQuantity}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
