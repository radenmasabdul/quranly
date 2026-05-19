import { api } from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type {
  ApiResponse,
  Surat,
  SuratDetail,
  TafsirDetail,
} from "../types/quran.type";

const getSurat = async (): Promise<Surat[]> => {
  const { data } = await api.get<ApiResponse<Surat[]>>(ENDPOINTS.surat.list);
  return data.data;
};

const getDetailSurat = async (nomor: number): Promise<SuratDetail> => {
  const { data } = await api.get<ApiResponse<SuratDetail>>(
    ENDPOINTS.surat.detail(nomor),
  );
  return data.data;
};

const getTafsir = async (nomor: number): Promise<TafsirDetail> => {
  const { data } = await api.get<ApiResponse<TafsirDetail>>(
    ENDPOINTS.surat.tafsir(nomor),
  );
  return data.data;
};

export { getDetailSurat, getSurat, getTafsir };
