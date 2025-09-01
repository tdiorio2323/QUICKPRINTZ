import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the minimum order quantity (MOQ)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our minimum order quantity is 100 units for custom printed mylar bags and boxes. For labels, the minimum is 250 units."
        }
      },
      {
        "@type": "Question",
        "name": "How long does production take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard production time is 10-14 business days after artwork approval. Rush orders (7-10 days) are available for an additional fee."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide design services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer custom design services through our partner TD Studios. Our team can create logos, packaging designs, and complete brand identities."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "What is the minimum order quantity (MOQ)?",
      answer: "Our minimum order quantity is 100 units for custom printed mylar bags and boxes. For labels, the minimum is 250 units. We keep MOQs low to help small businesses and new brands get started."
    },
    {
      question: "How long does production take?",
      answer: "Standard production time is 10-14 business days after artwork approval. Rush orders (7-10 days) are available for an additional fee. Shipping time depends on your location - typically 2-5 business days."
    },
    {
      question: "Do you provide design services?",
      answer: "Yes! We offer custom design services through our partner TD Studios. Our experienced designers can create logos, packaging designs, and complete brand identities. Design services start at $150."
    },
    {
      question: "What file formats do you accept for artwork?",
      answer: "We accept AI, EPS, PDF, and PSD files with 300 DPI resolution. All text should be outlined/converted to curves. We provide free artwork review and will let you know if any adjustments are needed."
    },
    {
      question: "Are your bags child-resistant and compliant?",
      answer: "Yes, all our mylar bags meet child-resistant requirements and state compliance standards. We stay updated on regulations and can help ensure your packaging meets local requirements."
    },
    {
      question: "Do you offer samples?",
      answer: "Yes, we can provide blank samples of our packaging materials for $5-15 per sample (including shipping). Custom printed samples are available after artwork approval for an additional fee."
    },
    {
      question: "What printing methods do you use?",
      answer: "We use high-quality digital and flexographic printing methods depending on the product and quantity. All inks are food-safe and designed for cannabis packaging applications."
    },
    {
      question: "Can you match specific colors (Pantone)?",
      answer: "Yes, we can match Pantone colors for an additional fee. Please note that some metallic and neon colors may not be achievable on certain materials. We'll provide a proof for approval."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and checks. Payment is typically required 50% upfront and 50% before shipping. Net 30 terms available for established accounts."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping costs and delivery times vary by location. All international customers are responsible for customs duties and import taxes."
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer: "We stand behind our work 100%. If there's an error on our part, we'll remake your order at no charge. We require approval of digital proofs before production to ensure satisfaction."
    },
    {
      question: "Can you help with regulatory compliance?",
      answer: "Yes, we stay current with cannabis packaging regulations across different states and can help ensure your packaging meets local requirements. However, final compliance is the customer's responsibility."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Frequently Asked Questions"
        description="Get answers to common questions about our cannabis packaging services, minimum orders, production times, and compliance requirements."
        jsonLd={faqSchema}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-overlay overflow-hidden mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            FAQ
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our cannabis packaging services and processes.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-morphism border-primary/20 rounded-xl px-6 shadow-elegant"
              >
                <AccordionTrigger className="font-display text-lg font-semibold text-left hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-8 bg-gradient-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Still Have Questions?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            Our team is here to help. Get in touch and we'll answer any questions about your packaging project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-premium hover-lift"
            >
              Contact Us
            </a>
            <a 
              href="/quote" 
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors shadow-elegant"
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;