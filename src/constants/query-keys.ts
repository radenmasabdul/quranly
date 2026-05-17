export const QUERY_KEYS = {
  surat: {
    all: ["surat"] as const,
    list: () => [...QUERY_KEYS.surat.all, "list"] as const,
    detail: (nomor: number) =>
      [...QUERY_KEYS.surat.all, "detail", nomor] as const,
    tafsir: (nomor: number) =>
      [...QUERY_KEYS.surat.all, "tafsir", nomor] as const,
  },
};
