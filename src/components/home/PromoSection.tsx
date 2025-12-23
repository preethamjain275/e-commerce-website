import { Link } from "react-router-dom";
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated assistance",
  },
];

export function PromoSection() {
  return (
    <>
      {/* Features */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center space-y-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 bg-gradient-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-accent font-medium uppercase tracking-wider text-sm">
                Limited Time Offer
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Summer Sale
                <span className="block text-accent">Up to 50% Off</span>
              </h2>
              <p className="text-primary-foreground/70 max-w-md">
                Don't miss out on our biggest sale of the season. Premium products at unbeatable prices.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">Shop the Sale</Link>
              </Button>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
                alt="Summer sale"
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-6 rounded-2xl shadow-glow animate-pulse-glow">
                <p className="text-3xl font-bold">50%</p>
                <p className="text-sm font-medium">OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
