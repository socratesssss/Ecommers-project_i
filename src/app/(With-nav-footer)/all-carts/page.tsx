"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { adjustQuantity, removeFromCart, CartItem } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const CartPage = () => {
  const port = process.env.NEXT_PUBLIC_API_BASE_URL;
  const cartItems = useSelector((state: RootState) => state.cart.items as CartItem[]);
  const dispatch = useDispatch();
  const router = useRouter();

  const [productStatusMap, setProductStatusMap] = useState<
    Record<string, { exists: boolean; inStock: boolean }>
  >({});
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );

  const handleQtyChange = (_id: string, type: "inc" | "dec") => {
    dispatch(adjustQuantity({ _id, quantity: type === "inc" ? 1 : -1 }));
  };

  const handleCheckout = () => {
    const availableItems = cartItems.filter((item) => {
      const status = productStatusMap[item._id];
      return status?.exists && status?.inStock;
    });

    if (availableItems.length === 0) {
      alert("❌ No available items to checkout.");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(availableItems));
    router.push("/checkout");
  };

  useEffect(() => {
    const fetchProductStatus = async () => {
      setLoadingStatus(true);
      const statusMap: Record<string, { exists: boolean; inStock: boolean }> = {};

      await Promise.all(
        cartItems.map(async (item) => {
          try {
            const res = await axios.get(`${port}/api/product/${item._id}`);
            statusMap[item._id] = {
              exists: true,
              inStock: res.data.inStock,
            };
          } catch (err) {
            statusMap[item._id] = {
              exists: false,
              inStock: false,
            };
            console.log(err)
          }
        })
      );

      setProductStatusMap(statusMap);
      setLoadingStatus(false);
    };

    if (cartItems.length > 0) {
      fetchProductStatus();
    } else {
      setLoadingStatus(false);
    }
  }, [cartItems, port]);

  const sortedCartItems = [...cartItems].sort((a, b) => {
    const statusA = productStatusMap[a._id];
    const statusB = productStatusMap[b._id];

    const getRank = (status?: { inStock: boolean; exists: boolean }) => {
      if (!status) return 2;
      if (!status.exists || !status.inStock) return 1;
      return 0;
    };

    return getRank(statusA) - getRank(statusB);
  });

  // Skeleton Loader Component
  const CartItemSkeleton = () => (
    <div className="flex gap-3 items-start border-b-1 border-gray-400 pb-4 animate-pulse">
      <div className="w-16 h-20 bg-gray-200 rounded-md flex-shrink-0"></div>
      <div className="flex flex-col justify-between w-full gap-2">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        {loadingStatus ? (
          Array.from({ length: cartItems.length || 3 }).map((_, index) => (
            <CartItemSkeleton key={`skeleton-${index}`} />
          ))
        ) : cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          sortedCartItems.map((item) => {
            const status = productStatusMap[item._id];

            return (
              <div
                className="flex gap-3 items-start border-b-1 border-gray-400 pb-4"
                key={item._id}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.productName.original}
                  width={72}
                  height={96}
                  className="object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {item.productName.original}
                      </h3>
                      {status && (
                        <span
                          className={`text-[12px] mt-1 inline-block ${
                            !status.exists
                              ? "text-red-500"
                              : !status.inStock
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {!status.exists
                            ? "Unavailable"
                            : !status.inStock
                            ? "Stock out"
                            : "Available"}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-[13px]">
                      (${item.price.amount})
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQtyChange(item._id, "dec")}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        disabled={
                          !status?.exists ||
                          !status?.inStock ||
                          item.quantity <= 1
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(item._id, "inc")}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        disabled={!status?.exists || !status?.inStock}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-sm p-1 bg-gray-100 rounded-sm text-right min-w-[70px]">
                      <div className="font-semibold">
                        ${(item.price.amount * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-blue-500 hover:underline"
                      disabled={loadingStatus}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {!loadingStatus && cartItems.length > 0 && (
          <>
            <div className="flex items-center justify-between font-semibold text-base mb-2">
              <span>Subtotal</span>
              <span className="ml-12">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Shipping and taxes calculated at checkout.
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-4 text-sm">
              <button
                onClick={handleCheckout}
                disabled={loadingStatus}
                className="flex-1 rounded-md py-3 px-4 bg-black text-white hover:bg-gray-800 text-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loadingStatus ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;