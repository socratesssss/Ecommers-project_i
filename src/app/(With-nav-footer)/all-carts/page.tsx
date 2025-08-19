"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { adjustQuantity, removeFromCart, CartItem } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items as CartItem[]);
  const dispatch = useDispatch();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );

  const handleQtyChange = (_id: string, type: "inc" | "dec") => {
    dispatch(adjustQuantity({ _id, quantity: type === "inc" ? 1 : -1 }));
  };

  const handleCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    router.push("/checkout");
  };



  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
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
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item._id, "inc")}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
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
                className="flex-1 rounded-md py-3 px-4 bg-black text-white hover:bg-gray-800 text-center transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
