import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/walk", label: "Walk" },
    { href: "/trees", label: "Trees" },
    { href: "/transport", label: "Transport" },
    { href: "/plastic", label: "Plastic" },
    { href: "/rewards", label: "Rewards" },
  ];

  if (isLanding) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-eco-md group-hover:shadow-eco-glow transition-all duration-300">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">EcoTrack</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="glass" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="lime" size="sm">Get Started</Button>
              </Link>
            </div>
            
            <button 
              className="md:hidden text-primary-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur-lg border-t border-white/10">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="glass" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="lime" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-eco-sm group-hover:shadow-eco-md transition-all duration-300">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoTrack</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button 
                  variant={location.pathname === link.href ? "eco" : "ghost"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-eco-lime/10 border border-eco-lime/20">
              <span className="text-sm font-medium text-eco-forest">1,250 pts</span>
              <Leaf className="w-4 h-4 text-eco-lime" />
            </div>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <button 
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}>
                <Button 
                  variant={location.pathname === link.href ? "eco" : "ghost"}
                  className="w-full justify-start"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-eco-lime/10">
                <span className="text-sm font-medium text-eco-forest">1,250 pts</span>
                <Leaf className="w-4 h-4 text-eco-lime" />
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm">Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
