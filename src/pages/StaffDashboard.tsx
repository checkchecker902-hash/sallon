import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  Scissors,
  Bell,
  LogOut,
  CheckCircle,
  XCircle,
  UserCheck
} from "lucide-react";
import { useStaff } from '@/contexts/StaffContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import AppointmentCancellation from '@/components/AppointmentCancellation';

const StaffDashboard = () => {
  const { authState, logout } = useStaff();
  const { appointments, updateAppointment } = useAppointments();
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Get appointments assigned to this staff member
  const staffAppointments = appointments.filter(apt => 
    apt.worker === authState.user?.name && apt.status !== 'cancelled'
  );

  const todaysAppointments = staffAppointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const upcomingAppointments = staffAppointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date > today;
  });

  const handleStatusUpdate = (appointmentId: string, status: string) => {
    updateAppointment(appointmentId, { status: status as any });
  };

  const handleCancelAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!authState.isAuthenticated || authState.userType !== 'staff') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Please log in as staff to access this dashboard.</p>
          <Button onClick={() => window.location.href = '/'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-hero rounded-full w-10 h-10 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Staff Dashboard</h1>
                <p className="text-muted-foreground text-sm">Welcome back, {authState.user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-center">
              <Badge variant="secondary">
                {authState.user?.role}
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todaysAppointments.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${todaysAppointments.reduce((sum, apt) => sum + apt.totalPrice, 0)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
                <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Today's Appointments ({todaysAppointments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {todaysAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">No appointments scheduled for today</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {todaysAppointments.map((appointment) => (
                          <div 
                            key={appointment.id}
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <h3 className="font-medium">{appointment.customer.name}</h3>
                                  <Badge variant={
                                    appointment.status === 'completed' ? 'default' :
                                    appointment.status === 'in-progress' ? 'secondary' :
                                    appointment.status === 'confirmed' ? 'outline' : 'destructive'
                                  }>
                                    {appointment.status}
                                  </Badge>
                                </div>
                                
                                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                                  <div>Time: <span className="font-semibold text-foreground">{appointment.time}</span></div>
                                  <div>Duration: <span className="font-semibold text-foreground">{appointment.totalDuration}min</span></div>
                                  <div className="sm:col-span-2">Services: <span className="font-semibold text-foreground">{appointment.services.map(s => s.name).join(', ')}</span></div>
                                  <div>Total: <span className="font-semibold text-foreground">${appointment.totalPrice}</span></div>
                                </div>
                                
                                {appointment.customer.phone && (
                                  <div className="text-sm text-muted-foreground">
                                    Phone: {appointment.customer.phone}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-2 w-full md:w-auto">
                                {appointment.status === 'confirmed' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleStatusUpdate(appointment.id, 'in-progress')}
                                    className="flex-1"
                                  >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Start Service
                                  </Button>
                                )}
                                
                                {appointment.status === 'in-progress' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Complete
                                  </Button>
                                )}
                                
                                {appointment.status !== 'completed' && (
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleCancelAppointment(appointment)}
                                    className="flex-1"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Appointments ({upcomingAppointments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">No upcoming appointments</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div 
                            key={appointment.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{appointment.customer.name}</h3>
                                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                  <div>Date: <span className="font-semibold text-foreground">{new Date(appointment.date).toLocaleDateString()}</span></div>
                                  <div>Time: <span className="font-semibold text-foreground">{appointment.time}</span></div>
                                  <div className="sm:col-span-2">Services: <span className="font-semibold text-foreground">{appointment.services.map(s => s.name).join(', ')}</span></div>
                                  <div>Total: <span className="font-semibold text-foreground">${appointment.totalPrice}</span></div>
                                </div>
                              </div>
                              <Badge variant="outline" className="mt-2 sm:mt-0">
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                        <p className="font-medium text-blue-900">Schedule Update</p>
                        <p className="text-sm text-blue-700 mt-1">
                          You have {todaysAppointments.length} appointments scheduled for today.
                        </p>
                        <span className="text-xs text-blue-600">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                        <p className="font-medium text-green-900">System Message</p>
                        <p className="text-sm text-green-700 mt-1">
                          Welcome to your staff dashboard! You can view and manage your appointments here.
                        </p>
                        <span className="text-xs text-green-600">
                          System
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Break Time
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Message to Owner
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  View Customer History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Appointment Cancellation Dialog */}
      <AppointmentCancellation
        appointment={selectedAppointment}
        isOpen={showCancelDialog}
        onClose={() => {
          setShowCancelDialog(false);
          setSelectedAppointment(null);
        }}
        cancelledBy="staff"
      />
    </div>
  );
};

export default StaffDashboard;