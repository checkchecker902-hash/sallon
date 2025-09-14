import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Phone,
  Mail,
  Clock,
  User,
  DollarSign
} from "lucide-react";

const AppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const appointments = [
    {
      id: "APP001",
      date: "2024-12-20",
      time: "09:00",
      customer: {
        name: "John Smith",
        phone: "+1-234-567-8901",
        email: "john@example.com"
      },
      service: "Men's Haircut & Style",
      duration: 45,
      price: 35,
      status: "confirmed",
      worker: "Sarah Johnson",
      paymentStatus: "paid"
    },
    {
      id: "APP002",
      date: "2024-12-20",
      time: "10:30",
      customer: {
        name: "Emily Davis",
        phone: "+1-234-567-8902",
        email: "emily@example.com"
      },
      service: "Women's Haircut",
      duration: 60,
      price: 55,
      status: "pending",
      worker: "Sarah Johnson",
      paymentStatus: "pending"
    },
    {
      id: "APP003",
      date: "2024-12-21",
      time: "14:00",
      customer: {
        name: "Mike Johnson",
        phone: "+1-234-567-8903",
        email: "mike@example.com"
      },
      service: "Beard Trim",
      duration: 30,
      price: 25,
      status: "confirmed",
      worker: "Alex Rodriguez",
      paymentStatus: "paid"
    },
    {
      id: "APP004",
      date: "2024-12-21",
      time: "16:30",
      customer: {
        name: "Lisa Wilson",
        phone: "+1-234-567-8904",
        email: "lisa@example.com"
      },
      service: "Spa Treatment",
      duration: 90,
      price: 85,
      status: "cancelled",
      worker: "Maria Garcia",
      paymentStatus: "refunded"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'refunded': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && appointment.date === "2024-12-20") ||
                       (dateFilter === "tomorrow" && appointment.date === "2024-12-21");
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Appointments Management
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  {/* Header Row */}
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {appointment.id}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </Badge>
                    <Badge className={`text-xs ${getPaymentStatusColor(appointment.paymentStatus)}`}>
                      {appointment.paymentStatus}
                    </Badge>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {appointment.customer.phone}
                    </div>
                  </div>
                  
                  {/* Service Details */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {appointment.date} at {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appointment.duration}min
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      ${appointment.price}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">{appointment.service}</span>
                    <span className="text-muted-foreground"> with {appointment.worker}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No appointments found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;