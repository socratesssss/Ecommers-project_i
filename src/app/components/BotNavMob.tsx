"use client";

import Link from "next/link";
import { House, Search, ShoppingCart, Truck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SearchBox from "./SearchBox";

const BotNavMob = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);



  return (
    <>
      {/* Bottom navigation */}
      <div className="md:hidden pt-20">
        <div className="fixed bottom-0 z-50 w-full bg-gray-100 border-t">
          <ul className="grid grid-cols-4 py-2 text-gray-800 font-medium">
            {/* Orders */}
            <li className="flex justify-center items-center">
              <Link href="/orders" className="flex flex-col items-center">
                <Truck />
                <p className="text-[10px]">Orders</p>
              </Link>
            </li>

            {/* Search */}
            <li className="flex justify-center items-center">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                aria-label="Open Search"
              >
                <Search />
              </button>
            </li>

            {/* Home */}
            <li className="flex justify-center items-center">
              <Link href="/">
                <House />
              </Link>
            </li>

            {/* Cart */}
            <li className="flex justify-center items-center">
              <Link href="/all-carts" className="relative" aria-label="Cart">
                <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-black" />
                <AnimatePresence>
                  {totalQuantity > 0 && (
                    <motion.div
                      key={totalQuantity}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute -top-2 -left-2 w-4 h-4 bg-[#F35C7A] rounded-full text-white text-[8px] flex items-center justify-center font-medium"
                    >
                      {totalQuantity}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-40 flex justify-center items-start bg-gray-900/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={searchRef}
              className="bg-white p-4 rounded-md shadow-lg w-full max-w-md relative z-50"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              
                 <SearchBox onSearch={(query) => console.log("User searched:", query)} />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
                aria-label="Close Search"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BotNavMob;
