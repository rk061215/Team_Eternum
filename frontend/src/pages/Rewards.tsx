import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { 
  Gift, 
  Ticket, 
  ShoppingBag, 
  Percent,
  Leaf,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

const Rewards = () => {
  const availableRewards = [
    {
      id: 1,
      title: "₹100 Gift Card",
      description: "Redeem at any partner store",
      points: 500,
      icon: ShoppingBag,
      category: "Gift Cards",
      available: true
    },
    {
      id: 2,
      title: "Free Bus Day Pass",
      description: "Unlimited rides for 24 hours",
      points: 300,
      icon: Ticket,
      category: "Transport",
      available: true
    },
    {
      id: 3,
      title: "20% Off Eco Products",
      description: "Valid on sustainable brands",
      points: 200,
      icon: Percent,
      category: "Discounts",
      available: true
    },
    {
      id: 4,
      title: "Plant a Tree Certificate",
      description: "We plant a tree in your name",
      points: 750,
      icon: Leaf,
      category: "Eco Impact",
      available: true
    },
    {
      id: 5,
      title: "₹500 Gift Card",
      description: "Premium partner stores",
      points: 2000,
      icon: ShoppingBag,
      category: "Gift Cards",
      available: false
    },
    {
      id: 6,
      title: "Monthly Bus Pass",
      description: "Unlimited rides for 30 days",
      points: 5000,
      icon: Ticket,
      category: "Transport",
      available: false
    },
  ];

  const claimedRewards = [
    { title: "₹100 Gift Card", date: "Dec 20, 2024", code: "GIFT100ABC", status: "active" },
    { title: "Free Bus Day Pass", date: "Dec 15, 2024", code: "BUS24XYZ", status: "used" },
    { title: "10% Off Coupon", date: "Dec 10, 2024", code: "ECO10OFF", status: "expired" },
  ];

  const userPoints = 1250;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-eco-lime/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-eco-lime" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Rewards Store</h1>
            </div>
            <p className="text-muted-foreground">
              Redeem your eco-points for amazing rewards and discounts.
            </p>
          </div>

          {/* Points Banner */}
          <Card variant="eco" className="mb-8 overflow-hidden">
            <div className="bg-gradient-hero p-8 text-primary-foreground">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm opacity-80 mb-2">Your Balance</p>
                  <div className="flex items-center gap-3">
                    <p className="text-5xl font-bold">{userPoints.toLocaleString()}</p>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20">
                      <Leaf className="w-4 h-4 text-eco-lime" />
                      <span className="text-sm font-medium">Points</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-70 mt-2">Keep earning to unlock more rewards!</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs opacity-70">Active Rewards</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs opacity-70">Total Claimed</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Available Rewards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Available Rewards</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">All</Button>
                  <Button variant="ghost" size="sm">Gift Cards</Button>
                  <Button variant="ghost" size="sm">Transport</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => {
                  const canAfford = userPoints >= reward.points;
                  
                  return (
                    <Card 
                      key={reward.id} 
                      variant="stat"
                      className={`${!canAfford ? 'opacity-60' : ''}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            canAfford ? 'bg-eco-lime/10 text-eco-lime' : 'bg-muted text-muted-foreground'
                          }`}>
                            <reward.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-muted-foreground">{reward.category}</span>
                            <h3 className="font-semibold text-foreground mt-1">{reward.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-1">
                                <Leaf className={`w-4 h-4 ${canAfford ? 'text-eco-lime' : 'text-muted-foreground'}`} />
                                <span className={`font-bold ${canAfford ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {reward.points.toLocaleString()}
                                </span>
                              </div>
                              <Button 
                                variant={canAfford ? "eco" : "secondary"} 
                                size="sm"
                                disabled={!canAfford}
                              >
                                {canAfford ? 'Redeem' : `Need ${(reward.points - userPoints).toLocaleString()} more`}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatCard 
                title="Total Redeemed" 
                value="4,500" 
                subtitle="Points spent"
                icon={Gift}
                color="lime"
              />
              
              {/* Claimed Rewards */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">My Rewards</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {claimedRewards.map((reward, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reward.status === 'active' ? 'bg-eco-lime/10' :
                        reward.status === 'used' ? 'bg-muted' : 'bg-destructive/10'
                      }`}>
                        {reward.status === 'active' ? (
                          <CheckCircle2 className="w-4 h-4 text-eco-lime" />
                        ) : reward.status === 'used' ? (
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Clock className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{reward.title}</p>
                        <p className="text-xs text-muted-foreground">{reward.date}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        reward.status === 'active' ? 'bg-eco-lime/10 text-eco-lime' :
                        reward.status === 'used' ? 'bg-muted text-muted-foreground' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* How to Earn */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-lg">Earn More Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">🚶 Walk 1 km</span>
                    <span className="font-medium text-eco-lime">+10 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">🌳 Plant a tree</span>
                    <span className="font-medium text-eco-lime">+50 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">🚌 Public transport 1 km</span>
                    <span className="font-medium text-eco-lime">+5 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">♻️ Recycle 1 bottle</span>
                    <span className="font-medium text-eco-lime">+15 pts</span>
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

export default Rewards;
