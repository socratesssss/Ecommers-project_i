"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type OrderItem = {
  image: string;
  name: string;
  quantity: number;
  total: number;
};

type Order = {
  orderId: string;
  orderDate: string;
  products: OrderItem[];
  deliveryCost: number;
  total: number;
  status: "pending" | "delivered" | "canceled";
};

const OrderSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 mx-auto animate-pulse"></div>

      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 shadow-sm rounded-md p-4 space-y-4 animate-pulse"
        >
          {/* Order Header Skeleton */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-48 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>

          {/* Order Items Skeleton */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b pb-2">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}

          {/* Footer Skeleton */}
          <div className="text-right">
            <div className="h-4 w-32 bg-gray-200 rounded inline-block"></div>
          </div>
          <div className="text-right">
            <div className="h-5 w-24 bg-gray-200 rounded inline-block"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage (or fallback demo data)
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // fallback demo data
      const demoOrders: Order[] = [
        {
          orderId: "1",
          orderDate: new Date().toISOString(),
          products: [
            {
              image: "/demo/product1.jpg",
              name: "Product One",
              quantity: 2,
              total: 40,
            },
            {
              image: "/demo/product2.jpg",
              name: "Product Two",
              quantity: 1,
              total: 25,
            },
          ],
          deliveryCost: 5,
          total: 70,
          status: "delivered",
        },
        {
          orderId: "2",
          orderDate: new Date().toISOString(),
          products: [
            {
              image: "/demo/product3.jpg",
              name: "Product Three",
              quantity: 1,
              total: 60,
            },
          ],
          deliveryCost: 0,
          total: 60,
          status: "pending",
        },
      ];

      setOrders(demoOrders);
      localStorage.setItem("orders", JSON.stringify(demoOrders));
    }

    setLoading(false);
  }, []);

  if (loading) return <OrderSkeleton />;

  if (orders.length === 0) {
    return <p className="text-center py-10">No orders found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Orders</h1>

      {orders.map((order) => (
        <section
          key={order.orderId}
          className="bg-white border border-gray-200 shadow-sm rounded-md p-4 space-y-4"
        >
          {/* Order Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status === "delivered"
                ? "Delivered"
                : order.status === "pending"
                ? "Pending"
                : "Canceled"}
            </span>
          </div>

          {/* Order Items */}
          {order.products.map((item, idx) => (
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

          {/* Footer */}
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
