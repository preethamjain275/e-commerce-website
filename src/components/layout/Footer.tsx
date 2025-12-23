import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">LUXE</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Discover premium products curated for the modern lifestyle. Quality meets elegance in every piece.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm">Shop All</Link>
              <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm">About Us</Link>
              <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm">Contact</Link>
              <Link to="/faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm">FAQs</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@luxe.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>123 Luxury Ave, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Newsletter</h4>
            <p className="text-primary-foreground/70 text-sm">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="accent" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 LUXE. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-primary-foreground/50 hover:text-primary-foreground transition-smooth">Privacy Policy</Link>
            <Link to="/terms" className="text-primary-foreground/50 hover:text-primary-foreground transition-smooth">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
