"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import AddressForm from "@/app/components/Delibary";
import { saveAs } from "file-saver";
import Link from "next/link";

// Types
export type OrderProduct = {
  _id: string | number;
  productName: { original: string };
  price: { amount: number };
  quantity: number;
  imageUrl: string;
  availability: { status: string };
};

export type DeliveryDetails = {
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
  const [quantity, setQuantity] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState<DeliveryDetails>(() => {
    const saved = localStorage.getItem("deliveryForm");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          phone: "",
          email: "",
          country: "UAE",
          emirate: "",
          city: "",
          district: "",
          road: "",
        };
  });
  useEffect(() => {
    localStorage.setItem("deliveryForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const fetchOrderProduct = async () => {
      const stored = localStorage.getItem("orderNowProduct");
      if (stored) {
        const parsed: OrderProduct = JSON.parse(stored);

        try {
          const res = await fetch(`/api/products/${parsed._id}`);
          if (!res.ok) throw new Error("Product not found");
          const data = await res.json();

          setProduct({
            ...parsed,
            price: { amount: data.discountPrice || data.price },
            availability: {
              status: data.inStock ? "In Stock" : "Out of Stock",
            },
            imageUrl: parsed.imageUrl || data.images?.[0] || "/placeholder.jpg",
          });
        } catch (error) {
          setProduct(parsed); // fallback
        }

        setQuantity(parsed.quantity || 1);
        setDeliveryCost(15);
      }
    };

    fetchOrderProduct();
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
      deliveryDetails: form,
      paymentMethod,
      deliveryCost,
      total: quantity * product.price.amount + deliveryCost,
      orderDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(fullOrder, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `order-now-${Date.now()}.json`);

    // ✅ Clear localStorage BEFORE clearing form
    localStorage.removeItem("deliveryForm");
    localStorage.removeItem("orderNowProduct");

    // Reset state
    setShowSuccess(true);
    setQuantity(1);
    setPaymentMethod("cod");

    setForm({
      name: "",
      phone: "",
      email: "",
      country: "UAE",
      emirate: "",
      city: "",
      district: "",
      road: "",
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <p className="p-8 text-center">No product selected.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-14 space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
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
            <h3 className="font-semibold text-lg">
              {product.productName.original}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Availability:{" "}
              <span
                className={
                  product.availability.status === "In Stock"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {product.availability.status}
              </span>
            </p>
            <p className="text-orange-500 font-bold text-xl mt-2">
              ${product.price.amount.toFixed(2)}
            </p>

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

            <p className="mt-4 text-md">
              Delivery Cost:{" "}
              <span className="font-semibold text-blue-600">
                ${deliveryCost.toFixed(2)}
              </span>
            </p>
            <p className="text-md font-semibold">
              Total: $
              {(product.price.amount * quantity + deliveryCost).toFixed(2)}
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <AddressForm form={form} setForm={setForm} />

          <section className="md:mt-10 mt-5 p-4 rounded-md shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4 text-center">
              Payment Method
            </h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm md:text-base">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center text-sm md:text-base gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={() => setPaymentMethod("bkash")}
                />
                Bkash / Nagad
              </label>
            </div>
          </section>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-6 md:py-3 px-3 py-1.5 items-center rounded-md transition"
        >
          Confirm Order
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Order Successful!
            </h2>
            <p className="text-gray-700">
              Your order has been placed and saved successfully.
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

export default OrderNowPage;
