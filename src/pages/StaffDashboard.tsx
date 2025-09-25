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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-hero rounded-full w-10 h-10 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Staff Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {authState.user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {authState.user?.role}
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
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
              <TabsList className="grid w-full grid-cols-3">
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
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-medium">{appointment.customer.name}</h3>
                                  <Badge variant={
                                    appointment.status === 'completed' ? 'default' :
                                    appointment.status === 'in-progress' ? 'secondary' :
                                    appointment.status === 'confirmed' ? 'outline' : 'destructive'
                                  }>
                                    {appointment.status}
                                  </Badge>
                                </div>
                                
                                <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                                  <div>Time: {appointment.time}</div>
                                  <div>Duration: {appointment.totalDuration}min</div>
                                  <div>Services: {appointment.services.map(s => s.name).join(', ')}</div>
                                  <div>Total: ${appointment.totalPrice}</div>
                                </div>
                                
                                {appointment.customer.phone && (
                                  <div className="text-sm text-muted-foreground">
                                    Phone: {appointment.customer.phone}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {appointment.status === 'confirmed' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleStatusUpdate(appointment.id, 'in-progress')}
                                  >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Start Service
                                  </Button>
                                )}
                                
                                {appointment.status === 'in-progress' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleStatusUpdate(appointment.id, 'completed')}
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
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{appointment.customer.name}</h3>
                                <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                  <div>Date: {new Date(appointment.date).toLocaleDateString()}</div>
                                  <div>Time: {appointment.time}</div>
                                  <div>Services: {appointment.services.map(s => s.name).join(', ')}</div>
                                  <div>Total: ${appointment.totalPrice}</div>
                                </div>
                              </div>
                              <Badge variant="outline">
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