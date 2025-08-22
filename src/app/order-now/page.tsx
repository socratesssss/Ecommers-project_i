"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Minus, Plus, Check, X } from "lucide-react";
import Link from "next/link";
import AddressForm from "../components/Delibary";
import { AddressFormHandle, DeliveryDetails } from "../components/Delibary";

import { USStates } from "../../data/AddressData";

type ProductColor = {
  color: string;
  images: string[];
  _id: string;
};

export type OrderProduct = {
  _id: string | number;
  productName: { original: string };
  price: { amount: number };
  quantity: number;
  imageUrl: string;
  inStock?: boolean;
  allColors?: ProductColor[];
};

const OrderNowPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [product, setProduct] = useState<OrderProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod">("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const addressFormRef = useRef<AddressFormHandle>(null);

  const [form, setForm] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    email: "",
    country: "USA",
    state: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    addressLine2: "",
    deliveryCost: 0,
  });

  // Load saved form & product
  useEffect(() => {
    const savedForm = localStorage.getItem("deliveryForm");
    if (savedForm) setForm(JSON.parse(savedForm));

    const storedProduct = localStorage.getItem("orderNowProduct");
    if (storedProduct) {
      const parsed: OrderProduct = JSON.parse(storedProduct);
      setProduct(parsed);
      setQuantity(parsed.quantity || 1);
      setSelectedImage(parsed.imageUrl);
    }

    setIsLoading(false);
  }, []);

  // Save form to localStorage
  useEffect(() => {
    localStorage.setItem("deliveryForm", JSON.stringify(form));
  }, [form]);

  // Update delivery cost based on state
  useEffect(() => {
    if (form.state) {
      const selectedState = USStates.find((s) => s.name === form.state);
      const cost = selectedState?.deliveryCost || 0;
      setDeliveryCost(cost);
      setForm((prev) => ({ ...prev, deliveryCost: cost }));
    } else {
      setDeliveryCost(0);
      setForm((prev) => ({ ...prev, deliveryCost: 0 }));
    }
  }, [form.state]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    if (!product) return;

    const isFormValid = addressFormRef.current?.validateForm();
    if (!isFormValid) return;

    setLoading(true);

    const validatedProduct = {
      _id: product._id,
      name: product.productName.original,
      image: selectedImage || product.imageUrl,
      quantity,
      selectedColor: selectedColor || "",
      pricePerUnit: product.price.amount,
      inStock: product.inStock === true,
    };

    if (!validatedProduct.inStock) {
      alert(`❌ ${validatedProduct.name} is out of stock.`);
      setLoading(false);
      return;
    }

    const subtotal = validatedProduct.pricePerUnit * validatedProduct.quantity;
    const total = subtotal + deliveryCost;

    const orderData = {
      products: [
        {
          ...validatedProduct,
          total: subtotal,
        },
      ],
      address: form,
      deliveryCost,
      subtotal,
      total,
      paymentMethod,
      orderDate: new Date().toISOString(),
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      orderDate: orderData.orderDate,
      products: orderData.products.map((p) => ({
        name: p.name,
        image: p.image,
        quantity: p.quantity,
        total: p.total,
      })),
      deliveryCost: orderData.deliveryCost,
      total: orderData.total,
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    localStorage.removeItem("orderNowProduct");

    setShowSuccess(true);
    setLoading(false);
  };



  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Product Selected</h2>
          <p className="text-gray-600 mb-6">Please select a product to proceed with your order.</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Order</h1>
          <p className="text-sm text-gray-600">Review your items and shipping details</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Product Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image src={selectedImage || product.imageUrl} alt={product.productName.original} width={500} height={500} className="w-full h-full object-cover" />
              </div>

              <div className="w-full sm:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.productName.original}</h2>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-orange-600">${product.price.amount.toFixed(2)}</span>
                  {product.inStock ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Out of Stock</span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1">
                    <button onClick={decreaseQuantity} className="text-gray-600 hover:text-gray-900 transition-colors" disabled={quantity <= 1}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button onClick={increaseQuantity} className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Color Variants */}
                {product.allColors && product.allColors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Select Color:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.allColors.map((color) => (
                        <button
                          key={color._id}
                          onClick={() => {
                            setSelectedImage(color.images[0]);
                            setSelectedColor(color.color);
                          }}
                          className={`p-1 border rounded-full ${selectedColor === color.color ? "ring-2 ring-offset-2 ring-orange-500" : "border-gray-300"}`}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image src={color.images[0] || "/placeholder.jpg"} alt={color.color} width={32} height={32} className="w-full h-full object-cover" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${(product.price.amount * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">${deliveryCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-orange-600">${(product.price.amount * quantity + deliveryCost).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-orange-500 cursor-pointer">
                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="h-4 w-4 text-orange-600 focus:ring-orange-500" />
                <div>
                  <span className="block font-medium">Cash on Delivery</span>
                  <span className="block text-sm text-gray-500">Pay when you receive your order</span>
                </div>
              </label>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <AddressForm form={form} setForm={setForm} ref={addressFormRef} />
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={loading || !product.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                loading || !product.inStock ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : `Confirm Order - $${(product.price.amount * quantity + deliveryCost).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your order has been confirmed and saved locally.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/orders" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">View Orders</Link>
              <Link href="/" className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderNowPage;
