import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, File as FileIcon, Image as ImageIcon, FileText } from "lucide-react";
import { generateFiles, seedFolders } from "@/lib/portal";

const iconForExt: Record<string, JSX.Element> = {
  png: <ImageIcon className="w-10 h-10 text-primary" />,
  jpg: <ImageIcon className="w-10 h-10 text-primary" />,
  svg: <ImageIcon className="w-10 h-10 text-primary" />,
  pdf: <FileText className="w-10 h-10 text-primary" />,
  ai: <FileIcon className="w-10 h-10 text-primary" />,
  psd: <FileIcon className="w-10 h-10 text-primary" />,
};

const FolderPage = () => {
  const { folderId = "" } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const params = new URLSearchParams(window.location.search);
  const clientName = params.get("client") || "Client Portal";

  const folder = seedFolders.find(f => f.id === folderId);
  const files = useMemo(() => generateFiles(folderId, 30), [folderId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(f => `${f.name}.${f.ext}`.toLowerCase().includes(q));
  }, [files, query]);

  if (!folder) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">
          <p className="text-muted-foreground">Folder not found.</p>
        </main>
      </div>
    );
  }

  const backTo = `/portal${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">
        <div className="mb-6 flex items-center gap-4">
          <button
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate(backTo)}
          >
            <ArrowLeft className="w-4 h-4" /> Back to folders
          </button>
        </div>

        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold premium-gradient-text">
            {clientName} / {folder.title}
          </h1>
          <p className="text-muted-foreground mt-1">{filtered.length} items</p>
        </header>

        <div className="relative mb-10 max-w-xl">
          <Input
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 glass-morphism border-primary/20"
          />
        </div>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {filtered.map((file) => (
            <Card key={file.id} className="aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift cursor-pointer overflow-hidden">
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
      </main>
    </div>
  );
};

export default FolderPage;

