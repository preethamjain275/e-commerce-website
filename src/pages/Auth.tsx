import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in.");
            setIsLogin(true);
          } else {
            toast.error(error.message);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold text-amazon-dark">shop</span>
            <span className="text-2xl font-bold text-amazon-orange">Kart</span>
            <span className="text-sm text-muted-foreground">.in</span>
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-sm">
          <div className="border border-border rounded-lg p-6">
            <h1 className="text-2xl font-medium text-amazon-dark mb-4">
              {isLogin ? "Sign in" : "Create account"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm font-bold">Your name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="First and last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9"
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-bold">
                  {isLogin ? "Email or mobile phone number" : "Email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9"
                />
                {errors.email && (
                  <p className="text-xs text-amazon-deal">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-bold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "" : "At least 6 characters"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-amazon-deal">{errors.password}</p>
                )}
                {!isLogin && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="text-amazon-blue">ℹ</span>
                    Passwords must be at least 6 characters.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="cart"
                className="w-full rounded-lg"
                disabled={loading}
              >
                {loading ? "Please wait..." : isLogin ? "Sign in" : "Create your ShopKart account"}
              </Button>
            </form>

            {isLogin && (
              <p className="text-xs text-muted-foreground mt-4">
                By continuing, you agree to ShopKart's{" "}
                <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline">
                  Conditions of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline">
                  Privacy Notice
                </a>.
              </p>
            )}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-muted-foreground">
                {isLogin ? "New to ShopKart?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="w-full border border-border rounded-lg py-2 text-sm hover:bg-secondary transition-colors"
          >
            {isLogin ? "Create your ShopKart account" : "Sign in"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-6 bg-gradient-to-b from-transparent to-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-xs text-amazon-blue mb-2">
            <a href="#" className="hover:text-amazon-orange hover:underline">Conditions of Use</a>
            <a href="#" className="hover:text-amazon-orange hover:underline">Privacy Notice</a>
            <a href="#" className="hover:text-amazon-orange hover:underline">Help</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 ShopKart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
