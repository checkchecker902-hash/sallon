import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Clock, DollarSign, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ServiceSelector, { Service } from "@/components/ServiceSelector";
import { useAppointments, Appointment } from "@/contexts/AppointmentContext";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get("service");
  const { addAppointment } = useAppointments();
  
  const [view, setView] = useState<'form' | 'confirmation' | 'success'>('form');
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<Appointment | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    const interval = 30;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const handleProceedToConfirmation = () => {
    if (selectedServices.length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedDate || !selectedTime || !customerData.name || !customerData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setView('confirmation');
  };

  const handleFinalizeBooking = () => {
    if (!selectedDate) return;

    const newAppointmentData = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      customer: {
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email || ""
      },
      services: selectedServices,
      totalPrice,
      totalDuration,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      notes: customerData.notes,
      source: 'booking' as const
    };

    const newAppointment = addAppointment(newAppointmentData);
    setConfirmedBookingDetails(newAppointment);

    if (customerData.email) {
      // TODO: Replace with actual email sending service (e.g., SendGrid, Resend).
      // This is a mock email confirmation for demonstration purposes.
      console.log("Simulating sending booking confirmation email to:", customerData.email);
      toast({
        title: "Confirmation Email Sent",
        description: `A confirmation has been sent to ${customerData.email}.`,
      });
    }

    setView('success');
  };


  const renderContent = () => {
    if (view === 'success' && confirmedBookingDetails) {
      return (
        <Card className="shadow-elegant max-w-2xl mx-auto">
          <CardContent className="p-10 text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">Your appointment is set. You will receive a confirmation email shortly.</p>

            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4 mb-8">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-primary">Booking ID</span>
                <span className="font-mono text-secondary">{confirmedBookingDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{new Date(confirmedBookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold">{confirmedBookingDetails.time}</span>
              </div>
              <div className="text-left pt-2 border-t">
                <span className="text-muted-foreground">Services:</span>
                <ul className="list-disc list-inside mt-1">
                  {confirmedBookingDetails.services.map(s => <li key={s.id} className="font-semibold">{s.name}</li>)}
                </ul>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-muted-foreground">Total Duration:</span>
                <span className="font-semibold">{confirmedBookingDetails.totalDuration} min</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-primary pt-2 border-t">
                <span>Total Price:</span>
                <span>${confirmedBookingDetails.totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full" onClick={() => {
                // TODO: Implement PDF generation and download functionality.
                // This is a placeholder for demonstration purposes.
                toast({ title: "Feature coming soon!" });
              }}>Download Confirmation</Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/')}>Back to Homepage</Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (view === 'confirmation') {
      return (
        <Card className="shadow-elegant max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Confirm Your Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg text-primary border-b pb-2">Appointment Details</h3>
              <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-semibold">{selectedDate?.toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time:</span><span className="font-semibold">{selectedTime}</span></div>
              <div className="pt-2 border-t"><span className="text-muted-foreground">Services:</span><ul className="list-disc list-inside mt-1">{selectedServices.map(s => <li key={s.id} className="font-semibold">{s.name} (${s.price})</li>)}</ul></div>
              <div className="flex justify-between pt-2 border-t"><span className="text-muted-foreground">Total Duration:</span><span className="font-semibold">{totalDuration} min</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t"><span className="text-primary">Total Price:</span><span className="text-primary">${totalPrice}</span></div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg text-primary border-b pb-2">Your Information</h3>
              <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-semibold">{customerData.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-semibold">{customerData.phone}</span></div>
              {customerData.email && <div className="flex justify-between"><span className="text-muted-foreground">Email:</span><span className="font-semibold">{customerData.email}</span></div>}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" onClick={() => setView('form')} className="w-full">Edit Details</Button>
              <Button size="lg" onClick={handleFinalizeBooking} className="w-full bg-gradient-hero hover:shadow-glow">Confirm Booking</Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-8 shadow-card">
            <CardHeader><CardTitle className="text-lg">Booking Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {selectedServices.length > 0 ? (
                <>
                  <div className="space-y-3">{selectedServices.map((s) => <div key={s.id} className="pb-3 border-b last:border-b-0"><h4 className="font-semibold text-primary">{s.name}</h4><div className="flex justify-between text-sm mt-1"><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{s.duration}min</span><span className="font-semibold flex items-center gap-1"><DollarSign className="w-4 h-4" />${s.price}</span></div></div>)}</div>
                  <div className="flex justify-between items-center py-2 border-t font-semibold text-lg"><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{totalDuration} min</span></div><div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /><span>${totalPrice}</span></div></div>
                  {selectedDate && selectedTime && <div className="pt-4 border-t"><Badge variant="secondary" className="w-full justify-center py-2">{selectedDate.toLocaleDateString()} at {selectedTime}</Badge></div>}
                </>
              ) : <p className="text-muted-foreground text-center py-8">Select services to see summary</p>}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <ServiceSelector selectedServices={selectedServices} onServicesChange={setSelectedServices} initialServiceId={serviceId || undefined} />
          {selectedServices.length > 0 && <Card className="shadow-card"><CardHeader><CardTitle className="flex items-center gap-2"><span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>Select Date</CardTitle></CardHeader><CardContent><Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) || date.getDay() === 0} className="rounded-md border-0" /></CardContent></Card>}
          {selectedDate && <Card className="shadow-card"><CardHeader><CardTitle className="flex items-center gap-2"><span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>Select Time</CardTitle></CardHeader><CardContent><div className="grid grid-cols-4 sm:grid-cols-6 gap-3">{timeSlots.map((time) => <Button key={time} variant={selectedTime === time ? "default" : "outline"} size="sm" onClick={() => setSelectedTime(time)} className={selectedTime === time ? "bg-secondary hover:bg-secondary/90" : ""}>{time}</Button>)}</div></CardContent></Card>}
          {selectedTime && <Card className="shadow-card"><CardHeader><CardTitle className="flex items-center gap-2"><span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>Your Details</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid sm:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" />Full Name *</Label><Input id="name" value={customerData.name} onChange={(e) => setCustomerData({...customerData, name: e.target.value})} placeholder="Enter your full name" required /></div><div className="space-y-2"><Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" />Phone Number *</Label><Input id="phone" type="tel" value={customerData.phone} onChange={(e) => setCustomerData({...customerData, phone: e.target.value})} placeholder="Your phone number" required /></div></div><div className="space-y-2"><Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" />Email (for confirmation)</Label><Input id="email" type="email" value={customerData.email} onChange={(e) => setCustomerData({...customerData, email: e.target.value})} placeholder="your.email@example.com" /></div><div className="space-y-2"><Label htmlFor="notes" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" />Special Requests (Optional)</Label><Textarea id="notes" value={customerData.notes} onChange={(e) => setCustomerData({...customerData, notes: e.target.value})} placeholder="Any special requests or notes..." rows={3} /></div><Button onClick={handleProceedToConfirmation} className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300" size="lg">Review and Confirm</Button></CardContent></Card>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => view === 'form' ? navigate("/") : setView('form')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-primary">
            {view === 'form' && 'Book Your Appointment'}
            {view === 'confirmation' && 'Confirm Your Booking'}
            {view === 'success' && 'Booking Successful'}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Booking;