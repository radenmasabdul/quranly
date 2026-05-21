export type FilterMode = (typeof FILTERS)[number]["key"];

export const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "makkiyah", label: "Makkiyah" },
  { key: "madaniyah", label: "Madaniyah" },
  { key: "favorit", label: "Favorit" },
] as const;
