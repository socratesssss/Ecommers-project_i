"use client";

import React, { useEffect, useState ,useRef} from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import AddressForm from "@/app/components/Delibary";
import Locations from "../../data/AddressData";
import Link from "next/link";
import { AddressFormHandle } from "@/app/components/Delibary";

// Types
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

export interface DeliveryDetails {
  name: string;
  phone: string;
  email: string;
  country: string;
  division: string;
  city: string;
  area: string;
  road: string;
  deliveryCost: number;
}

const OrderNowPage = () => {
  const port = 'http://localhost:4000'
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [product, setProduct] = useState<OrderProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const addressFormRef = useRef<AddressFormHandle>(null);

  const [form, setForm] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    email: "",
    country: "Bangladesh",
    division: "",
    city: "",
    area: "",
    road: "",
    deliveryCost: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("deliveryForm");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("deliveryForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const fetchOrderProduct = async () => {
      const stored = localStorage.getItem("orderNowProduct");
      if (stored) {
        const parsed: OrderProduct = JSON.parse(stored);

        try {
          const res = await fetch(`${port}/api/products/${parsed._id}`);
          if (!res.ok) throw new Error("Product not found");
          const data = await res.json();

setProduct({
  ...parsed,
  price: { amount: data.discountPrice || data.price },
  inStock: data.inStock,  // <-- ADD THIS LINE
  imageUrl: parsed.imageUrl || data.images?.[0] || "/placeholder.jpg",
  allColors: data.productColors || [],
});


        } catch (error) {
          setProduct(parsed);
          console.log(error)
        }

        setQuantity(parsed.quantity || 1);
      }
    };

    fetchOrderProduct();
  }, []);

useEffect(() => {
  const { country, division, city, area } = form;
  if (country && division && city && area) {
    const cost =
      Locations?.[country]?.[division]?.[city]?.[area]?.deliveryCost;
    if (cost !== undefined && cost !== form.deliveryCost) {
      setDeliveryCost(cost);
      setForm((prev) => ({ ...prev, deliveryCost: cost }));
    }
  }
}, [form]);


  useEffect(() => {
  if (product && !selectedImage) {
    setSelectedImage(product.imageUrl);
  }
}, [product, selectedImage]);


  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   const validateForm = (formData: any) => {
//   const errors: any = {};

// if (!formData.road || formData.road.trim().length < 3) {
//   errors.road = "Road is required.";
// }
// if (!formData.area) {
//   errors.area = "Area is required.";
// }
// if (!formData.city) {
//   errors.city = "City is required.";
// }
// if (!formData.division) {
//   errors.division = "Division is required.";
// }


//   // Add any other fields like area, city, etc.
//   return errors;
// };


const handleConfirm = async () => {
  if (!product) return;

  // ✅ Call the validation method from AddressForm
  const isFormValid = addressFormRef.current?.validateForm();
  if (!isFormValid) {
    setLoading(false);
    return;
  }

  setLoading(true);
  try {
    const validatedProduct = {
      _id: product._id,
      name: product.productName.original,
      image: selectedImage || product.imageUrl,
      quantity: quantity,
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

    const response = await fetch(`http://localhost:4000/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error("Order failed");

    localStorage.removeItem("orderNowProduct");

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
    setShowSuccess(true);
  } catch (err) {
    console.error("Order failed:", err);
    alert("⚠️ Failed to place the order.");
  } finally {
    setLoading(false);
  }
};


  if (!product) return <p className="p-8 text-center">No product selected.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-14 space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="px-6 rounded-md shadow bg-white space-y-4">
          <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden">
            <Image
              src={selectedImage || product.imageUrl}
              alt="Product"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <h3 className="font-semibold text-lg">{product.productName.original}</h3>

          <p className="text-orange-500 font-bold text-xl mt-2">
            ${product.price.amount.toFixed(2)}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Plus size={16} />
            </button>
          </div>

          {product.allColors && product.allColors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <p>Select one</p>
              {product.allColors.flatMap((color) =>
                color.images.map((image) => (
                  <button
                    key={image}
                    onClick={() => {
                      setSelectedImage(image);
                      setSelectedColor(color.color);
                    }}
                    className={`p border rounded ${
                      selectedImage === image
                        ? "ring-2 ring-gray-800"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.jpg"}
                      alt={color.color}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </button>
                ))
              )}
            </div>
          )}

          <p className="mt-4 text-md">
            Delivery Cost:{" "}
            <span className="font-semibold text-blue-600">
              ${deliveryCost.toFixed(2)}
            </span>
          </p>
          <p className="text-md font-semibold">
            Total: ${((product.price.amount * quantity) + deliveryCost).toFixed(2)}
          </p>
        </section>

        <div className="space-y-6">
          <AddressForm form={form} setForm={setForm}  ref={addressFormRef}  />

          <section className="p-4 rounded-md shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4 text-center">Payment Method</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
           
            </div>
          </section>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Order Successful!
            </h2>
            <p className="text-gray-700">
              Your order has been placed and saved successfully.
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
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
