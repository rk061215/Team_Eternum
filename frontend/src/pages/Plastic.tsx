import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { 
  Recycle, 
  Ticket, 
  CheckCircle2,
  XCircle,
  Leaf,
  TrendingUp,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Plastic = () => {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleRedeem = () => {
    if (!code) return;
    
    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      if (code.length === 6) {
        toast({
          title: "Code Redeemed! 🎉",
          description: "You earned 15 points for recycling a bottle.",
        });
        setCode("");
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid 6-character code.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const recentRedemptions = [
    { code: "ABC123", points: 15, date: "2 hours ago", status: "success" },
    { code: "XYZ789", points: 15, date: "Yesterday", status: "success" },
    { code: "DEF456", points: 15, date: "2 days ago", status: "success" },
    { code: "INVALID", points: 0, date: "3 days ago", status: "failed" },
  ];

  const vendorLocations = [
    { name: "Central Mall", address: "123 Main Street", bottles: 156 },
    { name: "City Park", address: "456 Green Avenue", bottles: 89 },
    { name: "University Campus", address: "789 Education Blvd", bottles: 234 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-eco-orange/10 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-eco-orange" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Plastic Collection</h1>
            </div>
            <p className="text-muted-foreground">
              Collect plastic bottles at vendor machines and earn 15 points per bottle.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Redeem Code */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-eco-orange" />
                    Redeem Bottle Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-hero rounded-2xl text-center text-primary-foreground">
                    <Recycle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-bold mb-2">How to Get a Code</h3>
                    <p className="text-sm opacity-80 max-w-md mx-auto">
                      Visit any EcoTrack vendor machine, deposit a plastic bottle, 
                      and receive a unique 6-character code.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="code">Enter Bottle Code</Label>
                    <div className="flex gap-4">
                      <Input 
                        id="code"
                        placeholder="Enter 6-character code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        className="text-center text-xl tracking-widest font-mono uppercase"
                      />
                      <Button 
                        variant="eco" 
                        size="lg"
                        onClick={handleRedeem}
                        disabled={!code || isValidating}
                      >
                        {isValidating ? "Validating..." : "Redeem"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Each code can only be used once
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Redemptions */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Redemptions</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRedemptions.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.status === 'success' ? 'bg-eco-lime/10' : 'bg-destructive/10'
                        }`}>
                          {item.status === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-eco-lime" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-mono font-medium text-foreground">{item.code}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <span className={`font-semibold ${
                          item.status === 'success' ? 'text-eco-lime' : 'text-destructive'
                        }`}>
                          {item.status === 'success' ? `+${item.points} pts` : 'Invalid'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vendor Locations */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle>Nearby Vendor Machines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendorLocations.map((location, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-eco-orange/10 flex items-center justify-center">
                          <Recycle className="w-6 h-6 text-eco-orange" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{location.bottles}</p>
                          <p className="text-xs text-muted-foreground">bottles collected</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatCard 
                title="Bottles Collected" 
                value="24" 
                subtitle="All time"
                icon={Recycle}
                color="orange"
              />
              <StatCard 
                title="Points Earned" 
                value="360" 
                subtitle="From recycling"
                icon={Leaf}
                color="lime"
              />
              <StatCard 
                title="Plastic Saved" 
                value="1.2 kg" 
                subtitle="From landfills"
                icon={TrendingUp}
                trend={{ value: 15, isPositive: true }}
                color="primary"
              />

              {/* Achievements */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-eco-orange" />
                    Recycling Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥉</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">Starter</p>
                        <p className="text-xs text-muted-foreground">10 bottles</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-eco-lime" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">Collector</p>
                        <p className="text-xs text-muted-foreground">50 bottles</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">26 more</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥇</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">Warrior</p>
                        <p className="text-xs text-muted-foreground">100 bottles</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">76 more</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Plastic;
