import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Package, Users, Globe, Award } from "lucide-react";

const About = () => {
  const stats = [
    { value: "10M+", label: "Products", icon: Package },
    { value: "50M+", label: "Customers", icon: Users },
    { value: "100+", label: "Countries", icon: Globe },
    { value: "#1", label: "E-commerce", icon: Award },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              About <span className="text-amazon-orange">ShopKart</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're on a mission to be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-10 w-10 text-amazon-orange mx-auto mb-3" />
                  <p className="text-3xl font-bold text-amazon-dark">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-amazon-dark mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  ShopKart started with a simple idea: make shopping accessible to everyone, everywhere. What began as an online bookstore has evolved into a global marketplace offering everything from electronics to groceries.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, we serve millions of customers across the globe, offering unparalleled selection, competitive prices, and fast, reliable delivery.
                </p>
                <p className="text-muted-foreground">
                  Our commitment to customer satisfaction drives everything we do. From our easy returns policy to our 24/7 customer support, we're always here to help.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                  alt="Our warehouse"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-amazon-dark text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-amazon-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold text-amazon-dark mb-2">Customer Obsession</h3>
                <p className="text-muted-foreground">
                  We start with the customer and work backwards. We work vigorously to earn and keep customer trust.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-amazon-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold text-amazon-dark mb-2">Insist on Excellence</h3>
                <p className="text-muted-foreground">
                  We have relentlessly high standards. We continually raise the bar and drive our teams to deliver high-quality products.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-amazon-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold text-amazon-dark mb-2">Think Big</h3>
                <p className="text-muted-foreground">
                  Thinking small is a self-fulfilling prophecy. We create and communicate a bold direction that inspires results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
