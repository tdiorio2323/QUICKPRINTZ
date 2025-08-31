import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
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
  const tdLogoSrc = (import.meta as any).env?.VITE_TDSTUDIOS_LOGO_URL || "/tdstudios-logo-white.png";
  const defaultAuthImage = (import.meta as any).env?.VITE_AUTH_CARD_IMAGE_URL || "/auth-card.png";
  const [imgSrc, setImgSrc] = useState<string>(defaultAuthImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validUsername = "bagman";
    const validPassword = "420";
    if (username.trim().toLowerCase() !== validUsername || password !== validPassword) {
      toast({
        title: "Error",
        description: "Invalid username or password",
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

        toast({ title: "Welcome back!", description: "Signed in successfully." });
        navigate('/portal');
        if (onLogin) onLogin('customer');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href="/bagman-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/bagman-logo.svg" />
      </Helmet>
      <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "radial-gradient(1200px 600px at 80% 0%, rgba(255,255,255,0.06), transparent), radial-gradient(1000px 500px at 0% 100%, rgba(34, 197, 94, 0.12), transparent), linear-gradient(180deg, #0b0b0b 0%, #111 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-white/10 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img
              src={imgSrc}
              onError={() => setImgSrc('/bagman-logo.svg')}
              alt="Auth Card"
              className="max-h-40 w-auto rounded-md shadow-lg"
            />
          </div>
          <p className="text-muted-foreground text-lg">Sign in to continue</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bebas text-white/90 tracking-wider">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="font-bebas text-white placeholder-white/70 bg-white/10 border border-white/30 backdrop-blur-md h-12 focus-visible:ring-2 focus-visible:ring-white/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bebas text-white/90 tracking-wider">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="font-bebas text-white placeholder-white/70 bg-white/10 border border-white/30 backdrop-blur-md h-12 focus-visible:ring-2 focus-visible:ring-white/40"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-bebas text-white bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-md h-12 tracking-wider"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default AuthPage;
