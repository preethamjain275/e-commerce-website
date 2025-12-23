import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { DealsSection } from "@/components/home/DealsSection";
import { ProductGrid } from "@/components/home/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoryCards />
        
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Today's Deals */}
          <DealsSection 
            title="Today's Deals" 
            filterFn={(p) => !!p.discount}
            compact
          />

          {/* Category Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductGrid title="Top picks in Electronics" category="Electronics" />
            <ProductGrid title="Refresh your style" category="Fashion" />
            <ProductGrid title="For your home" category="Home" />
            <div className="bg-white p-4 rounded-sm shadow-card">
              <h2 className="text-xl font-bold text-amazon-dark mb-4">Sign in for your best experience</h2>
              <button 
                onClick={() => window.location.href = '/auth'}
                className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark text-sm font-medium py-2 rounded-lg"
              >
                Sign in securely
              </button>
            </div>
          </div>

          {/* Best Sellers */}
          <DealsSection 
            title="Best Sellers" 
            filterFn={(p) => p.featured}
          />

          {/* More Category Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-sm shadow-card lg:col-span-2">
              <h2 className="text-xl font-bold text-amazon-dark mb-4">Shop by Category</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="/products?category=electronics" className="text-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&q=80" 
                    alt="Electronics"
                    className="w-full aspect-video object-cover rounded mb-2 group-hover:opacity-90"
                  />
                  <span className="text-sm text-amazon-dark">Electronics</span>
                </a>
                <a href="/products?category=fashion" className="text-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&q=80" 
                    alt="Fashion"
                    className="w-full aspect-video object-cover rounded mb-2 group-hover:opacity-90"
                  />
                  <span className="text-sm text-amazon-dark">Fashion</span>
                </a>
                <a href="/products?category=home" className="text-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&q=80" 
                    alt="Home"
                    className="w-full aspect-video object-cover rounded mb-2 group-hover:opacity-90"
                  />
                  <span className="text-sm text-amazon-dark">Home & Kitchen</span>
                </a>
                <a href="/products?category=beauty" className="text-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80" 
                    alt="Beauty"
                    className="w-full aspect-video object-cover rounded mb-2 group-hover:opacity-90"
                  />
                  <span className="text-sm text-amazon-dark">Beauty</span>
                </a>
              </div>
            </div>
            <ProductGrid title="Top rated products" />
            <div className="bg-white p-4 rounded-sm shadow-card">
              <h2 className="text-xl font-bold text-amazon-dark mb-4">Easy returns</h2>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" 
                alt="Returns"
                className="w-full aspect-video object-cover rounded mb-3"
              />
              <p className="text-sm text-muted-foreground mb-3">
                Not satisfied? Return most items within 30 days for a full refund.
              </p>
              <a href="/returns" className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
                Learn more
              </a>
            </div>
          </div>

          {/* Recommended */}
          <DealsSection 
            title="Recommended for you" 
            filterFn={() => true}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
