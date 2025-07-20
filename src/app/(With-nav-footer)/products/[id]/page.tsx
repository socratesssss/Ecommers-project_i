'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id:  string;
  name: string;
  description?: string;
  miniDescription?: string;
  price: number;
  discountPrice?: number;
  category: string;
  inStock: boolean;
  images: string[];
  productColors?: ProductColor[];
};

const ProductPage = () => {
    const port = 'http://localhost:4000'

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;


  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${port}/api/product/${productId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch error: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    setSelectedColor(null);
    setActiveImageIndex(0);
  }, [product]);

  const getDisplayImages = () => {
    if (!product) return [];
    if (selectedColor?.images?.length)
      return selectedColor.images.map(img =>
        img.startsWith('http') ? img : `${port}}/uploads/${img}`
      );

    const base = product.images || [];
    const colors = product.productColors?.flatMap(c => c.images) || [];
    return [...base, ...colors].map(img =>
      img.startsWith('http') ? img : `${port}/uploads/${img}`
    );
  };

  const displayImages = getDisplayImages();

  const scrollToIndex = (index: number) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index]!.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };


const handleAdd = () => {
  if (!product) return;

dispatch(addToCart({
  _id: product._id,   // <-- Correct product ID here
  productName: { original: product.name },
  price: { amount: product.discountPrice || product.price },
  quantity: 1,
  imageUrl: selectedColor?.images?.[0] || product.images?.[0] || '/placeholder.jpg',
  inStock: product.inStock,
  selectedColor: selectedColor?.color || null,
  allColors: product.productColors || [],
}));



  setAnimate(true);
  setTimeout(() => setAnimate(false), 1000);
};

const handleOrderNow = () => {
  if (!product) return;

  const orderProduct = {
    _id: String(product._id),
    productName: { original: product.name },
    price: { amount: product.discountPrice || product.price },
    quantity: 1,
    imageUrl: selectedColor?.images?.[0] || product.images?.[0] || '/placeholder.jpg',
    inStock: product.inStock, // ✅ same here
    selectedColor: selectedColor?.color || null,
    allColors: product.productColors || [],
  };

  localStorage.setItem('orderNowProduct', JSON.stringify(orderProduct));
  router.push('/order-now');
};


  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveImageIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (activeImageIndex + 1) % displayImages.length;
    setActiveImageIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeImageIndex === 0 ? displayImages.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const handleColorClick = (color: ProductColor | null) => {
    setSelectedColor(color);
    setActiveImageIndex(0);
    scrollToIndex(0);
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

  // JSX below remains same — render using displayImages array
  return (
    <div className="px-4 py-10 md:flex gap-16">
      {/* Image gallery section here (use displayImages) */}
        <div className="lg:sticky md:w-1/2 h-max">
              {/* Mobile Image Gallery */}
              <div
                className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
                ref={scrollContainerRef}
                onScroll={handleMobileScroll}
              >
                {displayImages.map((img, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      imageRefs.current[i] = el ?? null;
                    }}
                    className="min-w-full snap-center relative aspect-12/9 rounded-xl overflow-hidden"
                    onClick={() => setActiveImageIndex(i)}
                  >
                    <Image src={img} alt={`Product ${i}`}  fill className="object-cover" />
                  </div>
                ))}
              </div>
      
              {/* Desktop Slider */}
              <div className="relative hidden lg:block w-full aspect-12/9 rounded-xl overflow-hidden">
                {displayImages[activeImageIndex] && (
                  <Image
                    src={displayImages[activeImageIndex]}
                    alt={`Product ${activeImageIndex}`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                )}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                  aria-label="Previous Image"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                  aria-label="Next Image"
                >
                  <ChevronRight />
                </button>
              </div>
      
              {/* Dots */}
              <div className="mt-4 flex justify-center gap-2">
                {displayImages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveImageIndex(i);
                      scrollToIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      i === activeImageIndex ? 'bg-black' : 'bg-gray-300'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to image ${i + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveImageIndex(i);
                        scrollToIndex(i);
                      }
                    }}
                  />
                ))}
              </div>
      
              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-hide">
                {displayImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveImageIndex(i);
                      scrollToIndex(i);
                    }}
                    className={`relative w-15 h-15 sm:w-20 sm:h-20 shrink-0 rounded-lg cursor-pointer border ${
                      i === activeImageIndex ? 'border-black' : 'opacity-50'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select thumbnail ${i + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveImageIndex(i);
                        scrollToIndex(i);
                      }
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${i}`}
                      fill
                      sizes="20vw"
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
      {/* Text & Add to cart / Order buttons */}
      <div className="flex md:w-1/2 flex-col gap-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-500 text-sm">{product.miniDescription}</p>
              <div className="h-[2px] bg-gray-100" />
      
              {/* Price Display */}
              <div className="flex items-center gap-4">
                {product.discountPrice ? (
                  <>
                    <h3 className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</h3>
                    <h3 className="text-3xl font-semibold text-[#FB7009]">
                      ${product.discountPrice.toFixed(2)}
                    </h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <h3 className="text-3xl font-semibold text-[#FB7009]">${product.price.toFixed(2)}</h3>
                )}
              </div>
              <div className="h-[2px] bg-gray-100" />
      
              {/* Stock Status */}
              <span
                className={`font-medium text-sm ${
                  product.inStock ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {product.inStock ? 'In Stock' : '❌ Out of Stock'}
              </span>
      
              {/* Color Selection */}
              {Array.isArray(product.productColors) && product.productColors.length > 0 && (
                <div>
                  <p className="text-sm text-gray-700">Colors:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => handleColorClick(null)}
                      className={`p-1 border rounded relative ${
                        selectedColor === null ? 'ring-1 ring-gray-700' : 'border-gray-300'
                      }`}
                      aria-label="Select all colors"
                    >
                      <Image
                        src={product.images?.[0] || '/placeholder.jpg'}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="h-full bg-gray-900/60 rounded top-0 left-0 flex justify-center items-center w-full absolute">
                        <h1 className="text-white font-semibold">All</h1>
                      </div>
                    </button>
                    {product.productColors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => handleColorClick(color)}
                        className={`p-2 border rounded ${
                          selectedColor?.color === color.color ? 'ring-1 ring-gray-700' : 'border-gray-300'
                        }`}
                        aria-label={`Select color ${color.color}`}
                      >
                        <Image
                          src={color.images[0] || '/placeholder.jpg'}
                          alt={`Color ${i + 1}`}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
      
              {/* Buttons */}
              <div className="fixed sm:static bottom-16 gap-3 flex pb-14gap-4">
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`md:px-6 px-3 py-1.5 md:py-3 rounded-lg text-white text-sm md:text-base font-semibold items-center flex gap-1 ${
                    product.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                  } ${animate ? 'animate-pulse' : ''}`}
                  aria-disabled={!product.inStock}
                  aria-label="Add product to cart"
                >
                  <ShoppingCart />
                  Add to Cart
                </button>
                <button
                  onClick={handleOrderNow}
                  disabled={!product.inStock}
                  className={`md:px-6 px-3 py-1.5 text-sm md:text-base md:py-3 rounded-lg items-center text-white font-semibold ${
                    product.inStock ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  aria-disabled={!product.inStock}
                  aria-label="Order product now"
                >
                  Order Now
                </button>
              </div>
      
              <p className="text-sm text-gray-600 capitalize">Category: {product.category}</p>
              <p className="text-md text-gray-800 leading-relaxed mb-20">
                {product.description || 'No description provided.'}
              </p>
            </div>
    </div>
  );
};

export default ProductPage;
