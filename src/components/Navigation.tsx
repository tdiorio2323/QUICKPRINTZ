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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-400/90 via-yellow-500/90 to-amber-600/90 backdrop-blur-md border-b border-amber-300/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={bagIcon} alt="Bagman NY" className="w-10 h-10" />
            <div className="hidden sm:block">
              <div className="font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">BAGMAN NY</div>
              <div className="text-xs text-black/70 font-medium">Premium Cannabis Packaging</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Palette className="w-4 h-4 mr-2" />
              Custom Design
            </Button>
            <Button variant="premium" size="sm">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-12 w-12"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-card/50 backdrop-blur-sm border-t border-border/20 py-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/20">
                <Button variant="ghost" size="sm" className="w-full">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Design
                </Button>
                <Button variant="premium" size="sm" className="w-full">
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