import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus, Star, Truck, Shield, Check, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { DealsSection } from "@/components/home/DealsSection";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        discount: product.discount,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-amazon-blue mb-4">
            <Link to="/" className="hover:text-amazon-orange hover:underline">Home</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/products" className="hover:text-amazon-orange hover:underline">Products</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{product.category}</span>
          </nav>

          <div className="bg-white p-6 rounded-sm shadow-card">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="aspect-square bg-white rounded-sm overflow-hidden border border-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-2 space-y-4">
                <h1 className="text-xl font-medium text-amazon-dark leading-tight">
                  {product.name}
                </h1>

                {/* Seller */}
                <p className="text-sm">
                  <span className="text-muted-foreground">Visit the </span>
                  <span className="text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer">
                    {product.seller} Store
                  </span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-amazon-blue">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-amazon-orange text-amazon-orange"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer">
                    {product.reviews.toLocaleString()} ratings
                  </span>
                </div>

                {/* Price */}
                <div className="pb-3 border-b border-border">
                  {product.discount && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amazon-deal text-white text-xs font-bold px-2 py-1 rounded-sm">
                        {product.discount}% off
                      </span>
                      <span className="text-amazon-deal text-sm font-medium">Limited time deal</span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-medium">
                      <span className="text-sm align-top">$</span>
                      {Math.floor(discountedPrice)}
                      <span className="text-sm">{((discountedPrice % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                    </span>
                    {product.discount && (
                      <span className="text-sm text-muted-foreground">
                        List Price: <span className="line-through">${product.price.toFixed(2)}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-sm mb-2">About this item</h3>
                  <p className="text-sm text-amazon-dark">{product.description}</p>
                </div>
              </div>

              {/* Buy Box */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-lg p-4 space-y-3">
                  {/* Price */}
                  <div className="text-2xl font-medium">
                    <span className="text-sm align-top">$</span>
                    {Math.floor(discountedPrice)}
                    <span className="text-sm">{((discountedPrice % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                  </div>

                  {/* Delivery */}
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-amazon-blue">
                      <Truck className="h-4 w-4" />
                      <span className="font-bold">FREE delivery</span>
                    </div>
                    <p className="text-amazon-dark">
                      <span className="font-bold">Tomorrow, Dec 24</span>
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-amazon-blue cursor-pointer">
                    <MapPin className="h-4 w-4" />
                    <span>Deliver to India</span>
                  </div>

                  {/* Stock */}
                  <p className={`text-lg ${product.inStock ? "text-green-700" : "text-amazon-deal"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Qty:</span>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border border-border rounded px-2 py-1 text-sm bg-secondary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <Button
                    variant="cart"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="buy"
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>

                  {/* Secure Transaction */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure transaction</span>
                  </div>

                  {/* Seller Info */}
                  <div className="text-xs space-y-1 pt-2 border-t border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ships from</span>
                      <span>ShopKart</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sold by</span>
                      <span className="text-amazon-blue">{product.seller}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-6">
            <DealsSection
              title="Customers who viewed this also viewed"
              filterFn={(p) => p.category === product.category && p.id !== product.id}
              compact
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
