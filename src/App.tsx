import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GA from "@/components/GA";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MylarBags from "./pages/MylarBags";
import Boxes from "./pages/Boxes";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Design from "./pages/Design";
import Products from "./pages/Products";
import Quote from "./pages/Quote";
import MylarBagConfigurator from "./components/MylarBagConfigurator";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import Portal from "./pages/Portal";
import FolderPage from "./pages/Folder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GA />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/td" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/mylar-bags" element={<MylarBags />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design" element={<Design />} />
          <Route path="/configure" element={<MylarBagConfigurator />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/:folderId" element={<FolderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
