import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < Math.floor(rating)
                ? "fill-amazon-orange text-amazon-orange"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-amazon-blue text-xs ml-1">{product.reviews.toLocaleString()}</span>
      </div>
    );
  };

  if (compact) {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group bg-white p-3 rounded-sm hover:shadow-card-hover transition-shadow"
      >
        <div className="aspect-square mb-2 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <p className="text-xs text-amazon-dark line-clamp-2 hover:text-amazon-orange">
          {product.name}
        </p>
        <div className="mt-1">
          {renderStars(product.rating)}
        </div>
        <p className="text-sm font-medium mt-1">
          <span className="text-xs align-top">$</span>
          <span className="text-lg">{Math.floor(discountedPrice)}</span>
          <span className="text-xs">{((discountedPrice % 1) * 100).toFixed(0).padStart(2, '0')}</span>
        </p>
      </Link>
    );
  }

  return (
    <div className="group bg-white p-4 rounded-sm shadow-card hover:shadow-card-hover transition-shadow">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </Link>

      {/* Content */}
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm text-amazon-dark line-clamp-2 hover:text-amazon-orange">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {renderStars(product.rating)}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-medium">
            <span className="text-xs align-top">$</span>
            {Math.floor(discountedPrice)}
            <span className="text-xs">{((discountedPrice % 1) * 100).toFixed(0).padStart(2, '0')}</span>
          </span>
          {product.discount && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-amazon-deal font-medium">
                ({product.discount}% off)
              </span>
            </>
          )}
        </div>

        {/* Prime */}
        <div className="flex items-center gap-1">
          <span className="text-amazon-blue text-xs font-bold italic">prime</span>
          <span className="text-xs text-muted-foreground">FREE Delivery</span>
        </div>

        {/* Add to Cart */}
        <Button
          variant="cart"
          size="sm"
          className="w-full mt-2"
          onClick={() => addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            discount: product.discount,
          })}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
