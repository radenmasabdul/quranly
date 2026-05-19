export const QUERY_KEYS = {
  surat: {
    all: ["surat"] as const,
    list: () => [...QUERY_KEYS.surat.all, "list"] as const,
    detail: (nomor: number) =>
      [...QUERY_KEYS.surat.all, "detail", nomor] as const,
    tafsir: (nomor: number) =>
      [...QUERY_KEYS.surat.all, "tafsir", nomor] as const,
  },
  doa: {
    all: ["doa"] as const,
    list: (params?: { grup?: string; tag?: string }) =>
      [...QUERY_KEYS.doa.all, "list", params] as const,
    detail: (id: number) => [...QUERY_KEYS.doa.all, "detail", id] as const,
  },
  imsakiyah: {
    all: ["imsakiyah"] as const,
    provinceList: () => [...QUERY_KEYS.imsakiyah.all, "list"] as const,
    cityList: (provinsi: string) =>
      [...QUERY_KEYS.imsakiyah.all, "city", provinsi] as const,
  },
  shalat: {
    all: ["shalat"] as const,
    provinceList: () => [...QUERY_KEYS.shalat.all, "list"] as const,
    cityList: (provinsi: string) =>
      [...QUERY_KEYS.shalat.all, "city", provinsi] as const,
    schedule: (
      provinsi: string,
      kabkota: string,
      bulan: number,
      tahun: number,
    ) =>
      [
        ...QUERY_KEYS.shalat.all,
        "schedule",
        provinsi,
        kabkota,
        bulan,
        tahun,
      ] as const,
  },
};
