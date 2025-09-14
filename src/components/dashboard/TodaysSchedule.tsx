import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Scissors, Edit, Phone } from "lucide-react";

const TodaysSchedule = () => {
  const todaysAppointments = [
    {
      id: 1,
      time: "09:00",
      duration: 45,
      customer: "John Smith",
      phone: "***-***-1234",
      service: "Men's Haircut & Style",
      status: "confirmed",
      worker: "Sarah"
    },
    {
      id: 2,
      time: "10:00",
      duration: 30,
      customer: "Mike Johnson", 
      phone: "***-***-5678",
      service: "Beard Trim",
      status: "in-progress",
      worker: "Alex"
    },
    {
      id: 3,
      time: "11:30",
      duration: 60,
      customer: "Emily Davis",
      phone: "***-***-9012",
      service: "Women's Haircut",
      status: "confirmed",
      worker: "Sarah"
    },
    {
      id: 4,
      time: "14:00",
      duration: 90,
      customer: "Lisa Wilson",
      phone: "***-***-3456",
      service: "Spa Treatment",
      status: "pending",
      worker: "Maria"
    },
    {
      id: 5,
      time: "16:00",
      duration: 45,
      customer: "Robert Brown",
      phone: "***-***-7890",
      service: "Men's Haircut",
      status: "confirmed",
      worker: "Alex"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary text-secondary-foreground';
      case 'in-progress': return 'bg-accent text-accent-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Today's Schedule
          <Badge variant="secondary" className="ml-auto">
            {todaysAppointments.length} appointments
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todaysAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
                  {appointment.time}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{appointment.customer}</span>
                    <Badge 
                      className={`text-xs ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Scissors className="w-3 h-3" />
                      {appointment.service}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appointment.duration}min
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {appointment.worker}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {todaysAppointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysSchedule;