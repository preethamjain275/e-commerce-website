import { Link } from "react-router-dom";
import { products } from "@/data/products";

interface ProductGridProps {
  title: string;
  category?: string;
}

export function ProductGrid({ title, category }: ProductGridProps) {
  const filteredProducts = category 
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase()).slice(0, 4)
    : products.slice(0, 4);

  return (
    <div className="bg-white p-4 rounded-sm shadow-card">
      <h2 className="text-xl font-bold text-amazon-dark mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-xs text-amazon-dark line-clamp-2">{product.name}</p>
          </Link>
        ))}
      </div>
      <Link
        to={`/products${category ? `?category=${category}` : ''}`}
        className="block mt-3 text-amazon-blue text-sm hover:text-amazon-orange hover:underline"
      >
        See more
      </Link>
    </div>
  );
}
