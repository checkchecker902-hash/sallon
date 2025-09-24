import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Clock, DollarSign, User, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ServiceSelector, { Service } from "@/components/ServiceSelector";
import { useAppointments } from "@/contexts/AppointmentContext";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get("service");
  const { addAppointment } = useAppointments();
  
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

  const handleConfirmBooking = () => {
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

    // Create the appointment
    const newAppointment = {
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

    addAppointment(newAppointment);

    // Show success message
    const serviceNames = selectedServices.map(s => s.name).join(", ");
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment for ${serviceNames} has been booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}. You will receive a confirmation call shortly.`,
    });

    // Navigate to home
    navigate("/");
  };


  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-primary">Book Your Appointment</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedServices.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {selectedServices.map((service) => (
                        <div key={service.id} className="pb-3 border-b last:border-b-0">
                          <h4 className="font-semibold text-primary">{service.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration}min
                            </span>
                            <span className="flex items-center gap-1 font-semibold">
                              <DollarSign className="w-4 h-4" />
                              ${service.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-t font-semibold text-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{totalDuration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="pt-4 border-t">
                        <Badge variant="secondary" className="w-full justify-center py-2">
                          {selectedDate.toLocaleDateString()} at {selectedTime}
                        </Badge>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select services to see booking summary
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Selection */}
            <ServiceSelector 
              selectedServices={selectedServices}
              onServicesChange={setSelectedServices}
              initialServiceId={serviceId || undefined}
            />
            
            {/* Date Selection */}
            {selectedServices.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Select Date
                  </CardTitle>
                </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>
            )}

            {/* Time Selection */}
            {selectedDate && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? "bg-secondary hover:bg-secondary/90" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customer Details */}
            {selectedTime && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={customerData.notes}
                      onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                      placeholder="Any special requests or notes..."
                      rows={3}
                    />
                  </div>
                  
                  <Button
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;