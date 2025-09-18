import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CreditCard, Users, Save, Plus, Trash2 } from "lucide-react";

interface BusinessSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settingType: 'hours' | 'payment' | 'staff' | null;
}

const BusinessSettings = ({ isOpen, onClose, settingType }: BusinessSettingsProps) => {
  const [workingHours, setWorkingHours] = useState({
    monday: { enabled: true, open: "09:00", close: "18:00" },
    tuesday: { enabled: true, open: "09:00", close: "18:00" },
    wednesday: { enabled: true, open: "09:00", close: "18:00" },
    thursday: { enabled: true, open: "09:00", close: "18:00" },
    friday: { enabled: true, open: "09:00", close: "18:00" },
    saturday: { enabled: true, open: "10:00", close: "16:00" },
    sunday: { enabled: false, open: "10:00", close: "16:00" }
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    cashEnabled: true,
    prepaymentRequired: false,
    cancellationPolicy: "24 hours",
    refundPolicy: "full"
  });

  const [staff, setStaff] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah@salon.com", role: "Senior Stylist", services: ["Haircut", "Color"], active: true },
    { id: 2, name: "Alex Chen", email: "alex@salon.com", role: "Barber", services: ["Men's Haircut", "Beard Trim"], active: true },
    { id: 3, name: "Maria Rodriguez", email: "maria@salon.com", role: "Spa Specialist", services: ["Spa Treatment"], active: true }
  ]);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const renderHoursSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {days.map((day) => (
          <Card key={day}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={workingHours[day as keyof typeof workingHours].enabled}
                    onCheckedChange={(checked) => 
                      setWorkingHours(prev => ({
                        ...prev,
                        [day]: { ...prev[day as keyof typeof workingHours], enabled: checked }
                      }))
                    }
                  />
                  <Label className="capitalize font-medium">{day}</Label>
                </div>
                
                {workingHours[day as keyof typeof workingHours].enabled && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={workingHours[day as keyof typeof workingHours].open}
                      onChange={(e) => 
                        setWorkingHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof workingHours], open: e.target.value }
                        }))
                      }
                      className="w-24"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={workingHours[day as keyof typeof workingHours].close}
                      onChange={(e) => 
                        setWorkingHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof workingHours], close: e.target.value }
                        }))
                      }
                      className="w-24"
                    />
                  </div>
                )}
                
                {!workingHours[day as keyof typeof workingHours].enabled && (
                  <span className="text-muted-foreground">Closed</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => console.log('Save hours', workingHours)}>
          <Save className="w-4 h-4 mr-2" />
          Save Hours
        </Button>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Stripe Payments</Label>
            <Switch
              checked={paymentSettings.stripeEnabled}
              onCheckedChange={(checked) => 
                setPaymentSettings(prev => ({ ...prev, stripeEnabled: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>PayPal Payments</Label>
            <Switch
              checked={paymentSettings.paypalEnabled}
              onCheckedChange={(checked) => 
                setPaymentSettings(prev => ({ ...prev, paypalEnabled: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>Cash Payments</Label>
            <Switch
              checked={paymentSettings.cashEnabled}
              onCheckedChange={(checked) => 
                setPaymentSettings(prev => ({ ...prev, cashEnabled: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Require Prepayment</Label>
            <Switch
              checked={paymentSettings.prepaymentRequired}
              onCheckedChange={(checked) => 
                setPaymentSettings(prev => ({ ...prev, prepaymentRequired: checked }))
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cancellation Policy</Label>
            <Select 
              value={paymentSettings.cancellationPolicy} 
              onValueChange={(value) => 
                setPaymentSettings(prev => ({ ...prev, cancellationPolicy: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 hours">2 hours notice</SelectItem>
                <SelectItem value="24 hours">24 hours notice</SelectItem>
                <SelectItem value="48 hours">48 hours notice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Refund Policy</Label>
            <Select 
              value={paymentSettings.refundPolicy} 
              onValueChange={(value) => 
                setPaymentSettings(prev => ({ ...prev, refundPolicy: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full refund</SelectItem>
                <SelectItem value="partial">Partial refund</SelectItem>
                <SelectItem value="none">No refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={() => console.log('Save payment settings', paymentSettings)}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );

  const renderStaffSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Staff Members</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>
      
      <div className="grid gap-4">
        {staff.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">Services:</p>
                    <p className="text-xs text-muted-foreground">
                      {member.services.join(', ')}
                    </p>
                  </div>
                  
                  <Switch
                    checked={member.active}
                    onCheckedChange={(checked) => 
                      setStaff(prev => prev.map(s => 
                        s.id === member.id ? { ...s, active: checked } : s
                      ))
                    }
                  />
                  
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const getTitle = () => {
    switch (settingType) {
      case 'hours': return 'Working Hours & Availability';
      case 'payment': return 'Payment Settings';
      case 'staff': return 'Staff Management';
      default: return 'Business Settings';
    }
  };

  const getIcon = () => {
    switch (settingType) {
      case 'hours': return <Clock className="w-5 h-5" />;
      case 'payment': return <CreditCard className="w-5 h-5" />;
      case 'staff': return <Users className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          {settingType === 'hours' && renderHoursSettings()}
          {settingType === 'payment' && renderPaymentSettings()}
          {settingType === 'staff' && renderStaffSettings()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessSettings;