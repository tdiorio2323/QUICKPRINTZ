import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Folder, Search } from "lucide-react";
import { seedFolders } from "@/lib/portal";

const Portal = () => {
  const [query, setQuery] = useState("");

  // Read optional client name from URL (?client=Acme%20Co)
  const clientName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("client");
    if (fromQuery) return fromQuery;
    const host = typeof window !== 'undefined' ? window.location.hostname : "";
    const hostMap: Record<string, string> = {
      "bagman.tdstudioshq.com": "Bagman",
      "tdstudioshq.com": "TD Studios",
      "www.tdstudioshq.com": "TD Studios",
    };
    return hostMap[host] || "Client Portal";
  }, []);

  const folders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seedFolders;
    return seedFolders.filter(f => f.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold premium-gradient-text">
            {clientName}
          </h1>
          <p className="text-muted-foreground mt-1">Secure project files and folders</p>
        </header>

        <div className="relative mb-10 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search files and folders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 glass-morphism border-primary/20"
          />
        </div>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {folders.map((f) => {
            const navigate = useNavigate();
            const params = new URLSearchParams(window.location.search);
            const qs = params.toString();
            const to = `/portal/${encodeURIComponent(f.id)}${qs ? `?${qs}` : ""}`;
            return (
              <Card
                key={f.id}
                className="aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift cursor-pointer overflow-hidden"
                role="button"
                aria-label={`${f.title} folder`}
                tabIndex={0}
                onClick={() => navigate(to)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(to) }}
              >
                <CardContent className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                  <Folder className="w-12 h-12 text-primary mb-3" />
                  <div className="space-y-1">
                    <p className="font-medium line-clamp-2">{f.title}</p>
                    {typeof f.count === "number" && (
                      <span className="text-xs text-muted-foreground">{f.count} items</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Portal;
