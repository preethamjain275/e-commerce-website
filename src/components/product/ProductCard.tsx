import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-smooth",
        className
      )}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold">
            -{product.discount}%
          </Badge>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            variant="icon"
            size="icon"
            className="bg-card/90 backdrop-blur-sm shadow-soft hover:bg-card"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-smooth">
          <Button
            variant="accent"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                discount: product.discount,
              });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-accent transition-smooth line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
