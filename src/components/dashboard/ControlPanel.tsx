import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  Moon, 
  CreditCard, 
  Ban, 
  DollarSign, 
  Clock,
  Settings,
  Calendar,
  Zap
} from "lucide-react";

const ControlPanel = () => {
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [prepaymentRequired, setPrepaymentRequired] = useState(true);
  const [servicesDisabled, setServicesDisabled] = useState<string[]>([]);

  const services = [
    { id: 'mens-haircut', name: "Men's Haircut", price: 35, duration: 45 },
    { id: 'womens-haircut', name: "Women's Haircut", price: 55, duration: 60 },
    { id: 'beard-trim', name: "Beard Trim", price: 25, duration: 30 },
    { id: 'spa-treatment', name: "Spa Treatment", price: 85, duration: 90 }
  ];

  const toggleServiceDisabled = (serviceId: string) => {
    setServicesDisabled(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-6 sticky top-8">
      
      {/* Quick Controls */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5" />
            Quick Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Break Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <Label htmlFor="break-mode">Break Mode</Label>
            </div>
            <Switch
              id="break-mode"
              checked={isOnBreak}
              onCheckedChange={setIsOnBreak}
            />
          </div>
          
          {isOnBreak && (
            <Badge variant="destructive" className="w-full justify-center py-2">
              On Break - No new bookings
            </Badge>
          )}

          {/* Prepayment Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <Label htmlFor="prepayment">Require Prepayment</Label>
            </div>
            <Switch
              id="prepayment"
              checked={prepaymentRequired}
              onCheckedChange={setPrepaymentRequired}
            />
          </div>

          {/* Night Mode */}
          <Button 
            variant="outline" 
            className="w-full justify-start"
          >
            <Moon className="w-4 h-4 mr-2" />
            Night Mode (Close Early)
          </Button>
          
          {/* Block Day */}
          <Button 
            variant="outline" 
            className="w-full justify-start"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Block Date
          </Button>
        </CardContent>
      </Card>

      {/* Service Controls */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            Service Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      ${service.price}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}min
                    </span>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant={servicesDisabled.includes(service.id) ? "destructive" : "outline"}
                  onClick={() => toggleServiceDisabled(service.id)}
                >
                  <Ban className="w-3 h-3" />
                </Button>
              </div>
              
              {servicesDisabled.includes(service.id) && (
                <Badge variant="destructive" className="w-full justify-center text-xs py-1">
                  Disabled for today
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" size="sm">
            View Today's Revenue
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Send Reminder Messages
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Export Today's Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;