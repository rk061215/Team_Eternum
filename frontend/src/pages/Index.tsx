import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Leaf, 
  Footprints, 
  TreeDeciduous, 
  Bus, 
  Recycle, 
  Gift, 
  ArrowRight,
  Users,
  Globe,
  Award,
  ChevronDown
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
}

const FadeInSection = ({ children, delay = 0 }: FadeInSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
    >
      {children}
    </div>
  );
};



const Index = () => {
  const features = [
    {
      icon: Footprints,
      title: "Walking Tracker",
      description: "Earn points for every kilometer you walk. Anti-cheat protection ensures fair rewards.",
      color: "bg-eco-lime/10 text-eco-lime",
      points: "10 pts/km"
    },
    {
      icon: TreeDeciduous,
      title: "Tree Plantation",
      description: "Plant trees and earn permanent green dots on the world map after verification.",
      color: "bg-primary/10 text-primary",
      points: "50 pts/tree"
    },
    {
      icon: Bus,
      title: "Public Transport",
      description: "Use public transport and scan QR tickets to earn eco-points.",
      color: "bg-eco-sky/10 text-eco-sky",
      points: "5 pts/km"
    },
    {
      icon: Recycle,
      title: "Plastic Collection",
      description: "Collect plastic bottles and redeem codes at vendor machines for rewards.",
      color: "bg-eco-orange/10 text-eco-orange",
      points: "15 pts/bottle"
    },
  ];

  const stats = [
    { value: "2.5M+", label: "Active Users", icon: Users },
    { value: "15M+", label: "Trees Planted", icon: TreeDeciduous },
    { value: "500K+", label: "CO₂ Saved (tons)", icon: Globe },
    { value: "10M+", label: "Rewards Claimed", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  
  {/* 🎥 Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/src/assets/greenbg.mp4" type=" Video/mp4" />
  </video>
  <div className="absolute inset-0 pointer-events-none">
  <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-eco-lime rounded-full blur-lg animate-ping" />
  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-eco-lime rounded-full blur-md animate-ping delay-1000" />
</div>


  {/* 🌑 Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/40" />

  {/* ✨ Dynamic green lighting glow */}
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-eco-lime/20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-eco-lime/10 rounded-full blur-3xl animate-float" />
  </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-eco-lime/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-eco-lime/5 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse-slow" />
        </div>
        
        {/* Floating Leaves */}
        <div className="absolute inset-0 pointer-events-none">
          <Leaf className="absolute top-1/4 left-[15%] w-8 h-8 text-eco-lime/30 animate-float" />
          <Leaf className="absolute top-1/3 right-[20%] w-6 h-6 text-eco-lime/20 animate-float-delayed" />
          <Leaf className="absolute bottom-1/3 left-[30%] w-10 h-10 text-eco-lime/25 animate-float" />
          <TreeDeciduous className="absolute bottom-1/4 right-[15%] w-12 h-12 text-eco-lime/20 animate-float-delayed" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* 🌟 Light Halo Behind Text */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="w-[600px] h-[600px] bg-eco-lime/20 rounded-full blur-[140px] animate-pulse-slow" />
</div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground/90 text-sm font-medium">
              <Leaf className="w-4 h-4 text-eco-lime" />
              <span>Earn rewards for sustainable actions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white relative">
  <span className="block drop-shadow-[0_0_30px_rgba(34,197,94,0.35)]">
    Make Earth Green,
  </span>
  <span className="block text-eco-lime drop-shadow-[0_0_45px_rgba(34,197,94,0.8)] animate-pulse-slow">
    Get Rewarded
  </span>
</h1>

            
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Track your eco-friendly activities, plant trees, collect plastic, and earn points for a sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
               <Button
  variant="lime"
  size="xl"
  className="group shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:shadow-[0_0_45px_rgba(34,197,94,0.9)] transition-all"
>

                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl">
                  I Have an Account
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/60">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce-slow" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative -mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-10 relative z-20">
  {stats.map((stat, index) => (
    <FadeInSection key={index} delay={index * 120}>
      <Card variant="eco" className="text-center">
        <CardContent className="pt-8 pb-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
            <stat.icon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </CardContent>
      </Card>
    </FadeInSection>
  ))}
</div>

      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeInSection>
  <div className="text-center max-w-2xl mx-auto mb-16">
    <h2 className="text-4xl font-bold text-foreground mb-4">
      Four Ways to Earn
    </h2>
    <p className="text-lg text-muted-foreground">
      Choose your eco-activities and start earning points that convert to real rewards.
    </p>
  </div>
</FadeInSection>

          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature, index) => (
    <FadeInSection key={index} delay={index * 150}>
      <Card
        variant="eco"
        className="group hover:shadow-eco-lg transition-all duration-300 hover:-translate-y-1"
      >
        <CardContent className="pt-8 pb-6">
          <div
            className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
          >
            <feature.icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {feature.description}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-lime/10 text-eco-forest text-sm font-semibold">
            <Leaf className="w-4 h-4 text-eco-lime" />
            {feature.points}
          </div>
        </CardContent>
      </Card>
    </FadeInSection>
  ))}
</div>

        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-lime/10 text-eco-forest text-sm font-semibold">
                <Gift className="w-4 h-4 text-eco-lime" />
                Reward System
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Turn Points into Real Rewards
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your eco-points are valuable! Redeem them for gift vouchers, free bus tickets, partner discounts, and exclusive merchandise.
              </p>
              <ul className="space-y-3">
                {["Gift vouchers & coupons", "Free public transport tickets", "Partner brand discounts", "Exclusive eco merchandise"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-eco-lime/20 flex items-center justify-center">
                      <Leaf className="w-3 h-3 text-eco-lime" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button variant="eco" size="lg" className="mt-4">
                  Start Earning Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-hero p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { label: "Gift Card", value: "500 pts" },
                    { label: "Bus Pass", value: "300 pts" },
                    { label: "Discount", value: "200 pts" },
                    { label: "Merch", value: "750 pts" },
                  ].map((reward, i) => (
                    <div 
                      key={i}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center text-primary-foreground hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <p className="text-2xl font-bold mb-1">{reward.value}</p>
                      <p className="text-sm opacity-80">{reward.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-eco-lime/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-eco-lime/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join millions of eco-warriors and start earning rewards for your sustainable lifestyle today.
            </p>
            <Link to="/register">
              <Button variant="lime" size="xl" className="group">
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
