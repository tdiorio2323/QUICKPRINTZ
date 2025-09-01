import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { MoreVertical, ArrowLeft, File as FileIcon, Image as ImageIcon, FileText } from "lucide-react";
import { generateFiles, seedFolders } from "@/lib/portal";
import { getBagmanFiles } from "@/lib/bagman";

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
  const [previewId, setPreviewId] = useState<string | null>(null);

  const params = new URLSearchParams(window.location.search);
  const host = typeof window !== 'undefined' ? window.location.hostname : "";
  const hostMap: Record<string, string> = {
    "bagman.tdstudioshq.com": "Bagman",
    "portal.bagmanpack.com": "Bagman",
    "tdstudioshq.com": "TD Studios",
    "www.tdstudioshq.com": "TD Studios",
  };
  const clientName = params.get("client") || hostMap[host] || "Client Portal";
  const isBagman = clientName.toLowerCase() === 'bagman';

  const folder = seedFolders.find(f => f.id === folderId);
  const files = useMemo(() => {
    if (isBagman && folderId === 'website-files') {
      // Map Bagman file URLs into FileItem shape
      return getBagmanFiles().map(f => ({ id: f.id, name: f.name, ext: f.ext }));
    }
    return generateFiles(folderId, 30);
  }, [folderId, isBagman]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(f => `${f.name}.${f.ext}`.toLowerCase().includes(q));
  }, [files, query]);

  const selected = previewId ? files.find(f => f.id === previewId) : null;

  const handleDownload = (file: { name: string; ext: string }) => {
    const a = document.createElement('a');
    a.href = '/placeholder.svg';
    a.download = `${file.name}.${file.ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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
      <Helmet>
        <link rel="icon" href="/bagman-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/bagman-logo.svg" />
      </Helmet>
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

        <header className="mb-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={backTo}>Portal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{folder.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl md:text-3xl font-display font-bold premium-gradient-text">
            {clientName}
          </h1>
          <p className="text-muted-foreground">{filtered.length} items</p>
        </header>

        <div className="relative mb-10 max-w-xl">
          <Input
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 glass-morphism border-primary/20"
          />
        </div>

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filtered.map((file) => (
            <Card key={file.id} className="relative aspect-square glass-morphism border-primary/20 shadow-elegant hover-lift overflow-hidden">
              <CardContent className="w-full h-full p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  {iconForExt[file.ext] ?? <FileIcon className="w-10 h-10 text-primary" />}
                </div>
                <p className="text-sm font-medium line-clamp-2">{file.name}</p>
                <span className="text-xs text-muted-foreground mt-1">.{file.ext}</span>
              </CardContent>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 hover:bg-black/30 text-white border border-white/20 backdrop-blur-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setPreviewId(file.id)}>Open</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(file)}>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </section>

        <Dialog open={!!previewId} onOpenChange={(o) => !o && setPreviewId(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selected ? `${selected.name}.${selected.ext}` : 'Preview'}</DialogTitle>
            </DialogHeader>
            <div className="min-h-[300px] flex items-center justify-center">
              {/* Placeholder preview; real assets open in new tab or can be enhanced later */}
              <img src="/placeholder.svg" alt="Preview" className="w-64 h-64 opacity-80" />
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default FolderPage;