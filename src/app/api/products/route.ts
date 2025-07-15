import { NextRequest, NextResponse } from 'next/server';

export type ProductColor = {
  color: string;
  images: string[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  category: 'Vape' | 'Juice' | 'Pods';
  images: string[];
  inStock: boolean;
  miniDescription: string;
  description?: string;
  productColors?: ProductColor[];
};

// Fake DB (in-memory for demo)
let products: Product[] = [
  {
    id: 1,
    name: "Vape Storm X200",
    price: 20,
    discountPrice: 18,
    category: "Vape",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Compact, powerful vape with adjustable wattage, long battery life, and leak‑proof design.",
    description: "The Storm X200 delivers smooth, customizable hits...",
    productColors: [
      {
        color: "#f34534",
        images: ["/placeholderimage.webp", "/placeholderimage.webp"]
      },
      {
        color: "#13245f",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
   {
    id: 2,
    name: "Menthol Chill Liquid",
    price: 40,
    discountPrice: 38,
    category: "Vape",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Crisp, cooling menthol e‑liquid made with premium nicotine salts...",
    description: "Experience the ultimate chill with Menthol Chill Liquid          <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptatibus accusantium sed sapiente aliquam ab eos dolore est impedit. Optio praesentium deserunt aspernatur voluptatum nam, sint atque asperiores? Impedit ipsa ipsam, unde officia tempore soluta. Error, totam illo dolore asperiores officiis quas incidunt magnam nulla voluptatibus, commodi magni velit quam expedita saepe. Sequi commodi tempore odit ipsa eos. Maiores dolore qui consequuntur. Similique, beatae. Nisi consequatur magni rerum dolorem aperiam totam perferendis pariatur, ullam unde inventore magnam ab doloribus animi at non atque ad soluta quos illo ea distinctio culpa voluptate? Corporis aut illum eaque aspernatur quasi perspiciatis. Ipsum accusamus numquam veniam fugit corporis laboriosam voluptatem! Cupiditate quod porro voluptates obcaecati aliquid facilis ex blanditiis cumque, molestias reiciendis consequuntur modi culpa eligendi doloribus aliquam eum dolorum adipisci velit laudantium amet provident, enim at! Repudiandae, corporis et, natus dolore esse consequuntur saepe atque accusantium possimus sequi explicabo impedit inventore nisi vel? Temporibus enim sint labore odit dolore quis consequuntur distinctio. Placeat distinctio sunt vitae itaque ipsam soluta sit eius voluptate, ea, architecto fuga obcaecati. Natus fugiat inventore labore excepturi quod laboriosam. Fuga quo repudiandae praesentium atque autem odit voluptate nisi commodi tenetur ipsa enim consequatur, rem sed numquam eius dolor. Corporis!"
  },
  {
    id: 3,
    name: "Berry Mix Flavor Pods",
    price: 30,
    category: "Pods",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: false,
    miniDescription: "Sweet and tangy wild berries blend in a convenient, ready‑to‑use pod.",
    description: "Our Berry Mix Flavor Pods combine ripe strawberries...",
    productColors: [
      {
        color: "#D61C4E",
        images: ["/placeholderimage.webp","/placeholderimage.webp"]
      },
      {
        color: "#FFB200",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    id: 4,
    name: "Liquid Gold Tobacco",
    price: 50,
    category: "Vape",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Rich, smooth tobacco e‑liquid offering a classic, full‑bodied vaping experience.",
    description: "Liquid Gold Tobacco captures the essence of premium tobacco leaves..."
  },
  {
    id: 5,
    name: "Vape Cloud King",
    price: 30,
    discountPrice: 27,
    category: "Pods",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: false,
    miniDescription: "High‑wattage device with dual batteries, 200W max output, and adjustable airflow.",
    description: "Built for cloud chasers, the Vape Cloud King features..."
  },
  {
    id: 6,
    name: "Watermelon Ice Pods",
    price: 20,
    category: "Vape",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Juicy watermelon meets icy menthol in these convenient, refillable flavor pods.",
    description: "Watermelon Ice Pods offer the perfect summer vape...",
    productColors: [
      {
        color: "#CB1C8D",
        images: ["/placeholderimage.webp"]
      },
      {
        color: "#FFE5B4",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    id: 7,
    name: "Citrus Splash Liquid",
    price: 20,
    discountPrice: 15,
    category: "Juice",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: false,
    miniDescription: "Zesty lemon and lime blend with a hint of soda‑like sparkle.",
    description: "Citrus Splash Liquid combines bright lemon and lime notes..."
  },
  {
    id: 8,
    name: "Flavor Pack: Tropic Thunder",
    price: 20,
    category: "Pods",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Exotic pineapple, mango, and coconut blend for an island getaway in every puff.",
    description: "Taste the tropics with Tropic Thunder Flavor Pack...",
    productColors: [
      {
        color: "#FF914D",
        images: ["/placeholderimage.webp","/placeholderimage.webp"]
      },
      {
        color: "#A0E7E5",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    id: 9,
    name: "Stealth Vape Mini",
    price: 20,
    discountPrice: 19,
    category: "Vape",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Ultra‑portable vape with fast USB‑C charging and discreet design.",
    description: "The Stealth Vape Mini is designed for vapers on the move..."
  },
  {
    id: 10,
    name: "Cool Mint Liquid",
    price: 20,
    category: "Juice",
    images: ["/placeholderimage.webp", "/placeholderimage.webp", "/placeholderimage.webp"],
    inStock: true,
    miniDescription: "Classic cool mint e‑liquid for a crisp, refreshing vape experience.",
    description: "Chill out with Cool Mint Liquid...",
    productColors: [
      {
        color: "#00C897",
        images: ["/placeholderimage.webp"]
      },
      {
        color: "#9ADCFF",
        images: ["/placeholderimage.webp"]
      }
    ]
  }
];

// GET all products
export async function GET() {
  return NextResponse.json(products);
}

// POST a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newProduct: Product = {
      ...body,
      id: products.length + 1, // Simple auto-increment ID
    };

    products.push(newProduct);

    return NextResponse.json(
      { message: 'Product added successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
