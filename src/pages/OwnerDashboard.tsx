import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Settings, 
  BarChart3,
  Scissors,
  Coffee,
  Moon,
  CreditCard,
  Ban,
  Edit,
  Plus,
  Filter,
  Download,
  Bell,
  Crown
} from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ScheduleViews from "@/components/dashboard/ScheduleViews";
import ControlPanel from "@/components/dashboard/ControlPanel";
import AppointmentsList from "@/components/dashboard/AppointmentsList";
import ServicesManagement from "@/components/dashboard/ServicesManagement";
import NotificationPanel from "@/components/dashboard/NotificationPanel";
import RevenueAnalytics from "@/components/dashboard/RevenueAnalytics";
import BusinessSettings from "@/components/dashboard/BusinessSettings";
import { useAppointments } from "@/contexts/AppointmentContext";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRevenueAnalytics, setShowRevenueAnalytics] = useState(false);
  const [analyticsType, setAnalyticsType] = useState<'revenue' | 'performance' | 'customers' | 'export' | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showBusinessSettings, setShowBusinessSettings] = useState(false);
  const [businessSettingType, setBusinessSettingType] = useState<'hours' | 'payment' | 'staff' | null>(null);
  const { pendingAppointments, todaysAppointments } = useAppointments();

  // Listen for custom events from ControlPanel
  useEffect(() => {
    const handleOpenNotifications = () => setShowNotifications(true);
    const handleOpenRevenue = () => {
      setAnalyticsType('revenue');
      setShowRevenueAnalytics(true);
    };
    const handleExportData = () => {
      setAnalyticsType('export');
      setShowRevenueAnalytics(true);
    };

    window.addEventListener('openNotifications', handleOpenNotifications);
    window.addEventListener('openRevenue', handleOpenRevenue);
    window.addEventListener('exportData', handleExportData);

    return () => {
      window.removeEventListener('openNotifications', handleOpenNotifications);
      window.removeEventListener('openRevenue', handleOpenRevenue);
      window.removeEventListener('exportData', handleExportData);
    };
  }, []);

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
                <h1 className="text-2xl font-bold text-primary">Owner Dashboard</h1>
                <p className="text-muted-foreground">Elite Salon Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Badge variant={isOnline ? "secondary" : "destructive"}>
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => {
                  // Add logout functionality here when implemented
                  window.location.href = '/staff-login';
                }}
              >
                <Crown className="w-4 h-4 mr-2" />
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
            <DashboardStats />

            {/* Main Dashboard Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <ScheduleViews />
                
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                      {pendingAppointments.length > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {pendingAppointments.length} pending
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">New booking from {appointment.source}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.customer.name} - {appointment.services.map(s => s.name).join(", ")}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(appointment.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                      {pendingAppointments.length === 0 && (
                        <p className="text-muted-foreground text-center py-4">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <AppointmentsList />
              </TabsContent>

              <TabsContent value="services">
                <ServicesManagement />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Business Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Button 
                        className="h-20 flex flex-col gap-2"
                        onClick={() => {
                          setAnalyticsType('revenue');
                          setShowRevenueAnalytics(true);
                        }}
                      >
                        <DollarSign className="w-6 h-6" />
                        Monthly Revenue
                      </Button>
                      <Button 
                        className="h-20 flex flex-col gap-2" 
                        variant="outline"
                        onClick={() => {
                          setAnalyticsType('performance');
                          setShowRevenueAnalytics(true);
                        }}
                      >
                        <BarChart3 className="w-6 h-6" />
                        Service Performance
                      </Button>
                      <Button 
                        className="h-20 flex flex-col gap-2" 
                        variant="outline"
                        onClick={() => {
                          setAnalyticsType('customers');
                          setShowRevenueAnalytics(true);
                        }}
                      >
                        <Users className="w-6 h-6" />
                        Customer Analytics
                      </Button>
                      <Button 
                        className="h-20 flex flex-col gap-2" 
                        variant="outline"
                        onClick={() => {
                          setAnalyticsType('export');
                          setShowRevenueAnalytics(true);
                        }}
                      >
                        <Download className="w-6 h-6" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Business Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                        onClick={() => {
                          setBusinessSettingType('hours');
                          setShowBusinessSettings(true);
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Working Hours & Availability
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Set opening hours, breaks, and holidays
                          </span>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                        onClick={() => {
                          setBusinessSettingType('payment');
                          setShowBusinessSettings(true);
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Payment Settings
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Configure payment providers and policies
                          </span>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                        onClick={() => {
                          setBusinessSettingType('staff');
                          setShowBusinessSettings(true);
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Staff Management
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Add workers and assign permissions
                          </span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      
      <RevenueAnalytics 
        isOpen={showRevenueAnalytics} 
        onClose={() => setShowRevenueAnalytics(false)}
        type={analyticsType}
      />
      
      <BusinessSettings 
        isOpen={showBusinessSettings} 
        onClose={() => setShowBusinessSettings(false)}
        settingType={businessSettingType}
      />
    </div>
  );
};

export default OwnerDashboard;