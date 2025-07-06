'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import AddressForm from '@/components/Delibary';
import { saveAs } from 'file-saver';
import Link from 'next/link';

type OrderProduct = {
  _id: string;
  productName: { original: string };
  price: { amount: number };
  quantity: number;
  imageUrl: string;
  availability: { status: string };
};

type DeliveryDetails = {
  name: string;
  phone: string;
  email: string;
  country: string;
  emirate: string;
  city: string;
  district: string;
  road: string;
};

const OrderNowPage = () => {
  const [product, setProduct] = useState<OrderProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    email: '',
    country: 'UAE',
    emirate: '',
    city: '',
    district: '',
    road: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('orderNowProduct');
    if (stored) {
      const parsed: OrderProduct = JSON.parse(stored);
      setProduct(parsed);
      setQuantity(parsed.quantity || 1);
    }

    setTimeout(() => {
      setDeliveryCost(15);
    }, 300);
  }, []);

  const handleConfirm = () => {
    if (!product) return;

    const fullOrder = {
      product: {
        id: product._id,
        name: product.productName.original,
        image: product.imageUrl,
        price: product.price.amount,
        quantity,
        total: quantity * product.price.amount,
      },
      deliveryDetails,
      paymentMethod,
      deliveryCost,
      total: quantity * product.price.amount + deliveryCost,
      orderDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(fullOrder, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, `order-now-${Date.now()}.json`);

    setShowSuccess(true);
    setQuantity(1);
    setDeliveryDetails({
      name: '',
      phone: '',
      email: '',
      country: 'UAE',
      emirate: '',
      city: '',
      district: '',
      road: '',
    });
    setPaymentMethod('cod');
    localStorage.removeItem('orderNowProduct');
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <p className="p-8 text-center">No product selected.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-14  md:pt-22  space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Summary */}
        <section className="px-6 rounded-md shadow bg-white space-y-4">
          <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden">
            <Image
              src={product.imageUrl}
              alt="Product"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{product.productName.original}</h3>
            <p className="text-gray-500 text-sm mt-1">
              Availability:{' '}
              <span
                className={
                  product.availability.status === 'In Stock'
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {product.availability.status}
              </span>
            </p>
            <p className="text-orange-500 font-bold text-xl mt-2">
              ${product.price.amount.toFixed(2)}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Delivery + Total */}
            <p className="mt-4 text-md">
              Delivery Cost:{' '}
              <span className="font-semibold text-blue-600">
                ${deliveryCost.toFixed(2)}
              </span>
            </p>
            <p className="text-md font-semibold">
              Total: ${(product.price.amount * quantity + deliveryCost).toFixed(2)}
            </p>
          </div>
        </section>

        {/* Delivery and Payment */}
        <div className="space-y-6">
          {/* Delivery Info */}
          <AddressForm form={deliveryDetails} setForm={setDeliveryDetails} />

          {/* Payment */}
          <section className="border p-6 rounded-md shadow bg-white">
            <h2 className="text-2xl font-bold mb-4"> Payment Method</h2>
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
                Bkash/Nagad
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Confirm Order Button */}
      <div className="text-center">
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md text-lg font-semibold"
        >
          ✅ Confirm Order
        </button>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">🎉 Order Successful!</h2>
            <p className="text-gray-700">Your order has been placed and saved successfully.</p>
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

export default OrderNowPage;
