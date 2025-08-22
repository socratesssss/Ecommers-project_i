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

export const localProducts: Product[] = [
  {
    _id: "1",
    name: "Iphone 14",
description:`<h1>Apple iPhone 14</h1>
<p>
  Experience the power, elegance, and innovation of the Apple iPhone 14—designed to
  keep you connected, capture stunning memories, and perform seamlessly all day long.
  With advanced safety features, brilliant display technology, and exceptional
  performance, the iPhone 14 is built to be your everyday essential.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.1-inch Super Retina XDR OLED display with HDR and True Tone</li>
  <li>Dual 12MP camera system with advanced low-light performance</li>
  <li>Photonic Engine for incredible detail and color accuracy</li>
  <li>Cinematic Mode (4K HDR up to 30 fps) for pro-level videos</li>
  <li>Action Mode for smooth handheld video recording</li>
  <li>Crash Detection and Emergency SOS via satellite</li>
  <li>A15 Bionic chip with 5-core GPU for lightning-fast performance</li>
  <li>iOS 16 with customizable lock screen and powerful features</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The iPhone 14 combines sleek design with immersive visuals, making every interaction
  effortless and every detail stand out.
</p>
<ul>
  <li>6.1-inch edge-to-edge Super Retina XDR display</li>
  <li>Resolution: 2532 × 1170 pixels at 460 ppi</li>
  <li>HDR10, Dolby Vision, and Haptic Touch support</li>
  <li>Ceramic Shield front cover—tougher than any smartphone glass</li>
  <li>Aerospace-grade aluminum frame and water resistance (IP68)</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Dual-camera setup (Main + Ultra-Wide, both 12MP)</li>
  <li>Night Mode, Deep Fusion, and Smart HDR 4</li>
  <li>Improved low-light photography with Photonic Engine</li>
  <li>Cinematic Mode for depth-of-field videos in 4K HDR</li>
  <li>Front: 12MP TrueDepth camera with autofocus and Night Mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>A15 Bionic chip with 6-core CPU and 5-core GPU</li>
  <li>Superfast 5G connectivity for streaming, gaming, and browsing</li>
  <li>Up to 20 hours of video playback</li>
  <li>MagSafe support for fast wireless charging and accessories</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>Crash Detection automatically calls emergency services if you can’t</li>
  <li>Emergency SOS via satellite for off-grid safety (where available)</li>
  <li>Water- and dust-resistant (IP68 rating)</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × iPhone 14</li>
  <li>1 × USB-C to Lightning cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use an Apple-certified charger for optimal battery health</li>
  <li>Avoid extreme temperatures and moisture exposure</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use a protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in a range of elegant colors—including Midnight, Blue, Starlight, Purple,
  and (PRODUCT)RED—the iPhone 14 complements every style. Pair it with Apple Watch
  and AirPods for a seamlessly connected Apple ecosystem experience.
</p>
`,
    miniDescription: "iPhone 14 delivers stunning performance with the A15 Bionic chip, advanced dual-camera system, vibrant Super Retina XDR display, and all-day battery — sleek, powerful, and reliable.",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "IPhone",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870184/IPhone14_ryp4yf.jpg"],
  
  },
  {
    _id: "2",
    name: "I phone 16",
    description:`<h1>Apple iPhone 16</h1>
<p>
  Discover the future of mobile technology with the Apple iPhone 16—engineered for
  exceptional performance, next-generation photography, and seamless everyday use.
  With its stunning display, powerful A18 Bionic chip, and intelligent AI features,
  the iPhone 16 is designed to keep you ahead in every moment.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.3-inch Super Retina XDR OLED display with ProMotion (120Hz)</li>
  <li>Advanced dual 48MP + 12MP camera system with AI-powered enhancements</li>
  <li>Next-gen Photonic Engine for ultra-realistic detail and color</li>
  <li>Cinematic Mode (4K HDR up to 60 fps) with improved stabilization</li>
  <li>Action Mode 2.0 for pro-level video recording on the move</li>
  <li>A18 Bionic chip with Neural Engine for lightning-fast AI performance</li>
  <li>All-day battery life with optimized power efficiency</li>
  <li>iOS 18 with enhanced customization and productivity tools</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  Built for clarity and style, the iPhone 16 delivers immersive visuals with
  ProMotion smoothness and durable materials for everyday use.
</p>
<ul>
  <li>6.3-inch edge-to-edge Super Retina XDR OLED display</li>
  <li>Resolution: 2796 × 1290 pixels at 460 ppi</li>
  <li>120Hz ProMotion refresh rate for ultra-smooth interactions</li>
  <li>Ceramic Shield front—toughest smartphone glass ever</li>
  <li>Titanium frame with IP68 water and dust resistance</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Dual-camera setup: 48MP Main + 12MP Ultra-Wide</li>
  <li>Next-gen Night Mode and Smart HDR 6</li>
  <li>AI-driven image processing for pro-level shots</li>
  <li>Cinematic Mode in 4K HDR (30/60 fps)</li>
  <li>Front: 12MP TrueDepth camera with autofocus and improved low-light performance</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>A18 Bionic chip with 6-core CPU and 6-core GPU</li>
  <li>AI-enhanced Neural Engine for faster on-device intelligence</li>
  <li>Superfast 5G and Wi-Fi 7 connectivity</li>
  <li>Up to 28 hours of video playback</li>
  <li>MagSafe 2.0 support for faster wireless charging and accessories</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>Crash Detection with improved sensor accuracy</li>
  <li>Emergency SOS via satellite with faster connectivity</li>
  <li>IP68 water and dust resistance</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
  <li>1TB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × iPhone 16</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Charge with Apple-certified USB-C chargers for best performance</li>
  <li>Avoid prolonged exposure to extreme heat or moisture</li>
  <li>Clean with a soft, lint-free cloth; avoid liquids and chemicals</li>
  <li>Protect with a case and screen protector for maximum durability</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in a stunning range of colors—including Midnight, Silver, Blue Titanium,
  Pink, and (PRODUCT)RED—the iPhone 16 elevates your personal style. Pair it with
  Apple Watch Series 10 and AirPods Pro 3 for the ultimate connected experience.
</p>
`,
    miniDescription: "iPhone 16 — features a smooth 6.3″ ProMotion OLED display, ultra-sharp dual 48 MP cameras, A18 Bionic chip with AI boost, all-day battery, and advanced safety in a sleek titanium body.",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "IPhone",
    inStock: true,
       productColors: [
      {
        color: "White",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870231/iphone16c1_ssl3hz.jpg"]
      },
      {
        color: "Black",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870240/iphone16c2_e3kchn.jpg"]
      },
      {
        color: "Black",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870238/iphone16c3_p6xhvh.jpg"]
      },
    ],
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870238/iphone16c3_p6xhvh.jpg","https://res.cloudinary.com/dohqshaup/image/upload/v1755870228/iphone16_u3pu6t.jpg",],
 
  },
  {
    _id: "3",
    name: "I phone 16 pro",
    description:`<h1>Apple iPhone 16 Pro</h1>
<p>
  Experience cutting-edge innovation with the Apple iPhone 16 Pro—designed for
  unmatched performance, pro-level photography, and seamless connectivity.
  With its titanium design, powerful A18 Pro chip, and advanced camera system,
  the iPhone 16 Pro sets a new standard for smartphones.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.3-inch Super Retina XDR OLED display with ProMotion (120Hz)</li>
  <li>Triple Pro camera system with 48MP Main, 12MP Ultra-Wide, and 12MP Telephoto</li>
  <li>Next-gen Photonic Engine for ultra-realistic detail and color</li>
  <li>Cinematic Mode (4K HDR up to 60 fps) with pro stabilization</li>
  <li>Action Mode 2.0 for smooth handheld video recording</li>
  <li>Crash Detection and upgraded Emergency SOS via satellite</li>
  <li>A18 Pro Bionic chip with Neural Engine for lightning-fast AI processing</li>
  <li>iOS 18 with enhanced customization and productivity features</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  Built with premium materials and cutting-edge technology, the iPhone 16 Pro
  offers smooth visuals and incredible durability in every detail.
</p>
<ul>
  <li>6.3-inch edge-to-edge Super Retina XDR OLED with ProMotion</li>
  <li>Resolution: 2796 × 1290 pixels at 460 ppi</li>
  <li>HDR10, Dolby Vision, and Always-On Display</li>
  <li>Ceramic Shield front and titanium frame for enhanced strength</li>
  <li>Water- and dust-resistant (IP68)</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Triple-camera system: 48MP Main, 12MP Ultra-Wide, 12MP Telephoto (5x optical zoom)</li>
  <li>Night Mode, Deep Fusion, and Smart HDR 6</li>
  <li>AI-powered enhancements for pro-level shots</li>
  <li>Cinematic Mode in 4K HDR (30/60 fps)</li>
  <li>12MP TrueDepth front camera with autofocus and Night Mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>A18 Pro Bionic chip with 6-core CPU and 6-core GPU</li>
  <li>Neural Engine for faster AI-driven experiences</li>
  <li>Superfast 5G and Wi-Fi 7 connectivity</li>
  <li>Up to 30 hours of video playback</li>
  <li>MagSafe 2.0 for faster wireless charging and accessories</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>Crash Detection with enhanced sensors</li>
  <li>Emergency SOS via satellite (next-gen connectivity)</li>
  <li>IP68 water and dust resistance</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>256GB</li>
  <li>512GB</li>
  <li>1TB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × iPhone 16 Pro</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Charge with Apple-certified USB-C chargers for optimal performance</li>
  <li>Avoid extreme heat, cold, and moisture</li>
  <li>Clean with a soft, lint-free cloth</li>
  <li>Use protective accessories to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in elegant finishes including Natural Titanium, Blue Titanium, White
  Titanium, and Black Titanium—the iPhone 16 Pro complements every style.
  Pair it with Apple Watch Series 10 and AirPods Pro 3 for a truly connected
  Apple ecosystem experience.
</p>
`,
  miniDescription: "iPhone 16 Pro — featuring a titanium design, 6.3″ ProMotion display, A18 Pro chip, triple 48MP camera system, and all-day battery for ultimate performance and style.",
  price: 1111.11,
    discountPrice:999.99 ,
    category: "IPhone",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870243/iphone16pro_vlilbv.jpg"],
    productColors: [
      {
        color: "White",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870253/iphone16proc1_ybhs09.jpg"]
      },
   
    ]
  },
  {
    _id: "4",
    name: "IPhone 15",
    description:`<h1>Apple iPhone 15</h1>
<p>
  Discover the innovation and elegance of the Apple iPhone 15—designed to
  keep you connected, capture stunning memories, and perform seamlessly
  throughout the day. With advanced cameras, brilliant display, and
  powerful performance, iPhone 15 is your ultimate daily companion.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.1-inch Super Retina XDR OLED display with HDR and True Tone</li>
  <li>Dual-camera system with 48MP Main and 12MP Ultra-Wide for professional-quality photos</li>
  <li>Photonic Engine for enhanced detail and color accuracy</li>
  <li>Cinematic Mode (4K HDR up to 30 fps) for pro-level videos</li>
  <li>Action Mode for smooth handheld video recording</li>
  <li>Crash Detection and Emergency SOS via satellite</li>
  <li>A16 Bionic chip with 5-core GPU for lightning-fast performance</li>
  <li>iOS 17 with improved customization and powerful features</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The iPhone 15 combines sleek design with immersive visuals, making every
  interaction effortless and every detail stand out.
</p>
<ul>
  <li>6.1-inch edge-to-edge Super Retina XDR OLED display</li>
  <li>Resolution: 2532 × 1170 pixels at 460 ppi</li>
  <li>HDR10, Dolby Vision, and Haptic Touch support</li>
  <li>Ceramic Shield front cover for durability</li>
  <li>Aerospace-grade aluminum frame and IP68 water resistance</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Dual-camera setup: 48MP Main + 12MP Ultra-Wide</li>
  <li>Night Mode, Deep Fusion, and Smart HDR 5</li>
  <li>Photonic Engine for low-light photography</li>
  <li>Cinematic Mode for depth-of-field videos in 4K HDR</li>
  <li>Front: 12MP TrueDepth camera with autofocus and Night Mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>A16 Bionic chip with 6-core CPU and 5-core GPU</li>
  <li>Superfast 5G connectivity</li>
  <li>Up to 20 hours of video playback</li>
  <li>MagSafe support for fast wireless charging and accessories</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>Crash Detection automatically calls emergency services if needed</li>
  <li>Emergency SOS via satellite for off-grid safety</li>
  <li>Water- and dust-resistant (IP68 rating)</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × iPhone 15</li>
  <li>1 × USB-C to Lightning cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use an Apple-certified charger for optimal battery health</li>
  <li>Avoid extreme temperatures and moisture exposure</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use a protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in elegant colors—including Midnight, Blue, Starlight, Purple,
  and (PRODUCT)RED—the iPhone 15 complements every style. Pair it with Apple
  Watch and AirPods for a seamless Apple ecosystem experience.
</p>
`,
    miniDescription: "iPhone 15 — Stylish design with Dynamic Island, A16 Bionic chip, 48MP main camera, Super Retina XDR display, and all-day battery for smooth performance.",
  price: 1111.11,
    discountPrice:999.99 ,
    category: "IPhone",
    inStock: false,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870191/iphone15_su4jln.jpg"],

  },
  {
    _id: "5",
    name: "I Phone 15 pro",
    description: `<h1>Apple iPhone 15 Pro</h1>
<p>
  Experience the ultimate combination of performance, design, and innovation with the Apple iPhone 15 Pro. 
  Engineered for professionals and enthusiasts alike, it delivers unmatched speed, pro-level photography, 
  and a seamless daily experience.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.1-inch Super Retina XDR OLED display with ProMotion (120Hz)</li>
  <li>Triple Pro camera system: 48MP Main, 12MP Ultra-Wide, 12MP Telephoto</li>
  <li>Photonic Engine for incredible detail and true-to-life colors</li>
  <li>Cinematic Mode (4K HDR up to 60 fps) for professional-quality videos</li>
  <li>Action Mode 2.0 for ultra-smooth handheld video recording</li>
  <li>Crash Detection and Emergency SOS via satellite</li>
  <li>A17 Pro Bionic chip with 6-core CPU and 6-core GPU for top-tier performance</li>
  <li>iOS 17 with advanced customization and productivity features</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The iPhone 15 Pro combines elegant design with premium materials for an immersive visual experience.
</p>
<ul>
  <li>6.1-inch edge-to-edge Super Retina XDR OLED with ProMotion (120Hz)</li>
  <li>Resolution: 2556 × 1179 pixels at 460 ppi</li>
  <li>HDR10, Dolby Vision, and Always-On display support</li>
  <li>Ceramic Shield front and titanium frame for durability</li>
  <li>Water- and dust-resistant (IP68 rating)</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Triple-camera setup: 48MP Main, 12MP Ultra-Wide, 12MP Telephoto (5x optical zoom)</li>
  <li>Night Mode, Deep Fusion, and Smart HDR 6</li>
  <li>ProRAW and ProRes video support</li>
  <li>Cinematic Mode for 4K HDR depth-of-field videos</li>
  <li>12MP TrueDepth front camera with autofocus and Night Mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>A17 Pro Bionic chip with 6-core CPU and 6-core GPU</li>
  <li>Neural Engine for faster AI-driven experiences</li>
  <li>Superfast 5G and Wi-Fi 7 connectivity</li>
  <li>Up to 23 hours of video playback</li>
  <li>MagSafe 2.0 for fast wireless charging and accessory support</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>Crash Detection automatically calls emergency services if needed</li>
  <li>Emergency SOS via satellite for off-grid safety</li>
  <li>IP68 water- and dust-resistance rating</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
  <li>1TB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × iPhone 15 Pro</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Charge with Apple-certified chargers for optimal battery health</li>
  <li>Avoid extreme temperatures and moisture exposure</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in Titanium, Blue, White, and Black finishes, the iPhone 15 Pro complements every style. 
  Pair it with Apple Watch Series 10 and AirPods Pro for a fully integrated Apple ecosystem.
</p>
`,
    miniDescription: "iPhone 15 Pro — features a 6.1″ ProMotion OLED display, triple 48MP camera system, A17 Pro chip, titanium design, and all-day battery for pro-level performance and photography.",
   price: 1111.11,
    discountPrice:999.99 ,
    category: "IPhone",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870199/iphone15pro_tk1tr2.jpg"],
    productColors: [
      {
        color: "Black",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870208/iphone15proc1_wuh9lg.jpg"]
      },
      {
        color: "Silver",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870218/iphone15proc2_tnmfnv.jpg"]
      }
    ]
  },
  {
    _id: "6",
    name: "Samsung S24",
    description: `<h1>Samsung Galaxy S24</h1>
<p>
  Discover the innovation, performance, and elegance of the Samsung Galaxy S24—designed to keep you connected, capture stunning moments, and deliver exceptional speed. With cutting-edge cameras, vibrant display, and advanced features, the S24 is built for everyday excellence.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.1-inch Dynamic AMOLED 2X display with 120Hz refresh rate</li>
  <li>Triple camera system: 50MP Main, 12MP Ultra-Wide, 10MP Telephoto</li>
  <li>Nightography and AI enhancements for professional-quality photos</li>
  <li>8K video recording and Super Steady mode</li>
  <li>Snapdragon 8 Gen 3 processor for lightning-fast performance</li>
  <li>5G connectivity for seamless streaming and gaming</li>
  <li>One UI 6 based on Android 14 with advanced customization</li>
  <li>IP68 water- and dust-resistance rating</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The Galaxy S24 combines a sleek, premium design with immersive visuals, delivering a smooth and vibrant experience.
</p>
<ul>
  <li>6.1-inch edge-to-edge Dynamic AMOLED 2X display</li>
  <li>Resolution: 2340 × 1080 pixels at 425 ppi</li>
  <li>HDR10+ support with Adaptive Brightness</li>
  <li>Corning Gorilla Glass Victus 3 for durability</li>
  <li>Aluminum frame and elegant back panel design</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Triple-camera setup: 50MP Main, 12MP Ultra-Wide, 10MP Telephoto</li>
  <li>Night Mode, AI Scene Optimizer, and Super Steady Video</li>
  <li>8K video recording and 4K Ultra HD capture</li>
  <li>Front: 12MP camera with autofocus and night photography support</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>Snapdragon 8 Gen 3 processor with advanced AI performance</li>
  <li>Up to 12GB RAM for seamless multitasking</li>
  <li>5G, Wi-Fi 7, and Bluetooth 5.3 connectivity</li>
  <li>Up to 22 hours of video playback</li>
  <li>Fast wired and wireless charging with Wireless PowerShare support</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>IP68 water- and dust-resistant</li>
  <li>Secure Folder and Knox Security for data protection</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × Samsung Galaxy S24</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use Samsung-certified chargers for optimal battery health</li>
  <li>Avoid extreme temperatures and moisture</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in elegant colors including Phantom Black, Cream, Green, and Lavender. Pair with Galaxy Buds and Galaxy Watch for a seamless Samsung ecosystem experience.
</p>
`,
    miniDescription: "Samsung Galaxy S24 — 6.1″ Dynamic AMOLED 2X, triple 50MP camera, Snapdragon 8 Gen 3, 5G, sleek design, long battery, and advanced photography for daily excellence.",
   price: 1111.11,
    discountPrice:999.99 ,
    category: "Samsung",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870772/SamsungS24_rksmu9.jpg"],
    productColors: [
      {
        color: "White",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870836/SamsungS24c1_yywdt7.jpg"]
      },
      {
        color: "White",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870840/SamsungS24.jpgc2_vo7mcc.jpg"]
      }
    ]
  },
  {
    _id: "7",
    name: "Samsung Galaxy Note 20 Ultra",
    description: `<h1>Samsung Galaxy Note20 Ultra</h1>
<p>
  Experience the ultimate power, productivity, and innovation with the Samsung Galaxy Note20 Ultra—designed to enhance your workflow, capture stunning content, and deliver seamless performance all day long. With an immersive display, advanced S Pen features, and professional-grade cameras, the Note20 Ultra is built for creators and professionals.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.9-inch Dynamic AMOLED 2X display with 120Hz refresh rate</li>
  <li>Triple camera system: 108MP Main, 12MP Ultra-Wide, 12MP Telephoto</li>
  <li>Laser autofocus and advanced Night Mode for perfect shots</li>
  <li>8K video recording and Super Steady video mode</li>
  <li>S Pen with Air Actions and low-latency writing</li>
  <li>Exynos 990 / Snapdragon 865+ processor depending on region</li>
  <li>5G connectivity for ultra-fast streaming and gaming</li>
  <li>One UI 5 based on Android 13 with enhanced productivity tools</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The Galaxy Note20 Ultra combines premium materials with a cinematic display, making every interaction smooth and vibrant.
</p>
<ul>
  <li>6.9-inch edge-to-edge Dynamic AMOLED 2X display</li>
  <li>Resolution: 3088 × 1440 pixels at 496 ppi</li>
  <li>HDR10+ support with Adaptive Brightness</li>
  <li>Corning Gorilla Glass Victus for scratch and drop resistance</li>
  <li>Stainless steel frame with elegant back panel finish</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Triple-camera setup: 108MP Main, 12MP Ultra-Wide, 12MP Telephoto</li>
  <li>Laser autofocus, Night Mode, and AI Scene Optimizer</li>
  <li>8K video recording and 4K Ultra HD capture</li>
  <li>Front: 10MP camera with autofocus and HDR support</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>Exynos 990 / Snapdragon 865+ processor with powerful GPU</li>
  <li>8GB / 12GB RAM for seamless multitasking</li>
  <li>5G, Wi-Fi 6, and Bluetooth 5.0 connectivity</li>
  <li>Up to 25 hours of video playback</li>
  <li>Fast wired and wireless charging with Wireless PowerShare support</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>IP68 water- and dust-resistant</li>
  <li>Secure Folder and Knox Security for data protection</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × Samsung Galaxy Note20 Ultra</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>S Pen</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use Samsung-certified chargers for optimal battery health</li>
  <li>Avoid extreme temperatures and moisture</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in Mystic Bronze, Mystic Black, and Mystic White, the Note20 Ultra complements any professional or personal style. Pair it with Galaxy Buds and Galaxy Watch for a fully integrated Samsung experience.
</p>
`,
    miniDescription: "Samsung Galaxy Note20 Ultra — 6.9″ Dynamic AMOLED 2X, triple camera 108MP + 12MP + 12MP, S Pen with Air Actions, Snapdragon/Exynos, 5G, long-lasting battery, and professional productivity features.",
   price: 1111.11,
    discountPrice:999.99 ,
    category: "Samsung",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870272/SamsungGalaxyNote20Ultra_b7rx8u.jpg"],
    productColors: [
      {
        color: "White",
        images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870282/SamsungGalaxyNote20Ultrac1_i3bibj.jpg"]
      }
    ]
  },
  {
    _id: "8",
    name: "Samsung Galaxy Z Flip — Foldable 6.7",
    description:`<h1>Samsung Galaxy Z Flip</h1>
<p>
  Experience the innovative foldable design, style, and cutting-edge technology of the Samsung Galaxy Z Flip—designed to fit perfectly in your pocket while delivering a full smartphone experience. With flexible design, advanced cameras, and seamless performance, the Galaxy Z Flip is built for those who value style and convenience.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.7-inch Foldable Dynamic AMOLED 2X display with 120Hz refresh rate</li>
  <li>Dual-camera system: 12MP Main + 12MP Ultra-Wide</li>
  <li>Flex Mode for hands-free selfies and multitasking</li>
  <li>Snapdragon 8+ Gen 1 processor for ultra-fast performance</li>
  <li>5G connectivity for streaming, gaming, and fast downloads</li>
  <li>Android 13 with One UI 5 for customizable experience</li>
  <li>Intelligent battery with fast wired and wireless charging</li>
  <li>Compact design with premium Gorilla Glass Victus+</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The Galaxy Z Flip folds in half for ultimate portability while delivering immersive visuals and smooth interaction.
</p>
<ul>
  <li>6.7-inch foldable Dynamic AMOLED 2X edge-to-edge display</li>
  <li>Cover display: 1.9-inch Super AMOLED for notifications and quick tasks</li>
  <li>Resolution: 2640 × 1080 pixels at 425 ppi</li>
  <li>HDR10+ support for vibrant visuals</li>
  <li>Gorilla Glass Victus+ and premium aluminum frame</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Dual-camera setup: 12MP Main + 12MP Ultra-Wide</li>
  <li>Night Mode, HDR10+ video recording</li>
  <li>Flex Mode for hands-free selfies and creative shots</li>
  <li>Front: 10MP selfie camera with autofocus and HDR support</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>Snapdragon 8+ Gen 1 processor with advanced GPU</li>
  <li>8GB RAM for smooth multitasking</li>
  <li>5G, Wi-Fi 6, and Bluetooth 5.2 connectivity</li>
  <li>Up to 24 hours of mixed usage battery life</li>
  <li>Fast wired and wireless charging plus Wireless PowerShare</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>IPX8 water-resistant</li>
  <li>Secure Folder and Samsung Knox Security for data protection</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × Samsung Galaxy Z Flip</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use Samsung-certified chargers for optimal battery life</li>
  <li>Avoid exposure to extreme temperatures and moisture</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use protective case designed for foldable devices</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in Mirror Black, Mystic Bronze, and Lavender, the Galaxy Z Flip is as stylish as it is functional. Pair it with Galaxy Buds and Galaxy Watch for a seamless Samsung ecosystem experience.
</p>
`,
    miniDescription: "Samsung Galaxy Z Flip — Foldable 6.7″ Dynamic AMOLED 2X display, Dual 12MP cameras, Flex Mode for hands-free use, Snapdragon 8+ Gen 1, 5G, long-lasting battery, and compact pocket-friendly design.",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "Samsung",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870290/SamsungGalaxyZFlip_i9easb.jpg"],
 
  },
  {
    _id: "9",
    name: "Google Pixel 6",
    description: `<h1>Google Pixel 6</h1>
<p>
  Discover the perfect balance of performance, photography, and AI-powered features with the Google Pixel 6—designed to keep you connected, capture breathtaking photos, and deliver smooth, intelligent performance all day. With advanced security, vibrant display, and innovative camera technology, the Pixel 6 is built for everyday excellence.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.4-inch AMOLED display with 90Hz refresh rate and HDR10+</li>
  <li>Dual-camera system: 50MP Wide + 12MP Ultra-Wide</li>
  <li>Google Tensor chip for AI-enhanced performance</li>
  <li>Night Sight and Magic Eraser for professional-level photography</li>
  <li>Android 13 with Material You customization</li>
  <li>5G connectivity for fast streaming and downloads</li>
  <li>Battery with Adaptive Battery and fast charging support</li>
  <li>Fingerprint sensor under display for secure unlocking</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The Pixel 6 combines modern design with immersive visuals, making every interaction smooth and enjoyable.
</p>
<ul>
  <li>6.4-inch AMOLED edge-to-edge display</li>
  <li>Resolution: 2400 × 1080 pixels at 411 ppi</li>
  <li>HDR10+ support for vivid color and contrast</li>
  <li>Corning Gorilla Glass Victus protection</li>
  <li>Aluminum frame with IP68 water and dust resistance</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Dual-camera setup: 50MP Main + 12MP Ultra-Wide</li>
  <li>Night Sight, Motion Mode, and Real Tone for accurate skin tones</li>
  <li>Magic Eraser for quick photo editing</li>
  <li>Front: 8MP camera with wide-angle lens and portrait mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>Google Tensor processor with 8-core CPU and advanced GPU</li>
  <li>8GB RAM for seamless multitasking</li>
  <li>5G, Wi-Fi 6, and Bluetooth 5.2 connectivity</li>
  <li>Up to 24 hours of mixed usage battery life</li>
  <li>Fast wired and wireless charging, including Battery Share</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>IP68 water- and dust-resistant</li>
  <li>Google Titan M2 security chip for advanced protection</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × Google Pixel 6</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use Google-certified chargers for best battery performance</li>
  <li>Avoid extreme temperatures and moisture</li>
  <li>Clean with a soft, lint-free cloth; avoid abrasive materials</li>
  <li>Use a protective case and screen protector for durability</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in Stormy Black, Kinda Coral, and Sorta Seafoam, the Pixel 6 delivers style and performance in every color. Pair it with Pixel Buds and Wear OS devices for a seamless Google ecosystem experience.
</p>
`,
    miniDescription: "Google Pixel 6 — 6.4″ AMOLED display, Dual 50MP + 12MP cameras with AI features, Google Tensor processor, 5G, long-lasting battery, and sleek, modern design.",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "Pixel",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870258/pixel6_omjbwo.jpg"],
  },
  {
    _id: "10",
    name: "Google Pixel 9",
    description: `<h1>Google Pixel 9</h1>
<p>
  Experience cutting-edge performance, intelligent AI features, and stunning photography with the Google Pixel 9. Designed to keep you productive, capture amazing moments, and perform seamlessly all day, the Pixel 9 combines powerful hardware with Google’s latest software innovations for a smart, effortless experience.
</p>

<h2>Key Features</h2>
<ul>
  <li>6.3-inch OLED display with 120Hz refresh rate and HDR10+</li>
  <li>Triple camera system: 50MP Wide + 12MP Ultra-Wide + 48MP Telephoto</li>
  <li>Google Tensor G3 processor for AI-enhanced performance</li>
  <li>Advanced computational photography: Night Sight, Magic Eraser, and Real Tone</li>
  <li>Android 14 with Material You personalization</li>
  <li>5G connectivity for high-speed downloads and streaming</li>
  <li>Long-lasting battery with fast charging and Battery Share</li>
  <li>Under-display fingerprint sensor and Face Unlock</li>
</ul>

<h2>Display &amp; Design</h2>
<p>
  The Pixel 9 offers a sleek and modern design with a vibrant, immersive display for all your daily interactions.
</p>
<ul>
  <li>6.3-inch edge-to-edge OLED display</li>
  <li>Resolution: 2400 × 1080 pixels at 410 ppi</li>
  <li>HDR10+ and adaptive refresh rate up to 120Hz</li>
  <li>Corning Gorilla Glass Victus+ for durable protection</li>
  <li>Aluminum frame with IP68 water and dust resistance</li>
</ul>

<h2>Camera System</h2>
<ul>
  <li>Triple-camera setup: 50MP Wide + 12MP Ultra-Wide + 48MP Telephoto</li>
  <li>Night Sight, Cinematic Blur, and Magic Eraser for professional-quality photos</li>
  <li>AI-powered Smart Capture and Real Tone for accurate skin tones</li>
  <li>Front: 12MP wide-angle camera with portrait mode</li>
</ul>

<h2>Performance</h2>
<ul>
  <li>Google Tensor G3 processor with advanced 8-core CPU and GPU</li>
  <li>8GB/12GB RAM for smooth multitasking</li>
  <li>5G, Wi-Fi 7, and Bluetooth 5.3 support</li>
  <li>Up to 26 hours of mixed usage battery life</li>
  <li>Fast wired, wireless, and reverse wireless charging</li>
</ul>

<h2>Safety Features</h2>
<ul>
  <li>IP68 water- and dust-resistant</li>
  <li>Google Titan M3 security chip for advanced protection</li>
  <li>Face Unlock and under-display fingerprint sensor</li>
</ul>

<h2>Storage Options</h2>
<ul>
  <li>128GB</li>
  <li>256GB</li>
  <li>512GB</li>
</ul>

<h2>What’s Included</h2>
<ul>
  <li>1 × Google Pixel 9</li>
  <li>1 × USB-C to USB-C cable</li>
  <li>Documentation</li>
</ul>

<h2>Care Instructions</h2>
<ul>
  <li>Use certified chargers for optimal battery life</li>
  <li>Avoid extreme temperatures and moisture exposure</li>
  <li>Clean with a soft, lint-free cloth</li>
  <li>Use a protective case and screen protector to prevent damage</li>
</ul>

<h2>Style Notes</h2>
<p>
  Available in Obsidian Black, Glacier White, and Coral Pink, the Pixel 9 combines modern style with cutting-edge technology. Pair it with Pixel Buds and Wear OS devices for a fully connected Google ecosystem.
</p>
`,
    miniDescription: "Google Pixel 9 — 6.3″ OLED display with 120Hz refresh, Triple camera system (50MP + 12MP + 48MP), Google Tensor G3 processor, 5G, long-lasting battery, and sleek design.",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "Pixel",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870276/pixel9_wuvitr.jpg"],
 
  },
  {
    _id: "11",
    name: "Pixel 7pro",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 1111.11,
    discountPrice:999.99 ,
    category: "Pixel",
    inStock: true,
    images: ["https://res.cloudinary.com/dohqshaup/image/upload/v1755870262/pixel7pro_easucn.jpg"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "12",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "13",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "14",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "15",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "16",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "17",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "18",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  },
  {
    _id: "19",
    name: "Classic White T-Shirt",
    description: "A premium quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit and durable construction.",
    miniDescription: "Comfortable cotton t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    category: "Clothing",
    inStock: false,
    images: ["/placeholderimage.webp"],
    productColors: [
      {
        color: "White",
        images: ["/placeholderimage.webp"]
      }
    ]
  }
];