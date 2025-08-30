import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Get Quote", href: "/quote" },
    { name: "BUY BAGS", href: "/configure" }
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
                className={`text-sm font-medium font-body transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${location.pathname === item.href
                  ? "text-primary after:w-full"
                  : "text-white hover:text-primary"
                  }`}
              >
                {item.name}
              </Link>
            ))}
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
                  className={`block text-base font-medium font-body transition-all duration-300 hover:translate-x-2 ${location.pathname === item.href
                    ? "text-primary"
                    : "text-white hover:text-primary"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;