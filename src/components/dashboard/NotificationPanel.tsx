import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Users,
  Clock,
  X,
  Send
} from "lucide-react";
import { format } from "date-fns";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [autoReminders, setAutoReminders] = useState(true);

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "New Booking",
      message: "Sarah Johnson booked Women's Haircut for tomorrow 2:00 PM",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      message: "John Smith paid $35 for Men's Haircut",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: "reminder",
      title: "Blocked Days Reminder",
      message: "You have 3 blocked days this week. Remember to notify staff.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    },
    {
      id: 4,
      type: "cancellation",
      title: "Appointment Cancelled",
      message: "Mike Brown cancelled his Beard Trim appointment",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'cancellation': return <X className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-secondary text-secondary-foreground';
      case 'payment': return 'bg-accent text-accent-foreground';
      case 'reminder': return 'bg-muted text-muted-foreground';
      case 'cancellation': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Manage your notifications and reminder settings
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Auto Reminder Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Reminder Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="auto-reminders">Auto Send Appointment Reminders</Label>
                </div>
                <Switch
                  id="auto-reminders"
                  checked={autoReminders}
                  onCheckedChange={setAutoReminders}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Today's Reminders
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Custom Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      notification.read ? 'bg-muted/30' : 'bg-card border-primary/20'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(notification.timestamp, "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Mark All Read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;