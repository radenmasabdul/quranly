export type Tipe = "ayat" | "tafsir";

export interface AyatData {
  id_surat: number;
  nama_surat: string;
  nama_surat_arab: string;
  nomor_ayat: number;
  teks_arab: string;
  teks_latin: string;
  terjemahan_id: string;
}

export interface TafsirData {
  id_surat: number;
  nama_surat: string;
  nomor_ayat: number;
  isi: string;
}

export interface AyatResult {
  tipe: "ayat";
  skor: number;
  relevansi: string;
  data: AyatData;
}

export interface TafsirResult {
  tipe: "tafsir";
  skor: number;
  relevansi: string;
  data: TafsirData;
}

export type ResultData = AyatResult | TafsirResult;

export interface VectorResponse<T> {
  status: string;
  cari: string;
  jumlah: number;
  hasil: T;
}
