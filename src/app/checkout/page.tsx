// src/app/checkout/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import Image from "next/image";
import AddressForm from "@/app/components/Delibary";
import Link from "next/link";
import type { CartItem } from "../../redux/cartSlice";

const DELIVERY_COST = 60;

// --- Define the type for products fetched from your API ---
// Adjust these properties based on what your API actually returns for a product
type ApiFetchedProduct = {
  _id: string;
  price: number;
  discountPrice?: number; // Assuming discountPrice is optional
  inStock?: boolean; // Assuming inStock is optional and defaults to true if not present
  // Add any other properties your API returns that might be relevant
  // e.g., name: string; images: string[]; etc.
};
// ---------------------------------------------------------

const OrderPage = () => {
    const port = 'http://localhost:4000'
  const dispatch = useDispatch();

  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      setCheckoutItems(JSON.parse(stored));
    }
  }, []);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "UAE",
    emirate: "",
    city: "",
    district: "",
    road: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${port}/api/product`);
      if (!res.ok) throw new Error("Failed to fetch products");

      // --- Use the new type here ---
      const data: { products: ApiFetchedProduct[] } = await res.json();
      const latestProducts: ApiFetchedProduct[] = data.products;
      // -----------------------------

      const validatedItems = checkoutItems.map((item) => {
        // --- Use the new type for 'p' here ---
        const match = latestProducts.find((p: ApiFetchedProduct) => p._id === item._id);
        // ------------------------------------
        return {
          id: item._id,
          name: item.productName.original,
          image: item.imageUrl,
          quantity: item.quantity,
          pricePerUnit: match?.discountPrice || match?.price || item.price.amount,
          inStock: match?.inStock ?? true,
        };
      });

      const unavailable = validatedItems.find((item) => !item.inStock);
      if (unavailable) {
        alert(
          `❌ ${unavailable.name} is out of stock. Please update your cart.`
        );
        setLoading(false);
        return;
      }

      const subtotal = validatedItems.reduce(
        (acc, item) => acc + item.pricePerUnit * item.quantity,
        0
      );
      const total = subtotal + DELIVERY_COST;

      const orderData = {
        products: validatedItems.map((item) => ({
          ...item,
          total: item.pricePerUnit * item.quantity,
        })),
        address: addressForm,
        deliveryCost: DELIVERY_COST,
        subtotal,
        total,
        paymentMethod,
        orderDate: new Date().toISOString(),
      };

      const response = await fetch(`${port}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`❌ Failed to submit order: ${errorText}`);
      }

      dispatch(clearCart());
      localStorage.removeItem("checkoutItems");

      setShowSuccess(true);
    } catch (err) {
      alert("⚠️ Something went wrong. Please try again.");
      console.error("Order POST failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );
  const grandTotal = subtotal + DELIVERY_COST;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Summary */}
        <section className="p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-4 text-center">
            Product Summary
          </h2>
          {checkoutItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.productName.original}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.productName.original}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-orange-500">
                    ${(item.price.amount * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="text-right font-semibold">
                Subtotal: ${subtotal.toFixed(2)}
              </div>
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
      <section className="md:mt-10 mt-5 p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4 text-center"> Payment Method</h2>
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

      {/* Confirm Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleConfirm}
          disabled={checkoutItems.length === 0 || loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-6 md:py-3 px-3 py-1.5 items-center rounded-md transition"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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

export default OrderPage;