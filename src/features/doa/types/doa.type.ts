export type TagType =
  | "tidur"
  | "malam"
  | "kamar mandi"
  | "wudhu"
  | "pakaian"
  | "perlindungan"
  | "keburukan"
  | "sifat buruk"
  | "syirik"
  | "umum"
  | "sakit"
  | "jenazah"
  | "sedih"
  | "sulit"
  | "musibah"
  | "kabar"
  | "hutang"
  | "rezeki"
  | "harta"
  | "perjalanan"
  | "ampunan"
  | "orang tua";

export type DoaCategoryType =
  | "Doa Sebelum dan Sesudah Tidur"
  | "Doa di Kamar Mandi"
  | "Doa Saat Wudhu"
  | "Doa Berpakaian"
  | "Doa Perlindungan"
  | "Doa Menghadapi Fenomena Alam"
  | "Doa Pernikahan"
  | "Doa Saat Sakit"
  | "Doa untuk Orang Sakit"
  | "Doa Menjelang Wafat"
  | "Doa Jenazah"
  | "Doa Saat Sedih dan Sulit"
  | "Doa Saat Mendapat Kabar"
  | "Doa Terkait Harta dan Hutang"
  | "Doa Perjalanan"
  | "Doa Berlindung dari setan"
  | "Doa memohon surga dan berlindung dari neraka"
  | "Doa memohon akhlak mulia"
  | "Doa Terkait Orang Tua"
  | "Doa Terkait Istri Dan Anak"
  | "Doa Kepada Anak Yang Baru Lahir"
  | "Doa Memohon Keteguhan Hati"
  | "Doa Memohon Ampun, Rahmat Dan Kebaikan Lainnya"
  | "Doa Berlindung Dari Syirik"
  | "Doa Berlindung Dari Empat Hal"
  | "Doa Berlindung Dari Kecelakaan Dan Kematian Yang Mengerikan"
  | "Doa Memohon Ilmu"
  | "Doa Memohon Kebaikan"
  | "Doa Keluar Dan Masuk Rumah"
  | "Bacaan Terkait Adzan"
  | "Doa Terkait Makan"
  | "Doa Terkait Puasa"
  | "Doa Terkait Ramadhan"
  | "Ucapan Terkait Hari Raya."
  | "Doa Berlindung Dari Keburukan"
  | "Doa Memohon Kebaikan Dan Berlindung Dari Keburukan"
  | "Bacaan Bila Kagum Terhadap Sesuatu"
  | "Beberapa Adab Dan Keutamaan"
  | "Istighfar Dan Taubat"
  | "Lafal Dzikir Dan Keutamaannya"
  | "Doa Terkait Majelis"
  | "Doa Bertemu Musuh Dan Penguasa"
  | "Doa Berlindung Dari Orang Zalim Dan Orang Kafir"
  | "Beberapa Doa Terkait Shalat";

export interface Doa {
  id: number;
  grup: DoaCategoryType;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag: TagType[];
}

export interface DoaListResponse<T> {
  status: string;
  total: number;
  data: T;
}

export interface DoaDetailResponse {
  status: string;
  data: Doa;
}
