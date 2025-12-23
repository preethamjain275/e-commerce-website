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
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    description: "Handcrafted genuine leather jacket with a modern slim fit design. Perfect for any occasion.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Fashion",
    discount: 20,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 287,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Minimalist Watch",
    description: "Elegant timepiece with a clean design and premium materials. Swiss movement, sapphire crystal.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Accessories",
    discount: 15,
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    description: "UV-protected polarized lenses with titanium frames. Lightweight and durable.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessories",
    rating: 4.6,
    reviews: 156,
    inStock: true,
  },
  {
    id: "5",
    name: "Luxury Backpack",
    description: "Premium canvas and leather backpack with laptop compartment and ergonomic design.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Bags",
    discount: 25,
    rating: 4.8,
    reviews: 203,
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Smart Fitness Tracker",
    description: "Track your health metrics 24/7 with heart rate monitoring, GPS, and 7-day battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    category: "Electronics",
    rating: 4.5,
    reviews: 342,
    inStock: true,
  },
  {
    id: "7",
    name: "Cashmere Sweater",
    description: "Ultra-soft 100% cashmere sweater in a classic crew neck design.",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    category: "Fashion",
    rating: 4.9,
    reviews: 78,
    inStock: true,
  },
  {
    id: "8",
    name: "Ceramic Planter Set",
    description: "Set of 3 handmade ceramic planters in minimalist design. Perfect for indoor plants.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    category: "Home",
    discount: 10,
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
];

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "fashion", name: "Fashion", count: products.filter(p => p.category === "Fashion").length },
  { id: "electronics", name: "Electronics", count: products.filter(p => p.category === "Electronics").length },
  { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "Accessories").length },
  { id: "bags", name: "Bags", count: products.filter(p => p.category === "Bags").length },
  { id: "home", name: "Home", count: products.filter(p => p.category === "Home").length },
];
