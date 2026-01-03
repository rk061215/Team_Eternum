import { Link } from "react-router-dom";
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
  Flame
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const activities = [
    { 
      icon: Footprints, 
      title: "Walking", 
      points: 120, 
      subtitle: "12 km this week",
      color: "lime" as const,
      href: "/walk"
    },
    { 
      icon: TreeDeciduous, 
      title: "Trees", 
      points: 150, 
      subtitle: "3 trees planted",
      color: "primary" as const,
      href: "/trees"
    },
    { 
      icon: Bus, 
      title: "Transport", 
      points: 85, 
      subtitle: "17 km traveled",
      color: "sky" as const,
      href: "/transport"
    },
    { 
      icon: Recycle, 
      title: "Plastic", 
      points: 60, 
      subtitle: "4 bottles collected",
      color: "orange" as const,
      href: "/plastic"
    },
  ];

  const recentActivities = [
    { action: "Walked 2.5 km", points: "+25", time: "2 hours ago", icon: Footprints },
    { action: "Collected 1 bottle", points: "+15", time: "5 hours ago", icon: Recycle },
    { action: "Bus ride verified", points: "+10", time: "Yesterday", icon: Bus },
    { action: "Tree photo verified", points: "+50", time: "2 days ago", icon: TreeDeciduous },
  ];

  const achievements = [
    { title: "Tree Hero", description: "Plant 5 trees", progress: 60, icon: "🌳" },
    { title: "Marathon Walker", description: "Walk 50 km", progress: 24, icon: "🚶" },
    { title: "Plastic Warrior", description: "Collect 20 bottles", progress: 20, icon: "♻️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Eco Warrior! 👋
            </h1>
            <p className="text-muted-foreground">
              You're making great progress. Keep up the sustainable actions!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Points" 
              value="1,250" 
              subtitle="Lifetime earnings"
              icon={Leaf}
              trend={{ value: 12, isPositive: true }}
              color="lime"
            />
            <StatCard 
              title="CO₂ Saved" 
              value="45.2 kg" 
              subtitle="This month"
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
              color="primary"
            />
            <StatCard 
              title="Weekly Goal" 
              value="68%" 
              subtitle="175 / 250 pts"
              icon={Target}
              color="sky"
            />
            <StatCard 
              title="Current Streak" 
              value="7 days" 
              subtitle="Keep it going!"
              icon={Flame}
              color="orange"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activities */}
            <div className="lg:col-span-2 space-y-6">
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Your Activities</CardTitle>
                  <span className="text-sm text-muted-foreground">This week</span>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {activities.map((activity, index) => (
                      <Link key={index} to={activity.href}>
                        <Card 
                          variant="stat" 
                          className="cursor-pointer hover:shadow-eco-lg"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                activity.color === 'lime' ? 'bg-eco-lime/10 text-eco-lime' :
                                activity.color === 'primary' ? 'bg-primary/10 text-primary' :
                                activity.color === 'sky' ? 'bg-eco-sky/10 text-eco-sky' :
                                'bg-eco-orange/10 text-eco-orange'
                              }`}>
                                <activity.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground">{activity.title}</p>
                                <p className="text-xl font-bold text-foreground">+{activity.points} pts</p>
                                <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <activity.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <span className="text-eco-lime font-semibold">{activity.points}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card variant="eco">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="w-5 h-5 text-eco-lime" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{achievement.icon}</span>
                            <div>
                              <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-primary">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/walk">
                    <Button variant="eco" className="w-full justify-between group">
                      Start Walking
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/trees">
                    <Button variant="outline" className="w-full justify-between group">
                      Plant a Tree
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/rewards">
                    <Button variant="secondary" className="w-full justify-between group">
                      <span className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Redeem Rewards
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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

export default Dashboard;
