import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import lightningBg from "@/assets/lightning-yellow-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={lightningBg}
          alt="Lightning Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-8">
        {/* Quick Printz Logo */}
        <div className="mb-12">
          <img
            src="/lovable-uploads/1eedce7b-3acd-4662-a3c3-5bc1320d31e8.png"
            alt="Quick Printz"
            className="mx-auto max-w-lg w-full h-auto rounded-[2rem] shadow-premium hover-lift"
          />
        </div>

        {/* Premium Tagline */}
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold premium-gradient-text mb-6 tracking-tight">
            Premium Packaging
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Elevating cannabis brands with luxury packaging solutions, custom design excellence, and unmatched quality.
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="lightning" size="xl" className="backdrop-blur-premium w-80 h-16 text-lg font-body shadow-premium hover-lift">
            Order Bags Online
            <ArrowRight className="w-6 h-6" />
          </Button>

          <Button variant="premium" size="xl" className="group w-80 h-16 text-lg font-body shadow-premium hover-lift">
            Custom Design Services
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center shadow-glow">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-3 animate-pulse shadow-premium"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
