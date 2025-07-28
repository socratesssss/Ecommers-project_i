"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import Image from "next/image";
import AddressForm, { AddressFormHandle } from "@/app/components/Delibary";
import Link from "next/link";
import Locations from "../../data/AddressData";

export interface DeliveryDetails {
  name: string;
  phone: string;
  email: string;
  division: string;
  city: string;
  area: string;
  road: string;
  country: string;
  deliveryCost: number;
}

type ProductColor = {
  color: string;
  images: string[];
};

type ApiFetchedProduct = {
  _id: string;
  price: number;
  discountPrice?: number;
  inStock?: boolean;
  name: string;
  productColors: ProductColor[];
};

type CartItem = {
  _id: string;
  productName: { original: string };
  imageUrl: string;
  quantity: number;
  price: { amount: number };
  selectedColor?: string;
  selectedImage?: string;
};

const OrderPage = () => {
  const port = "http://localhost:4000";
  const dispatch = useDispatch();
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [productsDB, setProductsDB] = useState<ApiFetchedProduct[]>([]);
  const addressFormRef = useRef<AddressFormHandle>(null);

  const [addressForm, setAddressForm] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    email: '',
    division: '',
    city: '',
    area: '',
    road: '',
    country: 'Bangladesh',
    deliveryCost: 0
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate delivery cost when location fields change
  useEffect(() => {
    const calculateDeliveryCost = () => {
      const { division, city, area } = addressForm;
      if (division && city && area) {
        const cost = Locations?.Bangladesh?.[division]?.[city]?.[area]?.deliveryCost;
        if (cost !== undefined) {
          setAddressForm(prev => ({
            ...prev,
            deliveryCost: cost
          }));
        }
      }
    };
    
    calculateDeliveryCost();
  }, [addressForm.division, addressForm.city, addressForm.area]);

  // Load checkoutItems from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      setCheckoutItems(JSON.parse(stored));
    }
  }, []);

  // Load product data from DB
  useEffect(() => {
    fetch(`${port}/api/product`)
      .then((res) => res.json())
      .then((data) => setProductsDB(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleColorSelect = (productId: string, color: string, image: string) => {
    const updated = checkoutItems.map((item) =>
      item._id === productId
        ? { ...item, selectedColor: color, selectedImage: image }
        : item
    );
    setCheckoutItems(updated);
    localStorage.setItem("checkoutItems", JSON.stringify(updated));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const isValid = addressFormRef.current?.validateForm();
      if (!isValid) {
        setLoading(false);
        return;
      }

      const validatedItems = checkoutItems.map((item) => {
        const match = productsDB.find((p) => p._id === item._id);
        return {
          _id: item._id,
          name: item.productName.original,
          image: item.selectedImage || item.imageUrl,
          quantity: item.quantity,
          selectedColor: item.selectedColor || "",
          pricePerUnit: match?.discountPrice || match?.price || item.price.amount,
          inStock: match?.inStock ?? true,
        };
      });

      const unavailable = validatedItems.find((item) => !item.inStock);
      if (unavailable) {
        alert(`❌ ${unavailable.name} is out of stock.`);
        setLoading(false);
        return;
      }

      const subtotal = validatedItems.reduce(
        (acc, item) => acc + item.pricePerUnit * item.quantity,
        0
      );
      const total = subtotal + addressForm.deliveryCost;

      const orderData = {
        products: validatedItems.map((item) => ({
          ...item,
          total: item.pricePerUnit * item.quantity,
        })),
        address: addressForm,
        deliveryCost: addressForm.deliveryCost,
        subtotal,
        total,
        paymentMethod,
        orderDate: new Date().toISOString(),
      };

      const response = await fetch(`${port}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order");

      dispatch(clearCart());
      localStorage.removeItem("checkoutItems");

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...existingOrders,
          {
            orderDate: orderData.orderDate,
            products: orderData.products.map((p) => ({
              name: p.name,
              image: p.image,
              quantity: p.quantity,
              total: p.total,
            })),
            deliveryCost: orderData.deliveryCost,
            total: orderData.total,
          },
        ])
      );

      setShowSuccess(true);
    } catch (err) {
      alert("⚠️ Something went wrong.");
      console.error("Order failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );
  const grandTotal = subtotal + addressForm.deliveryCost;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Summary */}
        <section className="p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-4 text-center">Product Summary</h2>
          {checkoutItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {checkoutItems.map((item) => {
                const product = productsDB.find((p) => p._id === item._id);
                return (
                  <div key={item._id} className="border-b pb-4 space-y-2">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.selectedImage || item.imageUrl}
                        alt={item.productName.original}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.productName.original}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        {item.selectedColor && (
                          <p className="text-sm text-gray-600">
                            Selected Color: {item.selectedColor}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-orange-500">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Color Selection */}
                    {product?.productColors && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <p>Select one</p>
                        {product.productColors.map((colorOption) => {
                          const isSelected = item.selectedColor === colorOption.color;
                          return (
                            <div key={colorOption.color} className="text-center">
                              <Image
                                src={colorOption.images[0]}
                                alt={colorOption.color}
                                width={40}
                                height={40}
                                onClick={() =>
                                  handleColorSelect(item._id, colorOption.color, colorOption.images[0])
                                }
                                className={`rounded-md cursor-pointer transition duration-200 border-2 ${
                                  isSelected
                                    ? "border-blue-600 ring-2 ring-blue-300"
                                    : "border-gray-300 hover:border-gray-500"
                                }`}
                              />
                              <p className="text-xs mt-1">{colorOption.color}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
              <div className="text-right text-sm text-gray-700">
                Delivery Cost: ${addressForm.deliveryCost.toFixed(2)}
              </div>
              <div className="text-right font-bold text-lg text-green-600">
                Grand Total: ${grandTotal.toFixed(2)}
              </div>
            </div>
          )}
        </section>

        {/* Address Form */}
        <AddressForm ref={addressFormRef} form={addressForm} setForm={setAddressForm} />
      </div>

      {/* Payment Method */}
      <section className="md:mt-10 mt-5 p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Payment Method</h2>
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
        </div>
      </section>

      {/* Confirm Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleConfirm}
          disabled={checkoutItems.length === 0 || loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-6 md:py-3 px-3 py-1.5 rounded-md transition"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">🎉 Order Successful!</h2>
            <p className="text-gray-700">Your order has been placed successfully.</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Close
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;