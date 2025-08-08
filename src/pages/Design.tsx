import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import lightningBg from "@/assets/lightning-yellow-bg.jpg";

const Design = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Custom Hero Section for Design Page */}
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
          {/* TD Studios Logo */}
          <div className="mb-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F8e6ddb11ee7a4330b389af7949e051e7?format=webp&width=800"
              alt="TD Studios"
              className="mx-auto max-w-lg w-full h-auto rounded-[2rem] shadow-premium hover-lift"
            />
          </div>

          {/* Updated Content */}
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold premium-gradient-text mb-6 tracking-tight">
              TD STUDIOS
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fill out the form below to get your custom logo or designs:
            </p>
          </div>

          {/* Single Get Started Button */}
          <div className="flex justify-center">
            <Button variant="premium" size="xl" className="group w-80 h-16 text-lg font-body shadow-premium hover-lift" asChild>
              <a href="https://tdstudiosny.com/contact" target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
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

      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bebas font-bold text-white mb-4">
              DESIGN SERVICES
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Custom design services coming soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Design;
