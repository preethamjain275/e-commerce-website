import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "1000+", label: "Products" },
    { value: "50+", label: "Countries" },
    { value: "4.9", label: "Rating" },
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above everything else.",
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "Every product in our store is carefully curated for quality and durability.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our business operations.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about bringing you the best products at the best prices.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-card">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">LUXE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to bring premium quality products to everyone,
              making luxury accessible without compromising on quality.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Our story"
                  className="rounded-2xl shadow-elevated"
                />
              </div>
              <div className="space-y-6">
                <p className="text-accent font-medium uppercase tracking-wider text-sm">
                  Our Story
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Built with Passion, Delivered with Care
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2020, LUXE started with a simple idea: everyone deserves
                  access to premium quality products. What began as a small online
                  store has grown into a trusted destination for thousands of
                  customers worldwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We work directly with artisans and manufacturers to ensure every
                  product meets our high standards. From sourcing to delivery, we
                  oversee every step to bring you the best shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-accent font-medium uppercase tracking-wider text-sm">
                Our Values
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card p-6 rounded-2xl shadow-soft text-center space-y-4"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
