import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Download,
  BarChart3,
  Eye,
  Calendar
} from "lucide-react";

interface RevenueAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'revenue' | 'performance' | 'customers' | 'export' | null;
}

const RevenueAnalytics = ({ isOpen, onClose, type }: RevenueAnalyticsProps) => {
  // Mock data
  const todaysRevenue = {
    total: 485,
    appointments: 12,
    services: [
      { name: "Men's Haircut", count: 5, revenue: 175 },
      { name: "Women's Haircut", count: 3, revenue: 165 },
      { name: "Beard Trim", count: 2, revenue: 50 },
      { name: "Spa Treatment", count: 2, revenue: 95 }
    ],
    staff: [
      { name: "Sarah", appointments: 6, revenue: 245 },
      { name: "Alex", appointments: 4, revenue: 140 },
      { name: "Maria", appointments: 2, revenue: 100 }
    ]
  };

  const monthlyRevenue = [
    { month: "Jan", revenue: 12500, appointments: 298 },
    { month: "Feb", revenue: 11800, appointments: 278 },
    { month: "Mar", revenue: 13200, appointments: 312 },
    { month: "Apr", revenue: 14100, appointments: 334 }
  ];

  const topServices = [
    { name: "Men's Haircut", bookings: 234, revenue: 8190, growth: 12 },
    { name: "Women's Haircut", bookings: 189, revenue: 10395, growth: 8 },
    { name: "Beard Trim", bookings: 156, revenue: 3900, growth: -3 },
    { name: "Spa Treatment", bookings: 98, revenue: 8330, growth: 15 }
  ];

  const customerAnalytics = {
    total: 1247,
    newThisMonth: 89,
    returning: 78,
    averageSpend: 67,
    loyaltyMembers: 234
  };

  const getTitle = () => {
    switch (type) {
      case 'revenue': return "Today's Revenue Breakdown";
      case 'performance': return "Service Performance Analytics";
      case 'customers': return "Customer Analytics Dashboard";
      case 'export': return "Export Data Options";
      default: return "Analytics";
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'revenue':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Total Revenue</span>
                  </div>
                  <p className="text-2xl font-bold">${todaysRevenue.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">Appointments</span>
                  </div>
                  <p className="text-2xl font-bold">{todaysRevenue.appointments}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysRevenue.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.count} bookings</p>
                      </div>
                      <span className="font-bold">${service.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Staff Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysRevenue.staff.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.appointments} appointments</p>
                      </div>
                      <span className="font-bold">${member.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Top Service</span>
                  </div>
                  <p className="text-lg font-bold">Men's Haircut</p>
                  <p className="text-xs text-muted-foreground">234 bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Avg Growth</span>
                  </div>
                  <p className="text-lg font-bold text-accent">+8%</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.bookings} bookings • ${service.revenue} revenue
                        </p>
                      </div>
                      <Badge 
                        variant={service.growth >= 0 ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {service.growth >= 0 ? '+' : ''}{service.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Total Customers</span>
                  </div>
                  <p className="text-2xl font-bold">{customerAnalytics.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Avg Spend</span>
                  </div>
                  <p className="text-2xl font-bold">${customerAnalytics.averageSpend}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-bold text-secondary">{customerAnalytics.newThisMonth}</p>
                  <p className="text-xs text-muted-foreground">New Customers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-bold text-accent">{customerAnalytics.returning}</p>
                  <p className="text-xs text-muted-foreground">Returning</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-bold text-primary">{customerAnalytics.loyaltyMembers}</p>
                  <p className="text-xs text-muted-foreground">Loyalty Members</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Today's Data (CSV)
                  </div>
                  <span className="text-sm text-muted-foreground">
                    All appointments, revenue, and customer data for today
                  </span>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Monthly Report (Excel)
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Comprehensive monthly analytics and performance metrics
                  </span>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Customer Database (CSV)
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Customer contact information and booking history
                  </span>
                </div>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            Detailed analytics and insights for your business
          </DialogDescription>
        </DialogHeader>

        {renderContent()}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RevenueAnalytics;