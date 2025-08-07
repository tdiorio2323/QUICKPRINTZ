import { Button } from "@/components/ui/button";
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gradient-dark border-t border-primary/20 py-20 mt-auto shadow-elegant">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl premium-gradient-text">QUICK PRINTZ</div>
                <div className="font-body text-muted-foreground">Premium Cannabis Packaging</div>
              </div>
            </div>
            <p className="font-body text-muted-foreground mb-8 max-w-lg leading-relaxed text-lg">
              More than print, we build brands. The #1 independent cannabis packaging agency
              offering custom design services and automated print-on-demand fulfillment.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="glass-morphism hover-lift h-12 w-12 shadow-elegant">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="glass-morphism hover-lift h-12 w-12 shadow-elegant">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="glass-morphism hover-lift h-12 w-12 shadow-elegant">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-lightning-yellow">SERVICES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Custom Package Design</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Print-on-Demand Orders</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Premium Boxes</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Rush Fulfillment</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Brand Strategy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-lightning-yellow">CONTACT US TO ORDER</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">ORDER@QUICKPRINTZ.COM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">(555) 420-BAGS</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">@QUICKPRINTZ</span>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="premium" size="sm" className="w-full" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Follow Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 QUICK PRINTZ. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
