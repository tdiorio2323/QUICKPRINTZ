import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import bagIcon from "@/assets/bag-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Mylar Bags", href: "/mylar-bags" },
    { name: "Boxes", href: "/boxes" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-primary/20 shadow-elegant">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="relative h-auto font-normal pointer-events-auto pl-5 hover:opacity-80 transition-opacity">
              <h2 className="text-4xl font-bebas font-bold text-white leading-none">
                QUICK PRINTZ
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium font-body transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === item.href
                    ? "text-primary after:w-full"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium font-body transition-all duration-300 hover:translate-x-2 ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
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
