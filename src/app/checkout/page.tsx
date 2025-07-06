'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';
import Image from 'next/image';
import AddressForm from '@/components/Delibary';
import { saveAs } from 'file-saver';
import Link from 'next/link';
// db
const DELIVERY_COST = 60;

const OrderPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );
  const grandTotal = subtotal + DELIVERY_COST;

  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'UAE',
    emirate: '',
    city: '',
    district: '',
    road: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    const orderData = {
      products: cartItems.map((item) => ({
        id: item._id,
        name: item.productName.original,
        image: item.imageUrl,
        quantity: item.quantity,
        pricePerUnit: item.price.amount,
        total: item.price.amount * item.quantity,
      })),
      address: addressForm,
      deliveryCost: DELIVERY_COST,
      subtotal,
      total: grandTotal,
      paymentMethod,
      orderDate: new Date().toISOString(),
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [...existingOrders, orderData];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Save as file
    const blob = new Blob([JSON.stringify(orderData, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, `order-${Date.now()}.json`);

    // Clear cart and show modal
    dispatch(clearCart());
    setShowSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Summary */}
        <section className="p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-4">🛒 Product Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName.original}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.productName.original}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-orange-500">
                    ${(item.price.amount * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
              <div className="text-right text-sm text-gray-700">
                Delivery Cost: ${DELIVERY_COST.toFixed(2)}
              </div>
              <div className="text-right font-bold text-lg text-green-600">
                Grand Total: ${grandTotal.toFixed(2)}
              </div>
            </div>
          )}
        </section>

        {/* Address Form */}
        <AddressForm form={addressForm} setForm={setAddressForm} />
      </div>

      {/* Payment Method */}
      <section className="mt-10 border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4"> Payment Method</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bkash"
              checked={paymentMethod === 'bkash'}
              onChange={() => setPaymentMethod('bkash')}
            />
            Bkash / Nagad
          </label>
        </div>
      </section>

      {/* Confirm Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
           Confirm Order
        </button>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Order Successful!</h2>
            <p className="text-gray-700">
              Your order has been placed and saved to your device.
            </p>
            <Link
              href="/"
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Close
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
