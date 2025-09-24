import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, Users, TrendingUp, Clock, CreditCard } from "lucide-react";
import { useAppointments } from "@/contexts/AppointmentContext";

const DashboardStats = () => {
  const { todaysAppointments, appointments } = useAppointments();
  
  // Calculate real-time stats
  const todaysRevenue = todaysAppointments.reduce((sum, apt) => sum + apt.totalPrice, 0);
  const todaysBookings = todaysAppointments.length;
  
  const stats = [
    {
      title: "Today's Revenue",
      value: `$${todaysRevenue}`,
      change: "+12%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Today's Bookings",
      value: todaysBookings.toString(),
      change: "+3",
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Total Appointments", 
      value: appointments.length.toString(),
      change: "+8%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Avg. Service Time",
      value: `${Math.round(todaysAppointments.reduce((sum, apt) => sum + apt.totalDuration, 0) / (todaysAppointments.length || 1))}min`,
      change: "-5min",
      icon: Clock,
      trend: "down"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-secondary' : 'text-accent'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;