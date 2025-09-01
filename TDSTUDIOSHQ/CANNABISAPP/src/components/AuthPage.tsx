import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKeypadPress = (digit: string) => {
    if (password.length < 3) {
      setPassword(prev => prev + digit);
    }
  };

  const handleKeypadClear = () => {
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "420") {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      try {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });

        // For demo purposes, navigate to shop page
        navigate('/shop');

        // Call onLogin if provided (for backward compatibility)
        if (onLogin) {
          onLogin('customer');
        }

      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };


  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/fa9437b3-6b52-4add-a826-421f47af7c9c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />
      
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-white/10 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8d5a64d26c0a4781a3269eef89d71661%2F2d3923d943614b4894f096117815d2be?format=webp&width=800"
              alt="Quick Printz Logo"
              className="h-64 w-auto"
            />
          </div>
          <p className="text-muted-foreground text-lg">Welcome back</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <Button
                key={digit}
                type="button"
                onClick={() => handleKeypadPress(digit.toString())}
                className="h-16 w-16 text-xl font-bold text-white bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-sm shadow-glow"
                variant="outline"
              >
                {digit}
              </Button>
            ))}
            <Button
              type="button"
              onClick={handleKeypadClear}
              className="h-16 w-16 text-lg font-bold text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 backdrop-blur-sm shadow-glow"
              variant="outline"
            >
              ⌫
            </Button>
            <Button
              type="button"
              onClick={() => handleKeypadPress("0")}
              className="h-16 w-16 text-xl font-bold text-white bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-sm shadow-glow"
              variant="outline"
            >
              0
            </Button>
            <div></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-black bg-yellow-500/80 hover:bg-yellow-500/90 backdrop-blur-sm border border-yellow-300/40 shadow-glow"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
