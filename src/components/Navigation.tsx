import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";
import bagIcon from "@/assets/bag-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "POD Orders", href: "#configurator" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-primary/20 shadow-elegant">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative h-auto font-normal pointer-events-auto pl-5">
              <h2 className="text-8xl font-gasoek font-bold text-white leading-none">
                QUICK PRINTZ
              </h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium font-body text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="lg" className="font-body hover-lift">
              <Palette className="w-4 h-4 mr-2" />
              Custom Design
            </Button>
            <Button variant="premium" size="lg" className="font-body shadow-premium">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-12 w-12 bg-primary border border-primary rounded-xl shadow-glow"
          >
            {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <Menu className="w-6 h-6 text-primary-foreground" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden glass-morphism border-t border-primary/20 py-6 shadow-elegant">
            <div className="space-y-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium font-body text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-6 border-t border-primary/20">
                <Button variant="ghost" size="lg" className="w-full font-body">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Design
                </Button>
                <Button variant="premium" size="lg" className="w-full font-body shadow-premium">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
