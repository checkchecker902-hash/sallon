import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
}

const ServiceCard = ({ id, name, description, price, duration, category, image }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book?service=${id}`);
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-0">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {category}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}min
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="w-4 h-4" />
              ${price}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
          {name}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button 
          onClick={handleBookNow}
          className="flex-1 bg-gradient-hero hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;