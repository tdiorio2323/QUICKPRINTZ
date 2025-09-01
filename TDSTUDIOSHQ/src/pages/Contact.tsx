import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Contact Form Section */}
      <section className="relative py-24 px-8 bg-lightning-yellow overflow-hidden mt-24">
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

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* Contact Info Image Section */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2Fa58db4f6919c4d2195e6e5f04b75b88b?format=webp&width=800"
            alt="Get In Touch - Contact Information"
            className="w-full max-w-md mx-auto rounded-2xl shadow-premium hover-lift transition-transform duration-500"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
