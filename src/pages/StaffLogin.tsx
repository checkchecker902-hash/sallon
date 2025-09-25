import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, Users, Crown } from "lucide-react";
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

  const handleLogin = async (userType: 'owner' | 'staff') => {
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const success = login(email, password, userType);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome back!`,
        });
        
        // Navigate to appropriate dashboard
        if (userType === 'owner') {
          navigate('/owner/dashboard');
        } else {
          navigate('/staff/dashboard');
        }
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

  const fillDemoCredentials = (userType: 'owner' | 'staff') => {
    if (userType === 'owner') {
      setEmail('owner@salon.com');
      setPassword('owner123');
    } else {
      setEmail('sarah@salon.com');
      setPassword('staff123');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Elite Salon</h1>
          <p className="text-muted-foreground">Staff & Owner Login Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="staff" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="staff" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Staff
                </TabsTrigger>
                <TabsTrigger value="owner" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Owner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="staff" className="space-y-4">
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

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => handleLogin('staff')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login as Staff'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => fillDemoCredentials('staff')}
                  >
                    Fill Demo Credentials
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Demo Staff Accounts:</strong></p>
                  <p>• sarah@salon.com / staff123</p>
                  <p>• alex@salon.com / staff123</p>
                  <p>• maria@salon.com / staff123</p>
                </div>
              </TabsContent>

              <TabsContent value="owner" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Owner Email</Label>
                  <Input
                    id="owner-email"
                    type="email"
                    placeholder="Enter owner email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner-password">Password</Label>
                  <Input
                    id="owner-password"
                    type="password"
                    placeholder="Enter owner password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => handleLogin('owner')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login as Owner'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => fillDemoCredentials('owner')}
                  >
                    Fill Demo Credentials
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Demo Owner Account:</strong></p>
                  <p>owner@salon.com / owner123</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-sm"
              >
                ← Back to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLogin;