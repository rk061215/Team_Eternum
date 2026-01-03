import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "lime" | "sky" | "orange" | "earth";
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "primary" }: StatCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    lime: "bg-eco-lime/10 text-eco-lime",
    sky: "bg-eco-sky/10 text-eco-sky",
    orange: "bg-eco-orange/10 text-eco-orange",
    earth: "bg-eco-earth/10 text-eco-earth",
  };

  return (
    <Card variant="stat" className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {trend && (
                <span className={`text-sm font-medium ${trend.isPositive ? 'text-eco-lime' : 'text-destructive'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
