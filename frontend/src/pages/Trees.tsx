import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { 
  TreeDeciduous, 
  Camera, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Globe,
  Leaf,
  Upload
} from "lucide-react";

const Trees = () => {
  const [showCamera, setShowCamera] = useState(false);

  const myTrees = [
    { 
      id: 1, 
      location: "Central Park, New York", 
      date: "2024-01-15", 
      status: "permanent",
      points: 100
    },
    { 
      id: 2, 
      location: "Green Valley, Mumbai", 
      date: "2024-01-20", 
      status: "pending",
      points: 50,
      daysLeft: 22
    },
    { 
      id: 3, 
      location: "City Garden, London", 
      date: "2024-01-25", 
      status: "pending",
      points: 50,
      daysLeft: 27
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TreeDeciduous className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Tree Plantation</h1>
            </div>
            <p className="text-muted-foreground">
              Plant trees and earn permanent green dots on the world map. 50 points per tree!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Section */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Upload New Tree
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition-colors cursor-pointer"
                    onClick={() => setShowCamera(true)}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Take a Photo
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Camera only - gallery uploads not allowed for verification
                    </p>
                    <Button variant="eco">
                      <Camera className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-eco-lime/10 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-eco-lime" />
                      How Green Dots Work
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-eco-lime/30 flex items-center justify-center text-xs">1</span>
                        Upload a photo → Get temporary green dot (30 days)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-eco-lime/30 flex items-center justify-center text-xs">2</span>
                        After 30 days, upload verification photo from same location
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-eco-lime flex items-center justify-center text-xs text-white">✓</span>
                        Verified → Permanent green dot + extra 50 points!
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* My Trees */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Planted Trees</CardTitle>
                  <span className="text-sm text-muted-foreground">{myTrees.length} trees</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTrees.map((tree) => (
                      <div 
                        key={tree.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tree.status === 'permanent' 
                            ? 'bg-eco-lime/20' 
                            : 'bg-eco-orange/20'
                        }`}>
                          {tree.status === 'permanent' ? (
                            <CheckCircle2 className="w-6 h-6 text-eco-lime" />
                          ) : (
                            <Clock className="w-6 h-6 text-eco-orange" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <p className="font-medium text-foreground">{tree.location}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Planted on {new Date(tree.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          {tree.status === 'permanent' ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco-lime/10 text-eco-lime text-sm font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </span>
                          ) : (
                            <div>
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco-orange/10 text-eco-orange text-sm font-medium">
                                {tree.daysLeft} days left
                              </span>
                              <Button variant="ghost" size="sm" className="mt-2">
                                Verify Now
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* World Map */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    World Tree Map
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-eco-lime" />
                      Permanent
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-eco-orange" />
                      Pending
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/1] rounded-xl bg-gradient-hero flex items-center justify-center relative overflow-hidden">
                    {/* Simulated map dots */}
                    <div className="absolute inset-0">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-3 h-3 rounded-full ${
                            i % 3 === 0 ? 'bg-eco-lime animate-pulse' : 'bg-eco-lime/60'
                          }`}
                          style={{
                            left: `${15 + Math.random() * 70}%`,
                            top: `${15 + Math.random() * 70}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-center text-primary-foreground z-10">
                      <Globe className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Interactive Map Coming Soon</p>
                      <p className="text-sm opacity-70">15,234 trees planted globally</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatCard 
                title="Total Trees" 
                value="3" 
                subtitle="1 verified, 2 pending"
                icon={TreeDeciduous}
                color="primary"
              />
              <StatCard 
                title="Points Earned" 
                value="200" 
                subtitle="From tree planting"
                icon={Leaf}
                color="lime"
              />
              <StatCard 
                title="CO₂ Offset" 
                value="48 kg" 
                subtitle="Per year (estimated)"
                icon={Globe}
                color="sky"
              />

              {/* Info Card */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-eco-orange" />
                    Important
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>📸 Only camera photos accepted - no gallery uploads</p>
                  <p>📍 GPS location is recorded with each photo</p>
                  <p>🕒 Timestamp is embedded for verification</p>
                  <p>✅ Re-verify from same location after 30 days</p>
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

export default Trees;
