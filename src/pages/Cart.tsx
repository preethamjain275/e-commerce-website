import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { DealsSection } from "@/components/home/DealsSection";

const Cart = () => {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-sm shadow-card">
              <div className="flex items-start gap-8">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80"
                  alt="Empty cart"
                  className="w-64 h-auto"
                />
                <div>
                  <h1 className="text-2xl font-bold text-amazon-dark mb-2">
                    Your ShopKart Cart is empty
                  </h1>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.
                  </p>
                  <Button variant="cart" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <DealsSection 
                title="Recommended for you"
                filterFn={() => true}
                compact
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = items.reduce((acc, item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return acc + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Cart Items */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white p-6 rounded-sm shadow-card">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h1 className="text-2xl font-bold text-amazon-dark">Shopping Cart</h1>
                  <button 
                    onClick={clearCart}
                    className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline"
                  >
                    Deselect all items
                  </button>
                </div>
                <p className="text-sm text-muted-foreground text-right py-2">Price</p>

                {items.map((item) => {
                  const discountedPrice = item.discount
                    ? item.price * (1 - item.discount / 100)
                    : item.price;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-border"
                    >
                      <Link to={`/product/${item.id}`} className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-lg text-amazon-dark hover:text-amazon-orange">
                            {item.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-green-700 mt-1">In Stock</p>

                        <div className="text-xs text-muted-foreground mt-1">
                          <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input type="checkbox" className="w-3 h-3" />
                            This is a gift
                          </label>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="border border-border rounded px-2 py-1 text-sm bg-secondary"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>Qty: {n}</option>
                            ))}
                          </select>
                          <span className="text-border">|</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline"
                          >
                            Delete
                          </button>
                          <span className="text-border">|</span>
                          <button className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
                            Save for later
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </p>
                        {item.discount && (
                          <p className="text-xs text-muted-foreground line-through">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="text-right py-4">
                  <p className="text-lg">
                    Subtotal ({itemCount} items): 
                    <span className="font-bold ml-1">${subtotal.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Box */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-sm shadow-card sticky top-24">
                <div className="flex items-start gap-2 text-sm text-green-700 mb-3">
                  <span>✓</span>
                  <p>
                    Your order qualifies for FREE Shipping.
                    <span className="text-muted-foreground"> Choose this option at checkout.</span>
                  </p>
                </div>

                <p className="text-lg mb-3">
                  Subtotal ({itemCount} items): 
                  <span className="font-bold ml-1">${subtotal.toFixed(2)}</span>
                </p>

                <label className="flex items-center gap-2 text-sm mb-4">
                  <input type="checkbox" className="w-4 h-4" />
                  This order contains a gift
                </label>

                <Button variant="cart" className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <DealsSection 
              title="Customers who bought items in your cart also bought"
              filterFn={() => true}
              compact
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
