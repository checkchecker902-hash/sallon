import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, X } from 'lucide-react';
import { useAppointments, Appointment } from '@/contexts/AppointmentContext';
import { useToast } from '@/hooks/use-toast';

interface AppointmentCancellationProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  cancelledBy: 'customer' | 'staff';
}

const AppointmentCancellation: React.FC<AppointmentCancellationProps> = ({
  appointment,
  isOpen,
  onClose,
  cancelledBy
}) => {
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const { cancelAppointment } = useAppointments();
  const { toast } = useToast();

  const handleCancel = () => {
    if (!appointment) return;

    cancelAppointment(appointment.id, cancelledBy);
    
    toast({
      title: "Appointment Cancelled",
      description: `Appointment for ${appointment.customer.name} has been cancelled successfully.`,
      variant: "destructive",
    });

    // Reset form and close
    setReason('');
    setIsConfirming(false);
    onClose();
  };

  const handleClose = () => {
    setReason('');
    setIsConfirming(false);
    onClose();
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Cancel Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Appointment Details */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Appointment Details:</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Customer:</strong> {appointment.customer.name}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Services:</strong> {appointment.services.map(s => s.name).join(', ')}</p>
              <p><strong>Total:</strong> ${appointment.totalPrice}</p>
            </div>
          </div>

          {/* Cancellation Warning */}
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive">Cancellation Policy:</p>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• This slot will be reopened for booking</li>
                  <li>• {cancelledBy === 'customer' ? 'Customer' : 'Staff member'} will be notified</li>
                  <li>• Action cannot be undone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reason for Cancellation */}
          <div className="space-y-2">
            <Label htmlFor="cancel-reason">Reason for Cancellation (Optional)</Label>
            <Textarea
              id="cancel-reason"
              placeholder="Please provide a reason for this cancellation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Confirmation Step */}
          {!isConfirming ? (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>
                Keep Appointment
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setIsConfirming(true)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Appointment
              </Button>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">
                  Are you sure you want to cancel this appointment?
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsConfirming(false)}
                >
                  Go Back
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancel}
                >
                  Yes, Cancel It
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentCancellation;