'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CartModel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const cartRef = useRef<HTMLDivElement>(null);

  const cartItems = [
    {
      _id: '1',
      productName: { original: 'Vape Juice' },
      quantity: 2,
      price: { amount: 25 },
      imageUrl: 'https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp',
      availability: { status: 'In Stock' },
    },
    {
      _id: '2',
      productName: { original: 'Vape Pen' },
      quantity: 1,
      price: { amount: 40 },
      imageUrl: 'https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp',
      availability: { status: 'In Stock' },
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={cartRef}
      className="absolute p-4 w-96 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20"
    >
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>

          {/* Items List */}
          <div className="flex flex-col gap-6 max-h-80 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                <Image
                  src={item.imageUrl}
                  alt={item.productName.original}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />

                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.productName.original}</h3>
                      <div className="text-sm p-1 bg-gray-100 rounded-sm">
                        {item.quantity > 1 && (
                          <span className="text-green-500 mr-1">
                            {item.quantity} x
                          </span>
                        )}
                        ${item.price.amount}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.availability.status}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                    <span className="text-blue-500 cursor-pointer">Remove</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between font-semibold text-base mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between gap-4 text-sm">
              <button className="flex-1 rounded-md py-3 px-4 ring-1 ring-gray-300 hover:bg-gray-50">
                View Cart
              </button>
              <button className="flex-1 rounded-md py-3 px-4 bg-black text-white hover:bg-gray-800">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;
