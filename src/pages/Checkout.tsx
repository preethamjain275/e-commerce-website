import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Shield, CreditCard, Banknote, Wallet, Truck, CheckCircle2, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

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
    upiId: "",
    bank: "",
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
  const codCharges = paymentMethod === "cod" ? 4.99 : 0;
  const finalTotal = total + codCharges;

  // Generate order ID
  const generateOrderId = () => {
    return "ORD" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  // Delivery date calculation
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
              <p className="text-muted-foreground mb-6">Thank you for your order</p>
              
              <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-bold text-amazon-blue">{orderId}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Payment Method</span>
                  <span className="font-medium capitalize">
                    {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : paymentMethod === "netbanking" ? "Net Banking" : "Credit/Debit Card"}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-amazon-deal">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium text-green-600">{getDeliveryDate()}</span>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 text-left">Track Your Order</h3>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-5 left-0 right-0 h-1 bg-muted -z-10" />
                  <div className="absolute top-5 left-0 w-1/4 h-1 bg-amazon-orange -z-10" />
                  
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-amazon-orange flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs mt-2 text-center">Order<br/>Placed</span>
                  </div>
                  
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs mt-2 text-center text-muted-foreground">Order<br/>Confirmed</span>
                  </div>
                  
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs mt-2 text-center text-muted-foreground">Shipped</span>
                  </div>
                  
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs mt-2 text-center text-muted-foreground">Delivered</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="cart" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Go to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
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

  const validateStep1 = () => {
    if (!form.fullName || !form.phone || !form.pincode || !form.address || !form.city || !form.state) {
      toast.error("Please fill all address fields");
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment details
    if (paymentMethod === "card") {
      if (!form.cardNumber || !form.expiry || !form.cvv || !form.nameOnCard) {
        toast.error("Please fill all card details");
        return;
      }
      if (form.cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Please enter a valid card number");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!form.upiId || !form.upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID");
        return;
      }
    } else if (paymentMethod === "netbanking") {
      if (!form.bank) {
        toast.error("Please select a bank");
        return;
      }
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Simple Header */}
      <header className="bg-gradient-to-b from-muted to-muted/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <span className="text-2xl font-bold text-amazon-dark">shop</span>
            <span className="text-2xl font-bold text-amazon-orange">Kart</span>
          </Link>
          <h1 className="text-2xl text-foreground">
            Checkout (<span className="text-amazon-blue">{itemCount} items</span>)
          </h1>
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-amazon-orange" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-amazon-orange text-white" : "bg-muted"}`}>1</div>
              <span className="font-medium hidden sm:inline">Address</span>
            </div>
            <div className="w-12 h-0.5 bg-muted" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-amazon-orange" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-amazon-orange text-white" : "bg-muted"}`}>2</div>
              <span className="font-medium hidden sm:inline">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-muted" />
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-amazon-orange" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-amazon-orange text-white" : "bg-muted"}`}>3</div>
              <span className="font-medium hidden sm:inline">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <form onSubmit={handlePlaceOrder}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Shipping Address */}
                {step === 1 && (
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <h2 className="text-lg font-bold text-foreground mb-4">
                      Delivery Address
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Full name</Label>
                        <Input
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Mobile number</Label>
                        <Input
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Pincode/ZIP</Label>
                        <Input
                          value={form.pincode}
                          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                          placeholder="Enter pincode"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">City</Label>
                        <Input
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <Label className="text-sm font-bold">Address</Label>
                        <Input
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          placeholder="House No., Building, Street, Area"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">State</Label>
                        <Input
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                          placeholder="Enter state"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button type="button" variant="cart" onClick={handleContinueToPayment} className="w-full md:w-auto">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Options */}
                {step === 2 && (
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-foreground">
                        Payment Method
                      </h2>
                      <button type="button" onClick={() => setStep(1)} className="text-amazon-blue text-sm hover:underline">
                        Change Address
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Credit/Debit Card */}
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "card" ? "border-amazon-orange bg-amazon-yellow/10" : "border-border hover:border-amazon-orange/50"}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="w-4 h-4" />
                          <CreditCard className="h-5 w-5 text-amazon-blue" />
                          <span className="font-medium">Credit / Debit Card</span>
                          <div className="flex gap-1 ml-auto">
                            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=30&h=20&fit=crop" alt="Visa" className="h-5 rounded" />
                            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=30&h=20&fit=crop" alt="Mastercard" className="h-5 rounded" />
                          </div>
                        </div>
                        
                        {paymentMethod === "card" && (
                          <div className="mt-4 pl-7 space-y-3">
                            <div className="space-y-1">
                              <Label className="text-sm">Card number</Label>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                value={form.cardNumber}
                                onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-sm">Name on card</Label>
                              <Input
                                placeholder="Enter name as on card"
                                value={form.nameOnCard}
                                onChange={(e) => setForm({ ...form, nameOnCard: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-sm">Expiry date</Label>
                                <Input
                                  placeholder="MM/YY"
                                  value={form.expiry}
                                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-sm">CVV</Label>
                                <Input
                                  placeholder="123"
                                  type="password"
                                  value={form.cvv}
                                  onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* UPI */}
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "upi" ? "border-amazon-orange bg-amazon-yellow/10" : "border-border hover:border-amazon-orange/50"}`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="w-4 h-4" />
                          <Wallet className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">UPI (GPay, PhonePe, Paytm)</span>
                        </div>
                        
                        {paymentMethod === "upi" && (
                          <div className="mt-4 pl-7">
                            <div className="space-y-1">
                              <Label className="text-sm">UPI ID</Label>
                              <Input
                                placeholder="yourname@upi"
                                value={form.upiId}
                                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Net Banking */}
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "netbanking" ? "border-amazon-orange bg-amazon-yellow/10" : "border-border hover:border-amazon-orange/50"}`}
                        onClick={() => setPaymentMethod("netbanking")}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === "netbanking"} onChange={() => setPaymentMethod("netbanking")} className="w-4 h-4" />
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">Net Banking</span>
                        </div>
                        
                        {paymentMethod === "netbanking" && (
                          <div className="mt-4 pl-7">
                            <div className="space-y-1">
                              <Label className="text-sm">Select Bank</Label>
                              <select 
                                className="w-full border border-border rounded-md p-2 bg-background"
                                value={form.bank}
                                onChange={(e) => setForm({ ...form, bank: e.target.value })}
                              >
                                <option value="">Select your bank</option>
                                <option value="sbi">State Bank of India</option>
                                <option value="hdfc">HDFC Bank</option>
                                <option value="icici">ICICI Bank</option>
                                <option value="axis">Axis Bank</option>
                                <option value="kotak">Kotak Mahindra Bank</option>
                                <option value="chase">Chase Bank</option>
                                <option value="bofa">Bank of America</option>
                                <option value="wells">Wells Fargo</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cash on Delivery */}
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-amazon-orange bg-amazon-yellow/10" : "border-border hover:border-amazon-orange/50"}`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-4 h-4" />
                          <Banknote className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Cash on Delivery</span>
                          <span className="ml-auto text-sm text-muted-foreground">+$4.99 COD charges</span>
                        </div>
                        
                        {paymentMethod === "cod" && (
                          <div className="mt-3 pl-7 text-sm text-muted-foreground">
                            <p>Pay when your order arrives at your doorstep. Please keep exact change ready.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button type="button" variant="cart" onClick={() => setStep(3)} className="w-full md:w-auto">
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="space-y-6">
                    {/* Address Summary */}
                    <div className="border border-border rounded-lg p-4 bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-foreground">Delivery Address</h2>
                        <button type="button" onClick={() => setStep(1)} className="text-amazon-blue text-sm hover:underline">Change</button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {form.fullName}<br />
                        {form.address}, {form.city}<br />
                        {form.state} - {form.pincode}<br />
                        Phone: {form.phone}
                      </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="border border-border rounded-lg p-4 bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-foreground">Payment Method</h2>
                        <button type="button" onClick={() => setStep(2)} className="text-amazon-blue text-sm hover:underline">Change</button>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? `UPI - ${form.upiId}` : paymentMethod === "netbanking" ? `Net Banking - ${form.bank}` : `Card ending in ${form.cardNumber.slice(-4)}`}
                      </p>
                    </div>

                    {/* Items Review */}
                    <div className="border border-border rounded-lg p-4 bg-card">
                      <h2 className="font-bold text-foreground mb-4">Review Items</h2>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4 flex items-center gap-2">
                        <Truck className="h-5 w-5 text-green-600" />
                        <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                          Estimated Delivery: <span className="font-bold">{getDeliveryDate()}</span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 border-b border-border last:border-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-contain rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-foreground line-clamp-2">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-sm font-bold text-amazon-deal">
                                ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-lg p-4 sticky top-4 bg-card">
                  {step === 3 && (
                    <Button
                      type="submit"
                      variant="cart"
                      className="w-full mb-3"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order (Pay on Delivery)" : "Place Order & Pay"}
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground mb-4">
                    By placing your order, you agree to ShopKart's{" "}
                    <a href="#" className="text-amazon-blue hover:underline">privacy notice</a>
                    {" "}and{" "}
                    <a href="#" className="text-amazon-blue hover:underline">conditions of use</a>.
                  </p>

                  <hr className="my-4 border-border" />

                  <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({itemCount}):</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-amazon-orange">
                        <span>COD Charges:</span>
                        <span>+$4.99</span>
                      </div>
                    )}
                  </div>

                  <hr className="my-3 border-border" />

                  <div className="flex justify-between text-lg font-bold text-amazon-deal">
                    <span>Order Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
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