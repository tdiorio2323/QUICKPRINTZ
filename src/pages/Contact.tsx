import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to elevate your brand with premium cannabis packaging? Get in touch and let's create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 px-8 bg-lightning-yellow overflow-hidden">
        {/* Lightning Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="lightning" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M50 0L30 80h20L40 160l40-80H60L80 0z" fill="#000" opacity="0.8"/>
                <path d="M150 40L130 120h20L140 200l40-80H160L180 40z" fill="#000" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lightning)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-black">Email</h3>
                    <a
                      href="mailto:Info@quickprintz.com"
                      className="text-black/80 hover:text-black transition-colors font-medium"
                    >
                      Info@quickprintz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-black">Telegram</h3>
                    <a
                      href="https://t.me/quickprintz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/80 hover:text-black transition-colors font-medium"
                    >
                      Click here to Contact Us
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-black">Instagram</h3>
                    <a
                      href="https://www.instagram.com/quickprintz401/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/80 hover:text-black transition-colors font-medium"
                    >
                      @QUICKPRINTZ
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
