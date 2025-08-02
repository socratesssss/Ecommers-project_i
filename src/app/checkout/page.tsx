"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import Image from "next/image";
import AddressForm, { AddressFormHandle } from "@/app/components/Delibary";
import Link from "next/link";
import Locations from "../../data/AddressData";
import { FiCheckCircle, FiTruck, FiCreditCard, FiAlertCircle } from "react-icons/fi";
import OrderPageSkeleton from "./Skeleton";  // Import the skeleton component

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
 const port  = process.env.NEXT_PUBLIC_API_BASE_URL;

  const dispatch = useDispatch();
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [productsDB, setProductsDB] = useState<ApiFetchedProduct[]>([]);
  const addressFormRef = useRef<AddressFormHandle>(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(true); // Add loading state
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

  // Calculate delivery cost when location fields change
  // useEffect(() => {
  //   const calculateDeliveryCost = () => {
  //     const { division, city, area } = addressForm;
  //     if (division && city && area) {
  //       const cost = Locations?.Bangladesh?.[division]?.[city]?.[area]?.deliveryCost;
  //       if (cost !== undefined) {
  //         setAddressForm(prev => ({
  //           ...prev,
  //           deliveryCost: cost
  //         }));
  //       }
  //     }
  //   };
    
  //   calculateDeliveryCost();
  // }, [addressForm.division, addressForm.city, addressForm.area,addressForm]);

  useEffect(() => {
  if (addressForm.division && addressForm.city && addressForm.area) {
    const cost = Locations?.Bangladesh?.[addressForm.division]?.[addressForm.city]?.[addressForm.area]?.deliveryCost;
    if (cost !== undefined && cost !== addressForm.deliveryCost) {
      setAddressForm(prev => ({
        ...prev,
        deliveryCost: cost
      }));
    }
  }
}, [addressForm.deliveryCost,addressForm.division, addressForm.city, addressForm.area]);

  // Load checkoutItems from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("checkoutItems");
    if (stored) {
      setCheckoutItems(JSON.parse(stored));
    }
  }, [ port]);

  // Load product data from DB
  useEffect(() => {
    setLoading(true);
    fetch(`${port}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        setProductsDB(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [ port]);

  // Show skeleton while loading
  if (loading) {
    return <OrderPageSkeleton />;
  }

  // Rest of your component remains the same...
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
        alert(`❌ ${unavailable.name} is out of stock. Please remove it from your cart to proceed.`);
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
      alert("⚠️ Something went wrong while processing your order. Please try again.");
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
      {/* ... rest of your component remains exactly the same ... */}
        <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Complete Your Order</h1>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <FiCheckCircle className="mr-1 text-green-500" /> 1. Review Items
                </span>
                <span className="mx-2">›</span>
                <span className="flex items-center font-medium text-blue-600">
                  <FiCheckCircle className="mr-1 text-blue-600" /> 2. Shipping & Payment
                </span>
                <span className="mx-2">›</span>
                <span className="flex items-center text-gray-400">
                  <FiCheckCircle className="mr-1" /> 3. Confirmation
                </span>
              </div>
            </div>
      
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Summary */}
              <section className="p-6 rounded-lg border border-gray-200 bg-white">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 flex items-center">
                  <FiTruck className="mr-2 text-blue-500" />
                  Order Summary
                </h2>
                
                {checkoutItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <Link href="/" className="text-blue-600 hover:underline">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {checkoutItems.map((item) => {
                      const product = productsDB.find((p) => p._id === item._id);
                      const inStock = product?.inStock ?? true;
                      
                      return (
                        <div key={item._id} className="border-b pb-4 space-y-2">
                          {!inStock && (
                            <div className="flex items-center bg-red-50 text-red-600 p-2 rounded mb-2">
                              <FiAlertCircle className="mr-2" />
                              <span className="text-sm">This item is currently out of stock</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Image
                                src={item.selectedImage || item.imageUrl}
                                alt={item.productName.original}
                                width={80}
                                height={80}
                                className="rounded-md object-cover border border-gray-200"
                              />
                              {!inStock && (
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{item.productName.original}</h3>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              {item.selectedColor && (
                                <p className="text-sm text-gray-600">
                                  Color: <span className="font-medium">{item.selectedColor}</span>
                                </p>
                              )}
                              <p className="text-sm mt-1">
                                Price: <span className="font-medium text-orange-500">
                                  ${item.price.amount.toFixed(2)} each
                                </span>
                              </p>
                            </div>
                            <p className="font-semibold text-orange-500">
                              ${(item.price.amount * item.quantity).toFixed(2)}
                            </p>
                          </div>
      
                          {/* Color Selection */}
                          {product?.productColors && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Available Colors:</p>
                              <div className="flex gap-3 flex-wrap">
                                {product.productColors.map((colorOption) => {
                                  const isSelected = item.selectedColor === colorOption.color;
                                  return (
                                    <div key={colorOption.color} className="text-center">
                                      <Image
                                        src={colorOption.images[0]}
                                        alt={colorOption.color}
                                        width={48}
                                        height={48}
                                        onClick={() =>
                                          handleColorSelect(item._id, colorOption.color, colorOption.images[0])
                                        }
                                        className={`rounded-md cursor-pointer transition duration-200 border-2 ${
                                          isSelected
                                            ? "border-blue-600 ring-2 ring-blue-300"
                                            : "border-gray-200 hover:border-gray-400"
                                        } ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      />
                                      <p className="text-xs mt-1 text-gray-600">{colorOption.color}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
      
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Delivery Cost:</span>
                        <span className="font-medium">${addressForm.deliveryCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-lg font-bold text-green-600">
                        <span>Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </section>
      
              {/* Address Form */}
              <div className="space-y-8">
                <AddressForm ref={addressFormRef} form={addressForm} setForm={setAddressForm} />
                
                {/* Payment Method */}
                <section className="p-6 rounded-lg border border-gray-200 bg-white">
                  <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <FiCreditCard className="mr-2 text-blue-500" />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "cod" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay in cash when your order is delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Confirm Button */}
                <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 -mx-6 px-6 shadow-sm">
                  <button
                    onClick={handleConfirm}
                    disabled={checkoutItems.length === 0 || loading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                      checkoutItems.length === 0 || loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Your Order...
                      </span>
                    ) : (
                      "Confirm Order"
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
      
            {/* Success Modal */}
            {showSuccess && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center animate-fade-in">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. We&apos;ve sent a confirmation email with your order details.
                  </p>
                  <div className="space-y-3">
                    <Link 
                      href="/orders" 
                      className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                    >
                      View Your Orders
                    </Link>
                    <Link 
                      href="/" 
                      className="block w-full px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md border border-gray-300 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default OrderPage;