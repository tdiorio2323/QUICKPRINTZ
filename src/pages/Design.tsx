import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Design = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
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
