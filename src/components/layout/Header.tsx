import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  "All", "Electronics", "Fashion", "Home", "Books", "Toys", "Sports", "Beauty"
];

const navLinks = [
  "Today's Deals",
  "Customer Service", 
  "Gift Cards",
  "Sell",
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-amazon-dark">
        <div className="container mx-auto px-2">
          <div className="flex items-center h-14 gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded">
              <span className="text-xl font-bold text-white">shop</span>
              <span className="text-xl font-bold text-amazon-orange">Kart</span>
            </Link>

            {/* Deliver To */}
            <div className="hidden lg:flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
              <MapPin className="h-4 w-4 text-white mr-1" />
              <div className="text-white">
                <p className="text-xs text-gray-300">Deliver to</p>
                <p className="text-sm font-bold">India</p>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 flex max-w-3xl">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:flex items-center gap-1 bg-gray-200 text-amazon-dark text-xs px-3 rounded-l-md border-r border-gray-300 hover:bg-gray-300">
                    {selectedCategory}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                type="search"
                placeholder="Search ShopKart"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-10 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-yellow px-4 rounded-r-md"
              >
                <Search className="h-5 w-5 text-amazon-dark" />
              </button>
            </form>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded text-white">
                  <span className="text-xs text-gray-300">
                    Hello, {user ? 'User' : 'sign in'}
                  </span>
                  <span className="text-sm font-bold flex items-center">
                    Account & Lists
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      Your Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      Your Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => navigate('/auth')}>
                    Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Returns & Orders */}
            <Link
              to="/orders"
              className="hidden md:flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded text-white"
            >
              <span className="text-xs text-gray-300">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded"
            >
              <div className="relative">
                <ShoppingCart className="h-8 w-8 text-white" />
                <span className="absolute -top-1 left-4 bg-amazon-orange text-amazon-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="hidden md:block text-white font-bold ml-1">Cart</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="icon" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white">
                <SheetHeader>
                  <SheetTitle className="text-amazon-dark text-xl font-bold">Browse</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col mt-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/products?category=${cat.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 px-4 text-amazon-dark hover:bg-gray-100 border-b border-gray-200"
                    >
                      {cat}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  {user ? (
                    <>
                      <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-amazon-dark hover:bg-gray-100">
                        Your Account
                      </Link>
                      <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="py-3 px-4 text-left text-amazon-dark hover:bg-gray-100">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-amazon-dark hover:bg-gray-100">
                      Sign In
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Secondary Nav */}
      <div className="bg-amazon-light">
        <div className="container mx-auto px-2">
          <div className="flex items-center h-10 gap-1 overflow-x-auto scrollbar-hide">
            <button className="flex items-center gap-1 px-2 py-1 text-white text-sm font-bold border border-transparent hover:border-white rounded whitespace-nowrap">
              <Menu className="h-4 w-4" />
              All
            </button>
            {navLinks.map((link) => (
              <Link
                key={link}
                to="/products"
                className="px-2 py-1 text-white text-sm border border-transparent hover:border-white rounded whitespace-nowrap"
              >
                {link}
              </Link>
            ))}
            <Link
              to="/products"
              className="px-2 py-1 text-white text-sm border border-transparent hover:border-white rounded whitespace-nowrap text-amazon-orange font-bold"
            >
              Shop deals in Electronics
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
