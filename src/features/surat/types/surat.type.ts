export type TempatTurun = "Mekah" | "Madinah";
export type AudioMap = Record<"01" | "02" | "03" | "04" | "05" | "06", string>;

export interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: TempatTurun;
  arti: string;
  deskripsi: string;
  audioFull: AudioMap;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioMap;
}

export interface SuratNavigation {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export interface SuratDetail extends Surat {
  ayat: Ayat[];
  suratSebelumnya: SuratNavigation | false;
  suratSelanjutnya: SuratNavigation | false;
}

export interface TafsirAyat {
  ayat: number;
  teks: string;
}

export interface TafsirDetail extends Surat {
  tafsir: TafsirAyat[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
