import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Mail, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    // Mock authentication - replace with Firebase Auth
    if (credentials.email === "owner@elitesalon.com" && credentials.password === "admin123") {
      toast({
        title: "Login Successful",
        description: "Welcome back to your dashboard",
      });
      
      // Redirect to owner dashboard
      navigate("/owner/dashboard");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-8">
            <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Owner Access</CardTitle>
            <p className="text-muted-foreground">Sign in to manage your salon</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  placeholder="owner@elitesalon.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo Credentials:</strong><br />
                Email: owner@elitesalon.com<br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerLogin;