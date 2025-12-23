import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-card">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">New Collection 2024</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover Your
              <span className="block text-gradient">Perfect Style</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Explore our curated collection of premium products designed for the modern lifestyle. Quality meets elegance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:h-[600px] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Premium collection"
                className="w-full h-full object-cover rounded-3xl shadow-elevated"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-card animate-float">
                <p className="text-sm text-muted-foreground">Best Seller</p>
                <p className="font-bold text-foreground">Premium Jacket</p>
                <p className="text-accent font-bold">$299.99</p>
              </div>

              {/* Discount Badge */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-4 rounded-full shadow-glow animate-pulse-glow">
                <p className="text-sm font-bold">UP TO</p>
                <p className="text-2xl font-bold">30%</p>
                <p className="text-xs">OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
