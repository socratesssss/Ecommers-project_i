// components/ProductCard.tsx
import {ShoppingCart} from 'lucide-react';
type ProductCardProps = {
  image: string;
  name: string;
  price: string;
};

export default function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <div className=" bg-white rounded-2xl shadow-md overflow-hidden  hover:shadow-lg transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-auto object-contain"
      />
      <div className="p-2 flex flex-col ">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-[#DC3545]">${price}</p>
        <button className="bg-blue-500 my-2 hover:bg-blue-700 text-sm text-white font-semibold py-1 px-2 rounded-full flex justify-center items-center gap-2">
 <ShoppingCart/> Add to cart
</button>
      </div>
    </div>
  );
}
