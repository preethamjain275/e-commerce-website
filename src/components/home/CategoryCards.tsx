import { Link } from "react-router-dom";

const categoryCards = [
  {
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    link: "/products?category=electronics",
  },
  {
    title: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    link: "/products?category=fashion",
  },
  {
    title: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80",
    link: "/products?category=home",
  },
  {
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    link: "/products?category=beauty",
  },
];

export function CategoryCards() {
  return (
    <div className="container mx-auto px-4 -mt-32 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryCards.map((category) => (
          <Link
            key={category.title}
            to={category.link}
            className="bg-white p-4 rounded-sm shadow-card hover:shadow-card-hover transition-shadow"
          >
            <h3 className="font-bold text-lg text-amazon-dark mb-2">{category.title}</h3>
            <div className="aspect-square overflow-hidden mb-3">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
              Shop now
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
