import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return acc + price * item.quantity;
  }, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button variant="cart" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Order placed successfully! Thank you for shopping with us.");
    clearCart();
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple Header */}
      <header className="bg-gradient-to-b from-gray-100 to-gray-200 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <span className="text-2xl font-bold text-amazon-dark">shop</span>
            <span className="text-2xl font-bold text-amazon-orange">Kart</span>
          </Link>
          <h1 className="text-2xl text-amazon-dark">
            Checkout (<span className="text-amazon-blue">{itemCount} items</span>)
          </h1>
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-amazon-dark">
                      1. Delivery address
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">Full name</Label>
                      <Input
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">Mobile number</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">Pincode</Label>
                      <Input
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">City</Label>
                      <Input
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-sm font-bold">Address</Label>
                      <Input
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="House No., Building, Street, Area"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">State</Label>
                      <Input
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="border border-border rounded-lg p-4">
                  <h2 className="text-lg font-bold text-amazon-dark mb-4">
                    2. Payment method
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 border border-amazon-orange rounded-lg bg-amazon-yellow/10">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                      <span className="font-medium">Credit or Debit Card</span>
                    </div>

                    <div className="pl-6 space-y-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Card number</Label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={form.cardNumber}
                          onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Name on card</Label>
                        <Input
                          value={form.nameOnCard}
                          onChange={(e) => setForm({ ...form, nameOnCard: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-sm font-bold">Expiry date</Label>
                          <Input
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-bold">CVV</Label>
                          <Input
                            placeholder="123"
                            type="password"
                            value={form.cvv}
                            onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Review */}
                <div className="border border-border rounded-lg p-4">
                  <h2 className="text-lg font-bold text-amazon-dark mb-4">
                    3. Review items and delivery
                  </h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-700 font-medium">
                      Delivery: <span className="font-bold">Tomorrow by 9 PM</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-amazon-dark line-clamp-2">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold">
                            ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-lg p-4 sticky top-4">
                  <Button
                    type="submit"
                    variant="cart"
                    className="w-full mb-3"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place your order"}
                  </Button>

                  <p className="text-xs text-muted-foreground mb-4">
                    By placing your order, you agree to ShopKart's{" "}
                    <a href="#" className="text-amazon-blue hover:underline">privacy notice</a>
                    {" "}and{" "}
                    <a href="#" className="text-amazon-blue hover:underline">conditions of use</a>.
                  </p>

                  <hr className="my-4" />

                  <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({itemCount}):</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping & handling:</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-lg font-bold text-amazon-deal">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
