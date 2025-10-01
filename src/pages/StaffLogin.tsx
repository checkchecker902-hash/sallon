import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Scissors } from "lucide-react";
import { useStaff } from '@/contexts/StaffContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStaff();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async () => {
    // TODO: Replace with actual Firebase or other auth provider for email/password auth.
    // This is a mock authentication for demonstration purposes.
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(email, password, 'staff');
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/staff/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // TODO: Replace with actual Firebase or other auth provider for Google Sign-In.
    // This is a mock authentication for demonstration purposes.
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    navigate("/staff/dashboard");
  };

  const fillDemoCredentials = () => {
    setEmail('sarah@salon.com');
    setPassword('staff123');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Elite Salon</h1>
          <p className="text-muted-foreground">Staff Login Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Staff Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staff-email">Staff Email</Label>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder="Enter your staff email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-password">Password</Label>
                <Input
                  id="staff-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleEmailLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login with Email'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Sign In with Google
            </Button>

            <div className="space-y-2">
              <Button
                variant="link"
                className="w-full"
                onClick={fillDemoCredentials}
              >
                Fill Demo Credentials
              </Button>
              <div className="text-sm text-center text-muted-foreground space-y-1">
                <p><strong>Demo Accounts:</strong> sarah@salon.com, alex@salon.com, maria@salon.com (pw: staff123)</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLogin;