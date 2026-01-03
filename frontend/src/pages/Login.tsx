import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Leaf,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Shadcn Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Popup states
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setPopupType("success");
      setPopupMessage("Login successful! Welcome back to EcoTrack 🌱");
      setPopupOpen(true);

      setTimeout(() => {
        setPopupOpen(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message
        .replace("Firebase: ", "")
        .replace("auth/", "");

      setPopupType("error");
      setPopupMessage(errorMessage);
      setPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-eco-lime/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-eco-lime/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-eco-lime/20 flex items-center justify-center group-hover:shadow-eco-glow transition">
                <Leaf className="w-7 h-7 text-eco-lime" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">
                EcoTrack
              </span>
            </Link>
          </div>

          {/* Card */}
          <Card variant="glass" className="backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary-foreground">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Sign in to continue your eco journey
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-primary-foreground/90">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                      className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-primary-foreground/90">
                      Password
                    </Label>
                    <a className="text-sm text-eco-lime hover:underline cursor-pointer">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                      className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    />
                  </div>
                </div>

                {/* Button */}
                <Button
                  type="submit"
                  variant="lime"
                  size="lg"
                  className="w-full group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-primary-foreground/70">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-eco-lime font-semibold hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PREMIUM POPUP */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-in fade-in zoom-in">
          <DialogHeader className="text-center space-y-3">
            {popupType === "success" ? (
              <CheckCircle className="mx-auto w-14 h-14 text-eco-lime animate-bounce" />
            ) : (
              <XCircle className="mx-auto w-14 h-14 text-red-400 animate-pulse" />
            )}

            <DialogTitle className="text-xl text-primary-foreground">
              {popupType === "success" ? "Success" : "Login Failed"}
            </DialogTitle>

            <DialogDescription className="text-primary-foreground/70 text-sm">
              {popupMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
