import { api } from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ResultData, Tipe, VectorResponse } from "../types/vector.type";

export interface VectorParams {
  cari: string;
  batas?: number;
  type?: Tipe[];
  skorMin?: number;
}

export const searchVectorData = async (
  params?: VectorParams,
): Promise<ResultData[]> => {
  const { data } = await api.post<VectorResponse<ResultData[]>>(
    ENDPOINTS.vector.search,
    params,
  );
  return data.hasil;
};
