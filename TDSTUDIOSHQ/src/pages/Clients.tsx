import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const clients = [
  { id: "td-studios", name: "TD Studios" },
  { id: "acme", name: "Acme Co" },
  { id: "greenleaf", name: "Greenleaf Labs" },
  { id: "northstar", name: "Northstar Holdings" },
  { id: "quickprintz", name: "Quick Printz" },
];

export const ClientsList = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return clients;
    return clients.filter(c => c.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">
        <h1 className="text-3xl md:text-4xl font-display font-bold premium-gradient-text mb-6">Clients</h1>
        <div className="max-w-xl mb-8">
          <Input placeholder="Search clients..." value={q} onChange={(e) => setQ(e.target.value)} className="h-12 glass-morphism border-primary/20" />
        </div>
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((c) => (
            <Card key={c.id} className="aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift cursor-pointer" onClick={() => navigate(`/portal?client=${encodeURIComponent(c.name)}`)}>
              <CardContent className="w-full h-full p-6 flex items-center justify-center text-center">
                <p className="font-medium">{c.name}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export const ClientRedirect = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const match = clients.find(c => c.id === clientId);
  // Redirect to /portal with client query
  const name = match ? match.name : (clientId || "Client Portal");
  navigate(`/portal?client=${encodeURIComponent(name)}`, { replace: true });
  return null;
};

export default ClientsList;

