// Standalone Client Portal template
// - No project branding, emails, or external URLs
// - Single page with internal state (no router required)
// - Square folder cards grid + search; simple file view

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder, Search, ArrowLeft, File as FileIcon, FileText, Image as ImageIcon } from "lucide-react";

type FolderItem = { id: string; title: string; count?: number };
type FileItem = { id: string; name: string; ext: string };

const defaultFolders: FolderItem[] = [
  { id: "brand-assets", title: "Brand Assets", count: 42 },
  { id: "design-files", title: "Design Files", count: 18 },
  { id: "invoices", title: "Invoices", count: 12 },
  { id: "contracts", title: "Contracts", count: 7 },
  { id: "proofs", title: "Proofs", count: 25 },
  { id: "dielines", title: "Packaging Dielines", count: 9 },
  { id: "photography", title: "Photography", count: 63 },
  { id: "videos", title: "Videos", count: 14 },
  { id: "social", title: "Social Content", count: 36 },
  { id: "campaigns", title: "Campaigns", count: 8 },
  { id: "orders", title: "Orders", count: 21 },
  { id: "shipments", title: "Shipments", count: 10 },
  { id: "quotes", title: "Quotes", count: 6 },
  { id: "approvals", title: "Approvals", count: 5 },
  { id: "mockups", title: "Mockups", count: 28 },
  { id: "source", title: "Source Files", count: 31 },
  { id: "press", title: "Press Ready", count: 12 },
  { id: "marketing", title: "Marketing", count: 19 },
  { id: "archive-2023", title: "Archive 2023", count: 44 },
  { id: "archive-2024", title: "Archive 2024", count: 17 },
];

const sampleNames = [
  "Logo", "Packaging Mockup", "Label V1", "Label V2", "Brand Guide", "Invoice",
  "Contract", "Social Post", "Ad Creative", "Hero Image", "Die Cut",
  "Product Photo", "Render", "Press Sheet", "Spec Sheet", "Campaign Plan",
];
const sampleExt = ["pdf", "png", "jpg", "ai", "psd", "svg"];

function genFiles(folderId: string, count = 30): FileItem[] {
  const out: FileItem[] = [];
  for (let i = 0; i < count; i++) {
    const name = `${sampleNames[i % sampleNames.length]} ${i + 1}`;
    const ext = sampleExt[(i + folderId.length) % sampleExt.length];
    out.push({ id: `${folderId}-${i}`, name, ext });
  }
  return out;
}

const iconForExt: Record<string, JSX.Element> = {
  png: <ImageIcon className="w-10 h-10 text-primary" />,
  jpg: <ImageIcon className="w-10 h-10 text-primary" />,
  svg: <ImageIcon className="w-10 h-10 text-primary" />,
  pdf: <FileText className="w-10 h-10 text-primary" />,
  ai: <FileIcon className="w-10 h-10 text-primary" />,
  psd: <FileIcon className="w-10 h-10 text-primary" />,
};

export default function ClientPortalTemplate() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : "");
  const defaultClient = params.get("client") || "Client Portal";

  const [clientName] = useState(defaultClient);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<'grid' | 'folder'>("grid");
  const [selected, setSelected] = useState<FolderItem | null>(null);

  const folders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return defaultFolders;
    return defaultFolders.filter(f => f.title.toLowerCase().includes(q));
  }, [query]);

  const files = useMemo(() => selected ? genFiles(selected.id) : [], [selected]);
  const filteredFiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(f => `${f.name}.${f.ext}`.toLowerCase().includes(q));
  }, [files, query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal, generic top bar (no external links) */}
      <div className="fixed top-0 left-0 right-0 z-40 glass-morphism border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-6">
          <div className="text-xl md:text-2xl font-display font-bold premium-gradient-text truncate">
            {view === 'grid' ? clientName : `${clientName} / ${selected?.title ?? ''}`}
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={view === 'grid' ? "Search folders..." : "Search files..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 glass-morphism border-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-24">
        {view === 'grid' && (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {folders.map((f) => (
              <Card
                key={f.id}
                className="aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift cursor-pointer overflow-hidden"
                role="button"
                aria-label={`${f.title} folder`}
                tabIndex={0}
                onClick={() => { setSelected(f); setView('folder'); setQuery(""); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { setSelected(f); setView('folder'); setQuery(""); } }}
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
            ))}
          </section>
        )}

        {view === 'folder' && selected && (
          <>
            <div className="mb-6">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={() => { setView('grid'); setSelected(null); setQuery(""); }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to folders
              </Button>
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift overflow-hidden">
                  <CardContent className="w-full h-full p-4 flex flex-col items-center justify-center text-center">
                    <div className="mb-2">
                      {iconForExt[file.ext] ?? <FileIcon className="w-10 h-10 text-primary" />}
                    </div>
                    <p className="text-sm font-medium line-clamp-2">{file.name}</p>
                    <span className="text-xs text-muted-foreground mt-1">.{file.ext}</span>
                  </CardContent>
                </Card>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

