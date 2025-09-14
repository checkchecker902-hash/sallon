import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ServiceCard from "@/components/ServiceCard";
import { Search, Scissors, Users, Heart, Sparkles, MapPin, Phone, Mail, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import service images
import mensHaircutImg from "@/assets/mens-haircut.jpg";
import womensHaircutImg from "@/assets/womens-haircut.jpg";
import beardServiceImg from "@/assets/beard-service.jpg";
import spaServiceImg from "@/assets/spa-service.jpg";

// Mock services data
const services = [
  {
    id: "mens-haircut",
    name: "Men's Haircut & Style", 
    description: "Professional haircut with wash, style and beard trim. Perfect for the modern gentleman.",
    price: 35,
    duration: 45,
    category: "Men",
    image: mensHaircutImg
  },
  {
    id: "womens-haircut",
    name: "Women's Haircut & Style",
    description: "Cut, wash, blow-dry and professional styling. Transform your look with our expert stylists.",
    price: 55, 
    duration: 60,
    category: "Women",
    image: womensHaircutImg
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming & Trim",
    description: "Expert beard shaping, trimming and grooming. Includes hot towel treatment and beard oil.",
    price: 25,
    duration: 30,
    category: "Beard",
    image: beardServiceImg
  },
  {
    id: "spa-treatment", 
    name: "Relaxing Spa Treatment",
    description: "Rejuvenating facial treatment with deep cleansing, exfoliation and moisturizing.",
    price: 75,
    duration: 90,
    category: "Spa",
    image: spaServiceImg
  },
  {
    id: "kids-haircut",
    name: "Kids Haircut",
    description: "Fun and gentle haircuts for children. Patient stylists who make kids feel comfortable.",
    price: 20,
    duration: 30,
    category: "Kids", 
    image: mensHaircutImg
  },
  {
    id: "hair-color",
    name: "Hair Color & Highlights",
    description: "Full color service with consultation. Includes cut and style with your new color.",
    price: 95,
    duration: 120,
    category: "Women",
    image: womensHaircutImg
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Men", "Women", "Kids", "Beard", "Spa"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-hero rounded-full p-2">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Elite Salon</h1>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/owner/login")}
              className="text-muted-foreground hover:text-primary"
            >
              Staff Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Book Your Perfect Look
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional salon services with expert stylists. Experience luxury and style in our modern salon.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl font-bold text-center text-primary mb-8">Our Services</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
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
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">What Our Clients Say</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Amazing service! The stylists are incredibly skilled and the atmosphere is so relaxing."
              },
              {
                name: "Mike Chen", 
                rating: 5,
                comment: "Best haircut I've had in years. Professional, friendly, and great attention to detail."
              },
              {
                name: "Emma Davis",
                rating: 5,
                comment: "Love this salon! Easy booking system and always leave feeling fantastic."
              }
            ].map((review, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                <p className="font-semibold text-primary">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/10 rounded-full p-2">
                  <Scissors className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold">Elite Salon</h4>
              </div>
              <p className="text-primary-foreground/80">
                Your premier destination for professional hair and beauty services.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Beauty Street, City, State 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@elitesalon.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Business Hours</h5>
              <div className="space-y-1 text-primary-foreground/80 text-sm">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Elite Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
