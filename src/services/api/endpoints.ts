export const ENDPOINTS = {
  surat: {
    list: "/v2/surat",
    detail: (nomor: number) => `/v2/surat/${nomor}`,
    tafsir: (nomor: number) => `/v2/tafsir/${nomor}`,
  },
  doa: {
    list: "/doa",
    detail: (id: number) => `/doa/${id}`,
  },
  vector: {
    search: "/vector",
  },
  imsakiyah: {
    provinceList: "/v2/imsakiyah/provinsi",
    cityList: "/v2/imsakiyah/kabkota",
    schedule: "/v2/imsakiyah",
  },
  shalat: {
    provinceList: "/v2/shalat/provinsi",
    cityList: "/v2/shalat/kabkota",
    schedule: "/v2/shalat",
  },
};
