export interface ImsakiyahData {
  tanggal: number;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface ImsakiyahSchedule {
  provinsi: string;
  kabkota: string;
  hijriah: string;
  masehi: string;
  imsakiyah: ImsakiyahData[];
}

export interface ImsakiyahResponse<T> {
  code: number;
  message: string;
  data: T;
}
