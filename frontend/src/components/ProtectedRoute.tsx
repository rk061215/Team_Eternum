import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // Tumhari firebase file
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase listener jo check karta hai user logged in hai ya nahi
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Jab tak check kar raha hai, Loading spinner dikhao
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Agar user nahi hai, toh Login page par bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user hai, toh jo page maanga tha wo dikha do (Dashboard etc.)
  return <>{children}</>;
};

export default ProtectedRoute;