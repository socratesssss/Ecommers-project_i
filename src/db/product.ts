// data/products.ts

export type Product = {
  id: number;
  name: string;
  price:number;
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
    price:20,
    category: "vape",
    images: ["/vape1.jpg", "/vape2.webp"],
    inStock: true,
    miniDescription: "Compact, powerful, beginner-friendly vape.",
    description:
      "The Storm X200 delivers smooth hits with adjustable wattage, long battery life, and leak-proof technology. Perfect for both beginners and seasoned users.",
  },
  {
    id: 2,
    name: "Menthol Chill Liquid",
     price:40,
    category: "liquid",
    images: ["/vape3.jpg","/vape10.jpg"],
    inStock: true,
    miniDescription: "Refreshing menthol flavor for icy hits.",
   
  },
  {
    id: 3,
    name: "Berry Mix Flavor Pods",
     price:30,
    category: "flavor",
    images: ["/vape4.webp", "/vape9.jpg","/flavors/flavor1b.jpg"],
    inStock: false,
    miniDescription: "Sweet and tangy mix of wild berries.",
    description:
      "Our Berry Mix pods bring the flavor of ripe strawberries, raspberries, and blueberries in one powerful puff. Compatible with most major pod systems.",
  },
  {
    id: 4,
    name: "Liquid Gold Tobacco",
     price:50,
    category: "liquid",
    images: ["/vape5.webp","/vape10.jpg"],
    inStock: true,
    miniDescription: "Smooth, rich tobacco blend.",
    description:
      "For those who love the classic tobacco taste. Liquid Gold delivers a premium, satisfying vape with every draw.",
  },
  {
    id: 5,
    name: "Vape Cloud King",
     price:30,
    category: "vape",
    images: ["/vap6.jpg","/vape1.jpg", "/vapes/vape2b.jpg", "/vapes/vape2c.jpg"],
    inStock: false,
    miniDescription: "High-wattage device for cloud chasers.",
    description:
      "Built for performance, the Cloud King boasts a dual battery system, 200W max output, and customizable airflow. Ideal for large cloud production.",
  },
  {
    id: 6,
    name: "Watermelon Ice Pods",
     price:20,
    category: "flavor",
    images: ["/vape7.avif ","/vape3.jpg", "/flavors/flavor2.jpg"],
    inStock: true,
    miniDescription: "Juicy watermelon with icy menthol.",
    description:
      "Perfect for summer, these pods give you a sweet and frosty inhale with every puff. Great for cooling off and refreshing your palette.",
  },
  {
    id: 7,
    name: "Citrus Splash Liquid",
     price:20,
    category: "liquid",
    images: [ "/vape8.jpg","/vape1.jpg", "/liquids/liquid3.jpg", "/liquids/liquid3b.jpg"],
    inStock: false,
    miniDescription: "Zesty lemon and lime with a fizzy twist.",
    description:
      "Tart, sweet, and fizzy — this liquid is a citrus lover’s dream. Enhanced with a soda-like sparkle for a unique vaping experience.",
  },
  {
    id: 8,
    name: "Flavor Pack: Tropic Thunder",
     price:20,
    category: "flavor",
    images: ["/vape9.jpg","/vape3.jpg", "/flavors/flavor3.jpg", "/flavors/flavor3b.jpg", "/flavors/flavor3c.jpg"],
    inStock: true,
    miniDescription: "Tropical fruits explosion.",
    description:
      "Pineapple, mango, and coconut blended into one exotic flavor pod. Take your taste buds on a vacation!",
  },
  {
    id: 9,
    name: "Stealth Vape Mini",
     price:20,
    category: "vape",
    images: ["/vape10.jpg","/vape9.jpg", "/vapes/vape3.jpg"],
    inStock: true,
    miniDescription: "Ultra-portable vape device with fast charging.",
    description:
      "Designed for discretion and ease of use, the Stealth Mini is perfect for on-the-go vapers. Fast USB-C charging and long battery life.",
  },
  {
    id: 10,
    name: "Cool Mint Liquid",
     price:20,
    category: "liquid",
    images: [
         "/vape8.jpg",
   "/vape1.jpg",
      "/liquids/liquid4b.jpg",
      "/liquids/liquid4c.jpg",
      "/liquids/liquid4d.jpg",
    ],
    inStock: true,
    miniDescription: "Classic cool mint, smooth and clean.",
    description:
      "Chill your senses with our Cool Mint e-liquid. Blended for a consistent, refreshing experience in every draw.",
  },
];
