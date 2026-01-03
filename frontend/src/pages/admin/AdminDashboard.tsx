import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/stats/StatCard";
import {
  Users,
  TreeDeciduous,
  Footprints,
  Recycle,
  TrendingUp,
  Globe,
  Award,
  Settings,
  BarChart3,
  AlertTriangle,
  FileText,
  Leaf
} from "lucide-react";

const AdminDashboard = () => {
  const quickStats = [
    { title: "Total Users", value: "24,582", change: "+12%", icon: Users },
    { title: "Trees Planted", value: "15,234", change: "+8%", icon: TreeDeciduous },
    { title: "Active Walks", value: "1,847", change: "+23%", icon: Footprints },
    { title: "Bottles Recycled", value: "45,678", change: "+15%", icon: Recycle },
  ];

  const recentAlerts = [
    { type: "warning", message: "Unusual walking speed detected - User #4521", time: "5 min ago" },
    { type: "info", message: "New vendor machine registered - Central Mall", time: "1 hour ago" },
    { type: "success", message: "Tree verification batch completed - 45 trees", time: "2 hours ago" },
    { type: "warning", message: "Duplicate location detected for tree upload", time: "3 hours ago" },
  ];

  const topDistricts = [
    { name: "Mumbai", users: 4521, trees: 2341, co2: "12.5T" },
    { name: "Delhi", users: 3892, trees: 1987, co2: "10.2T" },
    { name: "Bangalore", users: 3567, trees: 1654, co2: "8.9T" },
    { name: "Chennai", users: 2934, trees: 1432, co2: "7.5T" },
    { name: "Kolkata", users: 2456, trees: 1234, co2: "6.3T" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EcoTrack Admin</h1>
                <p className="text-xs text-muted-foreground">Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link to="/">
                <Button variant="outline" size="sm">Exit Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.change + " this week"}
              icon={stat.icon}
              trend={{ value: parseInt(stat.change), isPositive: true }}
              color={index === 0 ? "primary" : index === 1 ? "lime" : index === 2 ? "sky" : "orange"}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card variant="eco">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-xs">Users</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <TreeDeciduous className="w-5 h-5" />
                    <span className="text-xs">Trees</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-xs">Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Districts */}
            <Card variant="eco">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Top Performing Districts
                </CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b border-border">
                        <th className="pb-3 font-medium">District</th>
                        <th className="pb-3 font-medium">Users</th>
                        <th className="pb-3 font-medium">Trees</th>
                        <th className="pb-3 font-medium">CO₂ Saved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topDistricts.map((district, index) => (
                        <tr key={index} className="border-b border-border/50 last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-eco-lime/20 text-eco-lime' :
                                index === 1 ? 'bg-eco-sky/20 text-eco-sky' :
                                index === 2 ? 'bg-eco-orange/20 text-eco-orange' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="font-medium text-foreground">{district.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-foreground">{district.users.toLocaleString()}</td>
                          <td className="py-3 text-foreground">{district.trees.toLocaleString()}</td>
                          <td className="py-3 text-eco-lime font-medium">{district.co2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Activity Chart Placeholder */}
            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 rounded-xl bg-muted/50 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">Activity Chart</p>
                    <p className="text-sm">Coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card variant="eco">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-eco-orange" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-eco-orange' :
                        alert.type === 'success' ? 'bg-eco-lime' : 'bg-eco-sky'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card variant="eco">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Server</span>
                  <span className="flex items-center gap-2 text-sm text-eco-lime">
                    <span className="w-2 h-2 rounded-full bg-eco-lime" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <span className="flex items-center gap-2 text-sm text-eco-lime">
                    <span className="w-2 h-2 rounded-full bg-eco-lime" />
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">QR Validator</span>
                  <span className="flex items-center gap-2 text-sm text-eco-lime">
                    <span className="w-2 h-2 rounded-full bg-eco-lime" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tree Verifier AI</span>
                  <span className="flex items-center gap-2 text-sm text-eco-orange">
                    <span className="w-2 h-2 rounded-full bg-eco-orange" />
                    Processing
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Top Users */}
            <Card variant="eco">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-eco-lime" />
                  Top Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Priya S.", points: 12450, rank: "🥇" },
                  { name: "Rahul K.", points: 11200, rank: "🥈" },
                  { name: "Anita M.", points: 10890, rank: "🥉" },
                ].map((user, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                  >
                    <span className="text-xl">{user.rank}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
