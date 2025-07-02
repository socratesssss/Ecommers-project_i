import React from "react";
import ProductCard from "@/components/Card";
import { products } from "@/db/product";

const ShopPage = () => {
  return (
    <div className="px-4 md:px-6 py-10 container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            images={item.images} // ✅ correct prop name and type
            name={item.name}
            inStock={item.inStock}
           discountPrice={item.discountPrice}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
