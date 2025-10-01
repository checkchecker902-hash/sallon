import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppointments } from "@/contexts/AppointmentContext";
import { toast } from "@/hooks/use-toast";

const CancelBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { appointments, cancelAppointment } = useAppointments();

  const handleCancelBooking = () => {
    if (!bookingId || !email) {
      toast({
        title: "Missing Information",
        description: "Please provide both Booking ID and Email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const appointmentToCancel = appointments.find(
        (apt) => apt.id.toLowerCase() === bookingId.toLowerCase().trim() && apt.customer.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (appointmentToCancel) {
        if (appointmentToCancel.status === 'cancelled') {
          toast({
            title: "Already Cancelled",
            description: "This appointment has already been cancelled.",
          });
        } else {
          cancelAppointment(appointmentToCancel.id, 'customer');
          toast({
            title: "Booking Cancelled",
            description: `Your appointment with ID ${bookingId} has been successfully cancelled.`,
          });
          setBookingId('');
          setEmail('');
        }
      } else {
        toast({
          title: "Cancellation Failed",
          description: "No matching appointment found. Please check your Booking ID and email.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-card">
      <CardHeader>
        <CardTitle>Cancel Your Booking</CardTitle>
        <CardDescription>
          Need to cancel? Enter your booking ID and email address below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bookingId">Booking ID</Label>
          <Input
            id="bookingId"
            placeholder="e.g., BK1A2B3C"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="The email used for the booking"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCancelBooking}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Cancelling..." : "Cancel Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CancelBooking;