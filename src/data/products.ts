export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  seller?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Industry Leading ANC, 30hr Battery",
    description: "Industry-leading noise cancellation with dual processors and HD Noise Cancelling Processor QN1. Up to 30 hours battery life with quick charging.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Electronics",
    discount: 20,
    rating: 4.8,
    reviews: 12453,
    inStock: true,
    featured: true,
    seller: "TechWorld"
  },
  {
    id: "2",
    name: "Apple Watch Series 9 GPS 45mm Aluminum Case with Sport Band",
    description: "The most powerful Apple Watch yet with the new S9 chip. Featuring a brilliant Always-On display, advanced health features.",
    price: 429.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 8932,
    inStock: true,
    featured: true,
    seller: "AppleStore"
  },
  {
    id: "3",
    name: "Premium Leather Jacket Men - Genuine Lambskin Black Biker Style",
    description: "Handcrafted from premium lambskin leather with quilted lining. Perfect for casual and semi-formal occasions.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Fashion",
    discount: 25,
    rating: 4.7,
    reviews: 3421,
    inStock: true,
    featured: true,
    seller: "FashionHub"
  },
  {
    id: "4",
    name: "Ray-Ban Aviator Classic Sunglasses - Gold Frame Green Lens",
    description: "The iconic Ray-Ban Aviator Classic. Gold metal frame with crystal green G-15 lenses. 100% UV protection.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Fashion",
    discount: 15,
    rating: 4.6,
    reviews: 5678,
    inStock: true,
    seller: "SunglassHut"
  },
  {
    id: "5",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Quart",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    category: "Home",
    discount: 30,
    rating: 4.7,
    reviews: 89234,
    inStock: true,
    featured: true,
    seller: "KitchenPro"
  },
  {
    id: "6",
    name: "Dyson V15 Detect Absolute Cordless Vacuum Cleaner",
    description: "The most powerful Dyson cordless vacuum. Laser reveals microscopic dust. Piezo sensor counts particles.",
    price: 749.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Home",
    rating: 4.8,
    reviews: 4521,
    inStock: true,
    seller: "HomeAppliances"
  },
  {
    id: "7",
    name: "Nike Air Max 270 Men's Running Shoes - Black/White",
    description: "Nike's first lifestyle Air Max, featuring the tallest Air unit yet for all-day comfort.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Fashion",
    discount: 10,
    rating: 4.5,
    reviews: 23456,
    inStock: true,
    featured: true,
    seller: "NikeOfficial"
  },
  {
    id: "8",
    name: "Samsung 65\" Class Neo QLED 4K Smart TV QN85B",
    description: "Quantum Matrix Technology for precise brightness control. Neural Quantum Processor 4K for stunning picture.",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
    category: "Electronics",
    discount: 15,
    rating: 4.6,
    reviews: 3456,
    inStock: true,
    seller: "SamsungStore"
  },
  {
    id: "9",
    name: "Nespresso Vertuo Plus Coffee Machine by Breville",
    description: "Versatile automatic coffee maker. Makes 5 cup sizes from espresso to coffee. Centrifusion technology.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    category: "Home",
    discount: 20,
    rating: 4.7,
    reviews: 12345,
    inStock: true,
    seller: "CoffeeMasters"
  },
  {
    id: "10",
    name: "The North Face Men's Thermoball Eco Jacket 2.0",
    description: "Lightweight, packable insulated jacket made with recycled materials. Perfect for cold weather.",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&q=80",
    category: "Fashion",
    rating: 4.8,
    reviews: 6789,
    inStock: true,
    seller: "OutdoorGear"
  },
  {
    id: "11",
    name: "iPad Pro 12.9\" M2 Chip 256GB WiFi - Space Gray",
    description: "The ultimate iPad experience with M2 chip, 12.9\" Liquid Retina XDR display, ProMotion technology.",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 7890,
    inStock: true,
    featured: true,
    seller: "AppleStore"
  },
  {
    id: "12",
    name: "Philips Sonicare DiamondClean Smart 9700 Electric Toothbrush",
    description: "Our best whitening toothbrush with 4 high-performance brush heads. Smart sensor technology.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    category: "Beauty",
    discount: 35,
    rating: 4.6,
    reviews: 8765,
    inStock: true,
    seller: "PhilipsHealth"
  },
];

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "electronics", name: "Electronics", count: products.filter(p => p.category === "Electronics").length },
  { id: "fashion", name: "Fashion", count: products.filter(p => p.category === "Fashion").length },
  { id: "home", name: "Home & Kitchen", count: products.filter(p => p.category === "Home").length },
  { id: "beauty", name: "Beauty", count: products.filter(p => p.category === "Beauty").length },
];
