import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface DealsSectionProps {
  title: string;
  viewAllLink?: string;
  filterFn?: (product: any) => boolean;
  compact?: boolean;
}

export function DealsSection({ 
  title, 
  viewAllLink = "/products",
  filterFn = () => true,
  compact = false 
}: DealsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredProducts = products.filter(filterFn);

  return (
    <div className="bg-white p-4 rounded-sm shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-amazon-dark">{title}</h2>
        <Link to={viewAllLink} className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
          See all deals
        </Link>
      </div>

      {/* Products Carousel */}
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-48">
              <ProductCard product={product} compact={compact} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
