import React, { createContext, useContext, useState } from 'react';

// Import service images
import mensHaircutImg from "@/assets/mens-haircut.jpg";
import womensHaircutImg from "@/assets/womens-haircut.jpg";
import beardServiceImg from "@/assets/beard-service.jpg";
import spaServiceImg from "@/assets/spa-service.jpg";

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  active: boolean;
}

interface ServicesContextType {
  services: ServiceData[];
  addService: (service: Omit<ServiceData, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceData>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;
  activeServices: ServiceData[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceData[]>([
    {
      id: "mens-haircut",
      name: "Men's Haircut & Style", 
      description: "Professional haircut with wash, style and beard trim. Perfect for the modern gentleman.",
      price: 35,
      duration: 45,
      category: "Men",
      image: mensHaircutImg,
      active: true
    },
    {
      id: "womens-haircut",
      name: "Women's Haircut & Style",
      description: "Cut, wash, blow-dry and professional styling. Transform your look with our expert stylists.",
      price: 55, 
      duration: 60,
      category: "Women",
      image: womensHaircutImg,
      active: true
    },
    {
      id: "beard-grooming",
      name: "Beard Grooming & Trim",
      description: "Expert beard shaping, trimming and grooming. Includes hot towel treatment and beard oil.",
      price: 25,
      duration: 30,
      category: "Beard",
      image: beardServiceImg,
      active: true
    },
    {
      id: "spa-treatment", 
      name: "Relaxing Spa Treatment",
      description: "Rejuvenating facial treatment with deep cleansing, exfoliation and moisturizing.",
      price: 75,
      duration: 90,
      category: "Spa",
      image: spaServiceImg,
      active: true
    },
    {
      id: "kids-haircut",
      name: "Kids Haircut",
      description: "Fun and gentle haircuts for children. Patient stylists who make kids feel comfortable.",
      price: 20,
      duration: 30,
      category: "Kids", 
      image: mensHaircutImg,
      active: true
    },
    {
      id: "hair-color",
      name: "Hair Color & Highlights",
      description: "Full color service with consultation. Includes cut and style with your new color.",
      price: 95,
      duration: 120,
      category: "Women",
      image: womensHaircutImg,
      active: true
    }
  ]);

  const addService = (serviceData: Omit<ServiceData, 'id'>) => {
    const newId = serviceData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newService: ServiceData = {
      ...serviceData,
      id: newId
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<ServiceData>) => {
    setServices(prev => 
      prev.map(service => service.id === id ? { ...service, ...updates } : service)
    );
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const toggleServiceActive = (id: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
  };

  const activeServices = services.filter(service => service.active);

  return (
    <ServicesContext.Provider value={{
      services,
      addService,
      updateService,
      deleteService,
      toggleServiceActive,
      activeServices
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};