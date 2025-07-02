'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import SearchBox from './SearchBox';
import CartModel from './CartModel';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const [isCartOpen,setIsCartOpen] = useState(false);
  return (
   <div className='w-full bg-gray-200'>
     <nav className="container mx-auto  px-4 md:px-6 py-2  shadow-md flex justify-between items-center relative ">
      {/* Left side: Logo + Search (mobile) + Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center justify-center gap-7">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black whitespace-nowrap">
            <Image src="/logoo.png"   width={18}
      height={0}  alt="" />
          </Link>

           {/* Mobile Search Box */}
         <SearchBox className='md:hidden'/>
          </div>

        {/* Hamburger menu (mobile only) */}
        <button
          className="md:hidden text-gray-700 ml-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

   

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/location">Location</Link></li>
      </ul>

      {/* Right icons (desktop only) */}
      <div className="hidden md:flex  items-center space-x-6">
       <SearchBox/>
       <div className='relative'>
         <button aria-label="Cart" onClick={()=>setIsCartOpen((prev)=>!prev)}>
          <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
        </button>
        <div className='absolute -top-3 -right-3 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-sm flex items-center  justify-center '>2</div>
       </div>

       
      </div>
       {
          isCartOpen && <CartModel/> 
          
        }

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
            <li><Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link href="/location" onClick={() => setIsOpen(false)}>Location</Link></li>

            {/* Cart Icon (Mobile only) */}
            <li className="pt-2">
              <button aria-label="Cart">
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
   </div>
  );
}
