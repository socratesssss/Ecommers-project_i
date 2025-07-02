// data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  discountPrice?: number; // % discount (optional)
  category: "vape" | "liquid" | "flavor";
  images: string[];
  inStock: boolean;
  miniDescription: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Vape Storm X200",
    price: 20,
    discountPrice: 18,
    category: "vape",
    images: ["/vape1.jpg", "/vape2.webp"],
    inStock: true,
    miniDescription: "Compact, powerful, beginner-friendly vape.",
    description:
      "The Storm X200 delivers smooth hits with adjustable wattage, long battery life, and leak-proof technology.",
  },
  {
    id: 2,
    name: "Menthol Chill Liquid",
    price: 40,
    discountPrice: 38,
    category: "liquid",
    images: ["/vape3.jpg", "/vape10.jpg"],
    inStock: true,
    miniDescription: "Refreshing menthol flavor for icy hits.",
  },
  {
    id: 3,
    name: "Berry Mix Flavor Pods",
    price: 30,
    category: "flavor",
    images: ["/vape4.webp", "/vape9.jpg", "/flavors/flavor1b.jpg"],
    inStock: false,
    miniDescription: "Sweet and tangy mix of wild berries.",
    description:
      "Our Berry Mix pods bring the flavor of ripe strawberries, raspberries, and blueberries in one puff.",
  },
  {
    id: 4,
    name: "Liquid Gold Tobacco",
    price: 50,
    category: "liquid",
    images: ["/vape5.webp", "/vape10.jpg"],
    inStock: true,
    miniDescription: "Smooth, rich tobacco blend.",
    description: "Liquid Gold delivers a premium, satisfying vape with every draw.",
  },
  {
    id: 5,
    name: "Vape Cloud King",
    price: 30,
    discountPrice: 27,
    category: "vape",
    images: ["/vap6.jpg", "/vape1.jpg"],
    inStock: false,
    miniDescription: "High-wattage device for cloud chasers.",
    description: "The Cloud King boasts a dual battery system, 200W output, and airflow control.",
  },
  {
    id: 6,
    name: "Watermelon Ice Pods",
    price: 20,
    category: "flavor",
    images: ["/vape7.avif", "/vape3.jpg"],
    inStock: true,
    miniDescription: "Juicy watermelon with icy menthol.",
  },
  {
    id: 7,
    name: "Citrus Splash Liquid",
    price: 20,
    discountPrice: 15,
    category: "liquid",
    images: ["/vape8.jpg", "/vape1.jpg"],
    inStock: false,
    miniDescription: "Zesty lemon and lime with a fizzy twist.",
  },
  {
    id: 8,
    name: "Flavor Pack: Tropic Thunder",
    price: 20,
    category: "flavor",
    images: ["/vape9.jpg", "/vape3.jpg"],
    inStock: true,
    miniDescription: "Tropical fruits explosion.",
  },
  {
    id: 9,
    name: "Stealth Vape Mini",
    price: 20,
    discountPrice: 19,
    category: "vape",
    images: ["/vape10.jpg", "/vape9.jpg"],
    inStock: true,
    miniDescription: "Ultra-portable vape device with fast charging.",
  },
  {
    id: 10,
    name: "Cool Mint Liquid",
    price: 20,
    category: "liquid",
    images: ["/vape8.jpg", "/vape1.jpg"],
    inStock: true,
    miniDescription: "Classic cool mint, smooth and clean.",
  },
];
