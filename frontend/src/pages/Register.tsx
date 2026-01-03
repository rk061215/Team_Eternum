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
  User,
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: name,
      });

      // Save extra user data
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        points: 0,
        createdAt: new Date().toISOString(),
      });

      setPopupType("success");
      setPopupMessage("Account created successfully! Welcome to EcoTrack 🌱");
      setPopupOpen(true);

      setTimeout(() => {
        setPopupOpen(false);
        navigate("/dashboard");
      }, 2200);
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
          <div className="absolute top-20 right-10 w-64 h-64 bg-eco-lime/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-eco-lime/5 rounded-full blur-3xl animate-float-delayed" />
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
                Join EcoTrack
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Start earning rewards for sustainable actions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-primary-foreground/90">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      required
                      className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    />
                  </div>
                </div>

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
                  <Label className="text-primary-foreground/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                      minLength={6}
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-primary-foreground/50">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy.
              </p>

              <p className="mt-6 text-center text-sm text-primary-foreground/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-eco-lime font-semibold hover:underline"
                >
                  Sign in
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
              {popupType === "success"
                ? "Account Created"
                : "Registration Failed"}
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

export default Register;
