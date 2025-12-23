import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/data/products";

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 & Above", min: 200, max: Infinity },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter from URL
    if (categoryParam && categoryParam !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    // Category filter from sidebar
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.toLowerCase())
      );
    }

    // Price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Rating filter
    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, categoryParam, selectedCategories, selectedPriceRange, minRating, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground">
                {searchQuery && `Results for "${searchQuery}" - `}
                {filteredProducts.length} results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Avg. Customer Review</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-sm text-amazon-dark mb-2">Department</h3>
                {categories.slice(1).map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-sm py-1 cursor-pointer hover:text-amazon-orange"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>

              {/* Customer Review */}
              <div>
                <h3 className="font-bold text-sm text-amazon-dark mb-2">Customer Review</h3>
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                    className={`flex items-center gap-1 py-1 w-full text-left ${
                      minRating === rating ? "text-amazon-orange" : ""
                    }`}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? "fill-amazon-orange text-amazon-orange"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-amazon-blue">& Up</span>
                  </button>
                ))}
              </div>

              {/* Price */}
              <div>
                <h3 className="font-bold text-sm text-amazon-dark mb-2">Price</h3>
                {priceRanges.map((range, index) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                    className={`block text-sm py-1 hover:text-amazon-orange ${
                      selectedPriceRange === index ? "text-amazon-orange font-medium" : "text-amazon-dark"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Deals */}
              <div>
                <h3 className="font-bold text-sm text-amazon-dark mb-2">Deals & Discounts</h3>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox />
                  All Discounts
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer mt-1">
                  <Checkbox />
                  Today's Deals
                </label>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-sm">
                  <p className="text-lg text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
