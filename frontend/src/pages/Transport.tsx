import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { 
  Bus, 
  MapPin, 
  QrCode, 
  Ticket,
  CheckCircle2,
  ArrowRight,
  Navigation,
  Leaf
} from "lucide-react";

const Transport = () => {
  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState<{
    boarding: string;
    destination: string;
    distance: number;
    points: number;
    code: string;
  } | null>(null);

  const handleGenerateTicket = () => {
    if (boarding && destination) {
      const distance = Math.floor(Math.random() * 15) + 5; // Demo: random 5-20 km
      setTicketData({
        boarding,
        destination,
        distance,
        points: distance * 5,
        code: `ECO${Date.now().toString(36).toUpperCase()}`
      });
      setShowTicket(true);
    }
  };

  const recentTrips = [
    { from: "Central Station", to: "City Mall", distance: 8, points: 40, date: "Today" },
    { from: "Airport Terminal", to: "Downtown", distance: 15, points: 75, date: "Yesterday" },
    { from: "University", to: "Tech Park", distance: 5, points: 25, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-eco-sky/10 flex items-center justify-center">
                <Bus className="w-5 h-5 text-eco-sky" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Public Transport</h1>
            </div>
            <p className="text-muted-foreground">
              Use public transport and earn 5 points per kilometer traveled.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Generate Ticket */}
              {!showTicket ? (
                <Card variant="eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-eco-sky" />
                      Generate Transport Ticket
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="boarding">Boarding Point</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            id="boarding"
                            placeholder="Enter boarding location"
                            value={boarding}
                            onChange={(e) => setBoarding(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <div className="relative">
                          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            id="destination"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-4">
                      <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>

                    <Button 
                      variant="eco" 
                      size="lg" 
                      className="w-full"
                      onClick={handleGenerateTicket}
                      disabled={!boarding || !destination}
                    >
                      <QrCode className="w-5 h-5 mr-2" />
                      Generate QR Ticket
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Distance will be calculated automatically based on route
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card variant="eco" className="overflow-hidden">
                  <div className="bg-gradient-hero p-8 text-center text-primary-foreground">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-eco-lime" />
                    <h2 className="text-2xl font-bold mb-2">Ticket Generated!</h2>
                    <p className="opacity-80">Show this QR code to the conductor</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      {/* QR Code Placeholder */}
                      <div className="w-48 h-48 bg-white rounded-2xl p-4 mb-6 shadow-eco-md">
                        <div className="w-full h-full border-4 border-primary/20 rounded-xl flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-primary" />
                        </div>
                      </div>

                      <div className="w-full space-y-4 text-center">
                        <div className="p-4 bg-muted/50 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1">Ticket Code</p>
                          <p className="text-xl font-mono font-bold text-foreground">{ticketData?.code}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted/50 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">From</p>
                            <p className="font-semibold text-foreground">{ticketData?.boarding}</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">To</p>
                            <p className="font-semibold text-foreground">{ticketData?.destination}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-eco-sky/10 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Distance</p>
                            <p className="text-2xl font-bold text-eco-sky">{ticketData?.distance} km</p>
                          </div>
                          <div className="p-4 bg-eco-lime/10 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Points</p>
                            <p className="text-2xl font-bold text-eco-lime">+{ticketData?.points}</p>
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setShowTicket(false);
                            setBoarding("");
                            setDestination("");
                          }}
                        >
                          Generate New Ticket
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Trips */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Trips</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTrips.map((trip, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-eco-sky/10 flex items-center justify-center">
                          <Bus className="w-5 h-5 text-eco-sky" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-foreground">{trip.from}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{trip.to}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{trip.date} • {trip.distance} km</p>
                        </div>
                        <span className="text-eco-lime font-semibold">+{trip.points} pts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatCard 
                title="Total Distance" 
                value="156 km" 
                subtitle="All time"
                icon={Bus}
                color="sky"
              />
              <StatCard 
                title="Points Earned" 
                value="780" 
                subtitle="From transport"
                icon={Leaf}
                color="lime"
              />
              <StatCard 
                title="Trips This Month" 
                value="23" 
                subtitle="+5 from last month"
                icon={Ticket}
                trend={{ value: 22, isPositive: true }}
                color="primary"
              />

              {/* How it Works */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-eco-sky/10 flex items-center justify-center text-eco-sky font-bold text-sm">1</div>
                    <div>
                      <p className="font-medium text-foreground">Generate Ticket</p>
                      <p className="text-sm text-muted-foreground">Enter boarding & destination</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-eco-sky/10 flex items-center justify-center text-eco-sky font-bold text-sm">2</div>
                    <div>
                      <p className="font-medium text-foreground">Show QR Code</p>
                      <p className="text-sm text-muted-foreground">Conductor scans your ticket</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-eco-lime/10 flex items-center justify-center text-eco-lime font-bold text-sm">✓</div>
                    <div>
                      <p className="font-medium text-foreground">Earn Points</p>
                      <p className="text-sm text-muted-foreground">5 points per kilometer!</p>
                    </div>
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

export default Transport;
