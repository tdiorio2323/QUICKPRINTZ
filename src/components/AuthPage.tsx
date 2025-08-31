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

  // Simple client detection via query param or hostname
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : "");
  const clientParam = params.get("client");
  const host = typeof window !== 'undefined' ? window.location.hostname : "";
  const hostClientMap: Record<string, string> = {
    "bagman.tdstudioshq.com": "Bagman",
    "portal.bagmanpack.com": "Bagman",
    "tdstudioshq.com": "TD Studios",
    "www.tdstudioshq.com": "TD Studios",
  };
  const pathname = typeof window !== 'undefined' ? window.location.pathname : "";
  const clientName = (pathname.startsWith('/bagman') && 'Bagman') || clientParam || hostClientMap[host] || "Quick Printz";
  const isBagman = clientName.toLowerCase() === "bagman";
  const isTD = clientName === 'TD Studios';
  const bagmanLogoSrc = (import.meta as any).env?.VITE_BAGMAN_LOGO_URL || "/bagman-logo.svg";
  const tdLogoSrc = (import.meta as any).env?.VITE_TDSTUDIOS_LOGO_URL || "/tdstudios-logo.svg";

  const handleKeypadPress = (digit: string) => {
    if (password.length < 6) {
      setPassword(prev => prev + digit);
    }
  };

  const handleKeypadClear = () => {
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const configured = (import.meta as any).env?.VITE_PORTAL_PASSCODE || "420";
    if (password !== configured) {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        try {
          // Mark simple client-side auth. This is NOT a secure gate, but
          // satisfies a quick path-based portal requirement.
          localStorage.setItem('portal_auth', 'true');
        } catch (_) {}

        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        navigate('/portal');
        if (onLogin) onLogin('customer');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "radial-gradient(1200px 600px at 80% 0%, rgba(255,255,255,0.06), transparent), radial-gradient(1000px 500px at 0% 100%, rgba(255, 215, 0, 0.08), transparent), linear-gradient(180deg, #0b0b0b 0%, #111 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-white/10 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            {isBagman ? (
              <img
                src={bagmanLogoSrc}
                alt="Bagman Logo"
                className="h-40 w-auto"
              />
            ) : isTD ? (
              <img
                src={tdLogoSrc}
                alt="TD Studios Logo"
                className="h-16 w-auto"
              />
            ) : clientName === 'Quick Printz' ? (
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8d5a64d26c0a4781a3269eef89d71661%2F2d3923d943614b4894f096117815d2be?format=webp&width=800"
                alt="Quick Printz Logo"
                className="h-64 w-auto"
              />
            ) : (
              <h2 className="text-4xl md:text-5xl font-display font-bold premium-gradient-text">
                {clientName}
              </h2>
            )}
          </div>
          <p className="text-muted-foreground text-lg">Welcome back</p>
        </CardHeader>

        <CardContent className="space-y-6">
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
              className={isBagman
                ? "w-full text-black bg-emerald-500/80 hover:bg-emerald-500/90 backdrop-blur-sm border border-emerald-300/40 shadow-glow"
                : "w-full text-black bg-yellow-500/80 hover:bg-yellow-500/90 backdrop-blur-sm border border-yellow-300/40 shadow-glow"
              }
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

export default AuthPage;
