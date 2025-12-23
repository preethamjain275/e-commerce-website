import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    count: 120,
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    count: 85,
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    count: 200,
  },
  {
    name: "Home",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    count: 150,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium uppercase tracking-wider text-sm">
            Browse By
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Shop Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {category.count} Products
                  </p>
                </div>
                <div className="p-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm group-hover:bg-accent transition-smooth">
                  <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
