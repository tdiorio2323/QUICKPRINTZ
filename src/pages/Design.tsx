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
          {/* Updated Content */}
          <div className="mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F0910880b1cb3445191f5fc518f473235?format=webp&width=800"
              alt="TD Studios Logo"
              className="mx-auto max-w-xs h-auto mb-3 hover-lift"
            />
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fill out the form below to get your custom logo or designs:
            </p>
          </div>

          {/* TD Studios Building Image */}
          <div className="mb-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F8e6ddb11ee7a4330b389af7949e051e7?format=webp&width=800"
              alt="TD Studios"
              className="mx-auto max-w-lg w-full h-auto rounded-[2rem] shadow-premium hover-lift"
            />
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

      <Footer />
    </div>
  );
};

export default Design;
