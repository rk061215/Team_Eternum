import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { 
  Footprints, 
  Play, 
  Pause, 
  Square, 
  MapPin, 
  Clock, 
  Zap,
  TrendingUp,
  Target,
  Leaf
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Walk = () => {
  const [isWalking, setIsWalking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(0);

  const handleStart = () => {
    setIsWalking(true);
    setIsPaused(false);
    // Simulate walking for demo
    const interval = setInterval(() => {
      setDistance(prev => prev + 0.01);
      setSteps(prev => prev + 13);
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsWalking(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSpeed = time > 0 ? (distance / (time / 3600)).toFixed(1) : "0.0";
  const earnedPoints = Math.floor(distance * 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-eco-lime/10 flex items-center justify-center">
                <Footprints className="w-5 h-5 text-eco-lime" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Walking Tracker</h1>
            </div>
            <p className="text-muted-foreground">
              Earn 10 points for every kilometer you walk. Start your eco-journey!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Tracker */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Walk Card */}
              <Card variant="eco" className="overflow-hidden">
                <div className="bg-gradient-hero p-8 text-center text-primary-foreground">
                  <div className="mb-6">
                    <p className="text-sm opacity-80 mb-2">Distance Covered</p>
                    <p className="text-6xl font-bold">{distance.toFixed(2)}</p>
                    <p className="text-xl opacity-80">kilometers</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Clock className="w-5 h-5 mx-auto mb-2 opacity-80" />
                      <p className="text-2xl font-bold">{formatTime(time)}</p>
                      <p className="text-xs opacity-60">Duration</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Zap className="w-5 h-5 mx-auto mb-2 opacity-80" />
                      <p className="text-2xl font-bold">{currentSpeed}</p>
                      <p className="text-xs opacity-60">km/h</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Leaf className="w-5 h-5 mx-auto mb-2 text-eco-lime" />
                      <p className="text-2xl font-bold text-eco-lime">+{earnedPoints}</p>
                      <p className="text-xs opacity-60">Points</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    {!isWalking ? (
                      <Button 
                        variant="lime" 
                        size="xl" 
                        className="px-12"
                        onClick={handleStart}
                      >
                        <Play className="w-6 h-6 mr-2" />
                        Start Walk
                      </Button>
                    ) : (
                      <>
                        {isPaused ? (
                          <Button 
                            variant="lime" 
                            size="lg"
                            onClick={handleResume}
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Resume
                          </Button>
                        ) : (
                          <Button 
                            variant="glass" 
                            size="lg"
                            onClick={handlePause}
                          >
                            <Pause className="w-5 h-5 mr-2" />
                            Pause
                          </Button>
                        )}
                        <Button 
                          variant="glass" 
                          size="lg"
                          onClick={handleStop}
                        >
                          <Square className="w-5 h-5 mr-2" />
                          Stop
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Speed Indicator */}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Speed Check</span>
                    <span className={`text-sm font-medium ${
                      parseFloat(currentSpeed) <= 6 ? 'text-eco-lime' : 'text-destructive'
                    }`}>
                      {parseFloat(currentSpeed) <= 6 ? '✓ Valid Walking' : '⚠ Too Fast'}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((parseFloat(currentSpeed) / 7) * 100, 100)} 
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Valid walking speed: 2-6 km/h • Current: {currentSpeed} km/h
                  </p>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Live Route
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Map will appear here</p>
                      <p className="text-sm">Start walking to see your route</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <StatCard 
                title="Steps Today" 
                value={steps.toLocaleString()} 
                subtitle="Goal: 10,000"
                icon={Footprints}
                color="lime"
              />
              <StatCard 
                title="Weekly Distance" 
                value="12.5 km" 
                subtitle="+2.3 km from last week"
                icon={TrendingUp}
                trend={{ value: 18, isPositive: true }}
                color="primary"
              />
              <StatCard 
                title="Weekly Goal" 
                value="62%" 
                subtitle="15.5 / 25 km"
                icon={Target}
                color="sky"
              />

              {/* Tips Card */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-lg">Walking Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-lg">🚶</span>
                    <p className="text-muted-foreground">Keep a steady pace between 2-6 km/h for valid points</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-lg">📱</span>
                    <p className="text-muted-foreground">Keep the app open for accurate tracking</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-lg">🏆</span>
                    <p className="text-muted-foreground">Walk 5km daily for 7 days to earn bonus!</p>
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

export default Walk;
