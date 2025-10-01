import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const OwnerLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Replace with actual Firebase or other auth provider for Google Sign-In.
    // This is a mock authentication for demonstration purposes.
    toast({
      title: "Login Successful",
      description: "Welcome back to your dashboard",
    });
    navigate("/owner/dashboard");
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
            <div className="flex flex-col items-center justify-center">
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Sign In with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerLogin;