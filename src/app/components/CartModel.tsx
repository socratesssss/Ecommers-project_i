"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, adjustQuantity } from "@/redux/cartSlice";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";

// Define your CartItem type
type CartItem = {
  _id: string;
  productName: { original: string };
  imageUrl: string;
  quantity: number;
  price: { amount: number };
  selectedColor?: string | null;
  selectedImage?: string;
};

const CartModel = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true); 
  const cartRef = useRef<HTMLDivElement>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price.amount * item.quantity,
    0
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQtyChange = (_id: string, type: "inc" | "dec") => {
    dispatch(adjustQuantity({ _id, quantity: type === "inc" ? 1 : -1 }));
  };

  const renderCartItem = (item: CartItem) => (
    <div
      className="flex gap-3 items-start border-b border-gray-200 pb-2 mb-2"
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
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleQtyChange(item._id, "inc")}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
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
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => dispatch(removeFromCart(item._id))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                dispatch(removeFromCart(item._id));
              }
            }}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div
      ref={cartRef}
      className="
        fixed top-0 left-0 z-50
        w-full h-[100lvh] p-4 bg-white overflow-auto
        md:absolute md:top-18 md:right-0 md:w-full md:max-w-md md:h-auto md:p-4 md:rounded-md md:shadow-lg
        lg:right-4 lg:left-auto
        flex flex-col gap-6
        transition-all
      "
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        aria-label="Close Cart"
      >
        <X size={24} />
      </button>

      <h2 className="text-xl font-semibold mt-8 md:mt-0">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 my-10">Cart is Empty</div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[60vh] md:max-h-80 overflow-y-auto pr-2">
          {cartItems.map(renderCartItem)}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between font-semibold text-base mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-sm">
            <Link
              href="/checkout"
              onClick={() =>
                localStorage.setItem("checkoutItems", JSON.stringify(cartItems))
              }
              className="flex-1 rounded-md py-3 px-4 bg-black text-white text-center hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModel;
