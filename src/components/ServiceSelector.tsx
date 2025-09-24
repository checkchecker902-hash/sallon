import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, DollarSign, Plus, Minus } from "lucide-react";

// Import service images
import mensHaircutImg from "@/assets/mens-haircut.jpg";
import womensHaircutImg from "@/assets/womens-haircut.jpg";
import beardServiceImg from "@/assets/beard-service.jpg";
import spaServiceImg from "@/assets/spa-service.jpg";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
}

// Mock services data - same as Index.tsx
export const availableServices: Service[] = [
  {
    id: "mens-haircut",
    name: "Men's Haircut & Style", 
    description: "Professional haircut with wash, style and beard trim",
    price: 35,
    duration: 45,
    category: "Men",
    image: mensHaircutImg
  },
  {
    id: "womens-haircut",
    name: "Women's Haircut & Style",
    description: "Cut, wash, blow-dry and professional styling",
    price: 55, 
    duration: 60,
    category: "Women",
    image: womensHaircutImg
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming & Trim",
    description: "Expert beard shaping, trimming and grooming",
    price: 25,
    duration: 30,
    category: "Beard",
    image: beardServiceImg
  },
  {
    id: "spa-treatment", 
    name: "Relaxing Spa Treatment",
    description: "Rejuvenating facial treatment with deep cleansing",
    price: 75,
    duration: 90,
    category: "Spa",
    image: spaServiceImg
  },
  {
    id: "kids-haircut",
    name: "Kids Haircut",
    description: "Fun and gentle haircuts for children",
    price: 20,
    duration: 30,
    category: "Kids", 
    image: mensHaircutImg
  },
  {
    id: "hair-color",
    name: "Hair Color & Highlights",
    description: "Full color service with consultation",
    price: 95,
    duration: 120,
    category: "Women",
    image: womensHaircutImg
  }
];

interface ServiceSelectorProps {
  selectedServices: Service[];
  onServicesChange: (services: Service[]) => void;
  initialServiceId?: string;
}

const ServiceSelector = ({ selectedServices, onServicesChange, initialServiceId }: ServiceSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Men", "Women", "Kids", "Beard", "Spa"];

  // Initialize with the service from URL if provided
  useState(() => {
    if (initialServiceId && selectedServices.length === 0) {
      const initialService = availableServices.find(s => s.id === initialServiceId);
      if (initialService) {
        onServicesChange([initialService]);
      }
    }
  });

  const filteredServices = availableServices.filter(service => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesCategory;
  });

  const handleServiceToggle = (service: Service) => {
    const isSelected = selectedServices.some(s => s.id === service.id);
    
    if (isSelected) {
      onServicesChange(selectedServices.filter(s => s.id !== service.id));
    } else {
      onServicesChange([...selectedServices, service]);
    }
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
          Select Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedCategory === category 
                  ? "bg-secondary hover:bg-secondary/90" 
                  : "hover:bg-secondary/10"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 mb-6 max-h-96 overflow-y-auto">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.some(s => s.id === service.id);
            
            return (
              <div
                key={service.id}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleServiceToggle(service)}
              >
                <Checkbox 
                  checked={isSelected}
                  className="pointer-events-none"
                />
                
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold text-primary">{service.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration}min
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <DollarSign className="w-4 h-4" />
                      ${service.price}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant={isSelected ? "secondary" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceToggle(service);
                  }}
                >
                  {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <div className="border-t pt-4">
            <h5 className="font-semibold mb-3">Selected Services ({selectedServices.length})</h5>
            <div className="space-y-2 mb-4">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center text-sm">
                  <span>{service.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{service.duration}min</span>
                    <span className="font-semibold">${service.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-semibold text-lg border-t pt-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Total: {totalDuration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceSelector;