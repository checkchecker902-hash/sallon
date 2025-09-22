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
              onClick={() => navigate("/owner")}
              className="text-muted-foreground hover:text-primary"
            >
              Staff Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mb-8 text-white/90">
              <div className="flex items-center gap-2">
                <div className="bg-accent/20 rounded-full p-2">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium">15+ Expert Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-accent/20 rounded-full p-2">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium">5000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-accent/20 rounded-full p-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium">12 Years Experience</span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
              Transform Your Look Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Walk in ordinary, walk out <span className="text-accent font-semibold">extraordinary</span>. 
              Our award-winning stylists create the confidence-boosting look you deserve.
            </p>
            
            {/* Urgency & Social Proof */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-white">
                  <p className="text-lg font-semibold">4.9/5 Rating</p>
                  <p className="text-sm opacity-90">500+ Google Reviews</p>
                </div>
              </div>
              <div className="text-accent font-medium text-lg mb-2">
                🔥 87% of today's slots already booked!
              </div>
              <div className="text-white/90 text-sm">
                ✅ 100% Satisfaction Guarantee • ✅ Same-Day Bookings Available
              </div>
            </div>
            
            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-white hover:bg-accent/90 shadow-glow text-lg px-12 py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-200"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Book Your Transformation
              </Button>
              <div className="flex items-center gap-2 text-white/90">
                <Phone className="w-5 h-5" />
                <span className="text-lg font-medium">Call Now: (555) 123-4567</span>
              </div>
            </div>

            {/* Limited Time Offer */}
            <div className="mt-8 bg-accent/20 border border-accent/30 rounded-xl p-4 max-w-md mx-auto">
              <div className="text-accent font-bold text-sm mb-1">⏰ LIMITED TIME OFFER</div>
              <div className="text-white text-lg font-semibold">20% OFF First Visit</div>
              <div className="text-white/80 text-sm">New clients only • Expires in 7 days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          
          {/* Awards & Recognition */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <div className="text-sm font-semibold text-primary">Best Salon 2024</div>
                <div className="text-xs text-muted-foreground">City Awards</div>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div className="text-sm font-semibold text-primary">5000+ Happy</div>
                <div className="text-xs text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div className="text-sm font-semibold text-primary">Licensed</div>
                <div className="text-xs text-muted-foreground">Professionals</div>
              </div>
            </div>

            <h3 className="text-4xl font-bold text-primary mb-4">Transformations Our Clients Love</h3>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-3xl font-bold text-primary ml-2">4.9</span>
              <span className="text-muted-foreground text-lg">from 500+ Google reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "I walked in feeling invisible and walked out feeling like a QUEEN! The transformation was incredible - I've never felt more confident. Worth every penny!",
                service: "Hair Color & Highlights",
                beforeAfter: "Confidence Level: 3/10 → 11/10"
              },
              {
                name: "Mike Chen", 
                rating: 5,
                comment: "As a CEO, image matters. Elite Salon transformed my look and boosted my executive presence. Clients notice the difference. Game changer!",
                service: "Men's Executive Cut",
                beforeAfter: "Professional Impact: Doubled"
              },
              {
                name: "Emma Davis",
                rating: 5,
                comment: "After my divorce, I needed a fresh start. The stylists here didn't just change my hair - they changed my life. I feel like ME again!",
                service: "Complete Makeover",
                beforeAfter: "Self-Esteem: Completely Renewed"
              }
            ].map((review, index) => (
              <div key={index} className="bg-card p-8 rounded-xl shadow-card transform hover:scale-105 transition-all duration-300 border-l-4 border-accent">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded-full">
                    VERIFIED REVIEW
                  </div>
                </div>
                <p className="text-foreground mb-4 font-medium text-lg leading-relaxed">"{review.comment}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-primary text-lg">— {review.name}</p>
                  <p className="text-sm text-muted-foreground">Service: {review.service}</p>
                  <p className="text-sm text-accent font-medium mt-1">{review.beforeAfter}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-primary mb-4">Popular Services</h3>
              <p className="text-muted-foreground text-lg">Trending now • Most booked this week</p>
            </div>
            
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
