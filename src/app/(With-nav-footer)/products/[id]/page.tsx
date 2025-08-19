'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import ProductPageSkeleton from './skeletn';
import { localProducts } from '@/data/product';
type ProductColor = {
  color: string;
  images: string[];
};

type Product = {
  _id: string;
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
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load product from local database
  useEffect(() => {
    const prod = localProducts.find((p) => p._id === productId) || null;
    setProduct(prod);
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    setSelectedColor(null);
    setActiveImageIndex(0);
  }, [product]);

  const getDisplayImages = () => {
    if (!product) return [];
    if (selectedColor?.images?.length) return selectedColor.images;
    const base = product.images || [];
    const colors = product.productColors?.flatMap((c) => c.images) || [];
    return [...base, ...colors];
  };

  const displayImages = getDisplayImages();

  const scrollToIndex = (index: number) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index]!.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleAdd = () => {
    if (!product) return;
    dispatch(
      addToCart({
        _id: product._id,
        productName: { original: product.name },
        price: { amount: product.discountPrice || product.price },
        quantity: 1,
        imageUrl: selectedColor?.images?.[0] || product.images?.[0] || '/placeholder.jpg',
        inStock: product.inStock,
        selectedColor: selectedColor?.color || null,
        allColors: product.productColors || [],
      })
    );
    setAnimate(true);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleOrderNow = () => {
    if (!product) return;
    const orderProduct = {
      _id: product._id,
      productName: { original: product.name },
      price: { amount: product.discountPrice || product.price },
      quantity: 1,
      imageUrl: selectedColor?.images?.[0] || product.images?.[0] || '/placeholder.jpg',
      inStock: product.inStock,
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

  if (loading) return <ProductPageSkeleton />;
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Product not found</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:flex gap-8 lg:gap-16">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          Added to cart!
        </div>
      )}

      {/* Image Gallery Section */}
      <div className="lg:sticky top-10 md:w-1/2 h-max">
        <div
          className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          ref={scrollContainerRef}
          onScroll={handleMobileScroll}
        >
          {displayImages.map((img, i) => (
            <div
              key={i}
            ref={(el) => {
  imageRefs.current[i] = el;
}}
              className="min-w-full snap-center relative aspect-square rounded-xl overflow-hidden"
            >
              <Image src={img} alt={`Product ${i}`} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        <div className="hidden lg:block w-full aspect-square rounded-xl overflow-hidden shadow-lg relative">
          {displayImages[activeImageIndex] && (
            <Image src={displayImages[activeImageIndex]} alt={`Product ${activeImageIndex}`} fill className="object-cover" priority />
          )}
          <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImageIndex(i);
                scrollToIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${i === activeImageIndex ? 'bg-orange-500 w-6' : 'bg-gray-300'}`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImageIndex(i);
                scrollToIndex(i);
              }}
              className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === activeImageIndex ? 'border-orange-500' : 'border-transparent'}`}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="md:w-1/2 flex flex-col gap-6 mt-8 md:mt-0">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600">{product.miniDescription}</p>

          <div className="flex items-center gap-4">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-orange-600">${product.discountPrice.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          </div>
        </div>

        {product.productColors?.length && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Color:</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleColorClick(null)}
                className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${!selectedColor ? 'border-orange-500' : 'border-transparent'}`}
              >
                <Image src={product.images[0]} alt="All colors" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold">All</div>
              </button>
              {product.productColors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => handleColorClick(color)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${selectedColor?.color === color.color ? 'border-orange-500' : 'border-transparent'}`}
                >
                  <Image src={color.images[0]} alt={`Color ${color.color}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-2 py-3 px-4 sm:px-6 rounded-lg font-medium transition-all ${
              product.inStock ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } ${animate ? 'animate-pulse' : ''} w-full sm:flex-1`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm sm:text-base">Add to Cart</span>
          </button>

          <button
            onClick={handleOrderNow}
            disabled={!product.inStock}
            className={`py-3 px-4 sm:px-6 rounded-lg font-medium transition-all ${
              product.inStock ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } w-full sm:flex-1`}
          >
            <span className="text-sm sm:text-base">Buy Now</span>
          </button>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
          <div
            className="text-gray-800 mb-20
              [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4
              [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3
              [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2
              [&>p]:mb-4 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4"
            dangerouslySetInnerHTML={{
              __html: product.description || '<span class="text-gray-400">No description provided.</span>',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
