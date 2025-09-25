import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '@/components/ServiceSelector';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  services: Service[];
  totalPrice: number;
  totalDuration: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  worker?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  source: 'booking' | 'appointment';
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  cancelAppointment: (id: string, cancelledBy: 'customer' | 'staff') => void;
  todaysAppointments: Appointment[];
  pendingAppointments: Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Sample data - replace with real data in production
    {
      id: "APP001",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      customer: {
        name: "John Smith",
        phone: "+1-234-567-8901",
        email: "john@example.com"
      },
      services: [{
        id: "mens-haircut",
        name: "Men's Haircut & Style",
        description: "Professional haircut with styling",
        price: 35,
        duration: 45,
        category: "Men",
        image: "/src/assets/mens-haircut.jpg"
      }],
      totalPrice: 35,
      totalDuration: 45,
      status: "confirmed",
      worker: "Sarah Johnson",
      paymentStatus: "paid",
      createdAt: new Date().toISOString(),
      source: "booking"
    },
    {
      id: "APP002",
      date: new Date().toISOString().split('T')[0],
      time: "10:30",
      customer: {
        name: "Emily Davis",
        phone: "+1-234-567-8902",
        email: "emily@example.com"
      },
      services: [{
        id: "womens-haircut",
        name: "Women's Haircut & Style",
        description: "Cut, wash, blow-dry and professional styling",
        price: 55,
        duration: 60,
        category: "Women",
        image: "/src/assets/womens-haircut.jpg"
      }],
      totalPrice: 55,
      totalDuration: 60,
      status: "pending",
      worker: "Sarah Johnson",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      source: "appointment"
    }
  ]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `APP${String(appointments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const cancelAppointment = (id: string, cancelledBy: 'customer' | 'staff') => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { 
        ...apt, 
        status: 'cancelled' as const,
        notes: `Cancelled by ${cancelledBy} at ${new Date().toLocaleString()}`
      } : apt)
    );
  };

  const todaysAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');

  return (
    <AppointmentContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      cancelAppointment,
      todaysAppointments,
      pendingAppointments
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};