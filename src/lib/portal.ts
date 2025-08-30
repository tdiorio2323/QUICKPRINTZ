export type FolderItem = {
  id: string;
  title: string;
  count?: number;
}

export const seedFolders: FolderItem[] = [
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

export type FileItem = {
  id: string;
  name: string;
  ext: string;
}

const sampleNames = [
  "Logo", "Packaging Mockup", "Label V1", "Label V2", "Brand Guide", "Invoice",
  "Contract", "Social Post", "Ad Creative", "Hero Image", "Die Cut",
  "Product Photo", "Render", "Press Sheet", "Spec Sheet", "Campaign Plan",
];

const sampleExt = ["pdf", "png", "jpg", "ai", "psd", "svg"];

export function generateFiles(folderId: string, count = 24): FileItem[] {
  const out: FileItem[] = [];
  for (let i = 0; i < count; i++) {
    const base = sampleNames[i % sampleNames.length];
    const ext = sampleExt[(i + folderId.length) % sampleExt.length];
    out.push({ id: `${folderId}-${i}`, name: `${base} ${i + 1}`, ext });
  }
  return out;
}

