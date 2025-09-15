import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Clock, User, Scissors, Edit, Phone, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, subDays } from "date-fns";

const ScheduleViews = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [viewingDate, setViewingDate] = useState<Date>(new Date());

  // Mock appointments data - would come from backend
  const appointments = [
    {
      id: 1,
      date: "2024-01-20",
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
      date: "2024-01-20", 
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
      date: "2024-01-21",
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
      date: "2024-01-21",
      time: "14:00", 
      duration: 90,
      customer: "Lisa Wilson",
      phone: "***-***-3456",
      service: "Spa Treatment",
      status: "pending",
      worker: "Maria"
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

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(apt => apt.date === date);
  };

  const hasBookingsOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return getAppointmentsForDate(dateStr).length > 0;
  };

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const tomorrowStr = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const yesterdayStr = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const viewingDateStr = format(viewingDate, "yyyy-MM-dd");

  const todaysAppointments = getAppointmentsForDate(todayStr);
  const tomorrowsAppointments = getAppointmentsForDate(tomorrowStr);
  const yesterdaysAppointments = getAppointmentsForDate(yesterdayStr);
  const selectedDateAppointments = getAppointmentsForDate(selectedDateStr);
  const viewingDateAppointments = getAppointmentsForDate(viewingDateStr);

  const navigateDay = (direction: 'prev' | 'next') => {
    setViewingDate(prev => direction === 'next' ? addDays(prev, 1) : subDays(prev, 1));
  };

  const getDateLabel = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (dateStr === todayStr) return "Today";
    if (dateStr === tomorrowStr) return "Tomorrow";
    if (dateStr === yesterdayStr) return "Yesterday";
    return format(date, "EEEE, MMM d");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {/* Navigation Schedule */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {getDateLabel(viewingDate)} Schedule
                  <Badge variant="secondary">
                    {viewingDateAppointments.length} appointments
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateDay('prev')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setViewingDate(new Date())}
                    disabled={format(viewingDate, "yyyy-MM-dd") === todayStr}
                  >
                    Today
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateDay('next')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {viewingDateAppointments.map((appointment) => (
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
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
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
                
                {viewingDateAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled for {getDateLabel(viewingDate).toLowerCase()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule - Always visible */}
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
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
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
                
                {todaysAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Monthly Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                    modifiers={{
                      booked: (date) => hasBookingsOnDate(date)
                    }}
                    modifiersStyles={{
                      booked: { 
                        backgroundColor: 'hsl(var(--muted))',
                        color: 'hsl(var(--muted-foreground))',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                  
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded border"></div>
                      <span>Has Bookings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-background rounded border"></div>
                      <span>Available</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-80">
                  <h4 className="font-semibold mb-3">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </h4>
                  
                  <div className="space-y-3">
                    {selectedDateAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="p-3 border rounded-lg bg-card"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono bg-muted px-2 py-1 rounded text-xs">
                            {appointment.time}
                          </span>
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <p className="font-medium text-sm">{appointment.customer}</p>
                        <p className="text-xs text-muted-foreground">{appointment.service}</p>
                      </div>
                    ))}
                    
                    {selectedDateAppointments.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <p className="text-sm">No appointments on this date</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleViews;