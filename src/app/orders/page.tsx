
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type OrderItem = {
  image: string;
  name: string;
  quantity: number;
  total: number;
};

type Order = {
  orderDate: string;
  products: OrderItem[];
  deliveryCost: number;
  total: number;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  if (orders.length === 0) {
    return <p className="text-center py-10">No orders found.</p>;
  }

  return (
    <div className="max-w-5xl  p-4 space-y-8  md:pt-16 ">
      <h1 className="text-2xl font-bold mb-4 text-center">My Orders</h1>

      {orders.map((order, index) => (
        <section
          key={index}
          className="   bg-white border-y border-gray-200 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-700">
           {new Date(order.orderDate).toLocaleString('en-US', {
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})}
          </h2>

          {order.products?.map((item: OrderItem, idx: number) => (
            <div key={idx} className="flex items-center gap-4 border-b pb-2">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-orange-500">
                ${item.total.toFixed(2)}
              </p>
            </div>
          ))}

          <div className="text-right text-sm text-gray-700">
            Delivery Cost: ${order.deliveryCost.toFixed(2)}
          </div>
          <div className="text-right font-bold text-green-600">
            Total: ${order.total.toFixed(2)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default OrdersPage;

