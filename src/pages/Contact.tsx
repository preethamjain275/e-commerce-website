import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, HelpCircle, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const helpTopics = [
  { icon: Package, title: "Track your order", description: "Check the status of your order" },
  { icon: HelpCircle, title: "Returns & Refunds", description: "Return items and get refunds" },
  { icon: MessageSquare, title: "Product inquiry", description: "Ask about products" },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We'll respond within 24 hours.");
    setForm({ name: "", email: "", orderNumber: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-amazon-dark mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-8">We're here to help 24/7</p>

          {/* Quick Help */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {helpTopics.map((topic) => (
              <div
                key={topic.title}
                className="bg-white p-4 rounded-lg border border-border hover:border-amazon-orange cursor-pointer transition-colors"
              >
                <topic.icon className="h-8 w-8 text-amazon-orange mb-2" />
                <h3 className="font-bold text-amazon-dark">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-bold text-amazon-dark mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-amazon-orange" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-amazon-blue">support@shopkart.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-amazon-orange" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-amazon-blue">1-800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-amazon-orange" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">123 Commerce St, Seattle, WA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amazon-yellow/10 p-4 rounded-lg border border-amazon-yellow">
                <h3 className="font-bold text-amazon-dark mb-2">Customer Service Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Available 24 hours a day, 7 days a week
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg border border-border space-y-4"
              >
                <h3 className="font-bold text-lg text-amazon-dark">Send us a message</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Your Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Email Address</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Order Number (optional)</Label>
                    <Input
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      placeholder="e.g., 123-4567890"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Subject</Label>
                    <Input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-bold">Message</Label>
                  <Textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="cart"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
