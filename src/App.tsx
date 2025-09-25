import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { ServicesProvider } from "@/contexts/ServicesContext";
import { StaffProvider } from "@/contexts/StaffContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Appointment from "./pages/Appointment";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ServicesProvider>
        <AppointmentProvider>
          <StaffProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/owner" element={<OwnerLogin />} />
                <Route path="/owner/login" element={<OwnerLogin />} />
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </StaffProvider>
        </AppointmentProvider>
      </ServicesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
