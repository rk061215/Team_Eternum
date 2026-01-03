import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import {
  Leaf,
  Footprints,
  TreeDeciduous,
  Bus,
  Recycle,
  Gift,
  TrendingUp,
  Target,
  Award,
  ArrowRight,
  Flame,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

/* -------------------------------------------------- */
/* Smooth cinematic reveal (Apple-like)                */
/* -------------------------------------------------- */

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

const Reveal = ({ children, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------- */
/* Dashboard                                           */
/* -------------------------------------------------- */

const Dashboard = () => {
  /* 🌫️ Very slow ambient glow drift */
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 0.002) % 1);
    }, 16);
    return () => clearInterval(id);
  }, []);

  /* ---------------- DATA (UNCHANGED) ---------------- */

  const activities = [
    { icon: Footprints, title: "Walking", points: 120, subtitle: "12 km this week", color: "lime" as const, href: "/walk" },
    { icon: TreeDeciduous, title: "Trees", points: 150, subtitle: "3 trees planted", color: "primary" as const, href: "/trees" },
    { icon: Bus, title: "Transport", points: 85, subtitle: "17 km traveled", color: "sky" as const, href: "/transport" },
    { icon: Recycle, title: "Plastic", points: 60, subtitle: "4 bottles collected", color: "orange" as const, href: "/plastic" },
  ];

  const achievements = [
    { title: "Tree Hero", description: "Plant 5 trees", progress: 60, icon: "🌳" },
    { title: "Marathon Walker", description: "Walk 50 km", progress: 24, icon: "🚶" },
    { title: "Plastic Warrior", description: "Collect 20 bottles", progress: 20, icon: "♻️" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <Navbar />

      {/* 🖼️ Background image layer */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/images/dashboard-bg.jpg')",
          filter: "brightness(0.35) blur(2px)",
        }}
      />

      {/* 🌿 Slow ambient glow layer */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              900px at ${40 + Math.sin(phase * 2 * Math.PI) * 10}% 
              ${30 + Math.cos(phase * 2 * Math.PI) * 10}%,
              rgba(34,197,94,0.14),
              transparent 60%
            ),
            radial-gradient(
              800px at ${70 + Math.cos(phase * 2 * Math.PI) * 8}% 
              ${75 + Math.sin(phase * 2 * Math.PI) * 8}%,
              rgba(16,185,129,0.10),
              transparent 65%
            )
          `,
        }}
      />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-14 relative z-10">

          {/* Welcome */}
          <Reveal>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black">
                Welcome back, Eco Warrior! 👋
              </h1>
              <p className="text-black/70">
                You're making great progress. Keep up the sustainable actions!
              </p>
            </div>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0}><StatCard title="Total Points" value="1,250" subtitle="Lifetime earnings" icon={Leaf} trend={{ value: 12, isPositive: true }} color="lime" /></Reveal>
            <Reveal delay={140}><StatCard title="CO₂ Saved" value="45.2 kg" subtitle="This month" icon={TrendingUp} trend={{ value: 8, isPositive: true }} color="primary" /></Reveal>
            <Reveal delay={280}><StatCard title="Weekly Goal" value="68%" subtitle="175 / 250 pts" icon={Target} color="sky" /></Reveal>
            <Reveal delay={420}><StatCard title="Current Streak" value="7 days" subtitle="Keep it going!" icon={Flame} color="orange" /></Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Activities */}
            <Reveal>
              <Card className="lg:col-span-2 bg-background/75 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_80px_rgba(34,197,94,0.25)] transition-all duration-700">
                <CardHeader>
                  <CardTitle>Your Activities</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {activities.map((a, i) => (
                    <Reveal key={i} delay={i * 120}>
                      <Link to={a.href}>
                        <Card className="bg-background/70 backdrop-blur-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-700">
                          <CardContent className="p-4 flex items-center gap-4">
                            <a.icon className="w-6 h-6 text-eco-lime" />
                            <div>
                              <p className="font-semibold">+{a.points} pts</p>
                              <p className="text-xs text-muted-foreground">{a.subtitle}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </Reveal>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

            {/* Achievements */}
            <Reveal delay={200}>
              <Card className="bg-background/75 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-eco-lime" /> Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((a, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{a.icon} {a.title}</span>
                        <span>{a.progress}%</span>
                      </div>
                      <Progress value={a.progress} className="h-2 transition-all duration-[900ms]" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

          </div>

          {/* Quick Actions */}
          <Reveal delay={300}>
            <Card className="bg-background/75 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-700">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/walk"><Button className="w-full justify-between">Start Walking <ArrowRight /></Button></Link>
                <Link to="/trees"><Button variant="outline" className="w-full justify-between">Plant a Tree <ArrowRight /></Button></Link>
                <Link to="/rewards"><Button variant="secondary" className="w-full justify-between"><span className="flex gap-2"><Gift /> Redeem Rewards</span><ArrowRight /></Button></Link>
              </CardContent>
            </Card>
          </Reveal>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

