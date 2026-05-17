import { api } from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type {
  Doa,
  DoaDetailResponse,
  DoaListResponse,
} from "../types/doa.type";

export interface GetDoaParams {
  grup?: string;
  tag?: string;
}

const getDoaList = async (params?: GetDoaParams): Promise<Doa[]> => {
  const { data } = await api.get<DoaListResponse<Doa[]>>(ENDPOINTS.doa.list, {
    params,
  });
  return data.data;
};

const getDoaDetail = async (id: number): Promise<Doa> => {
  const { data } = await api.get<DoaDetailResponse>(ENDPOINTS.doa.detail(id));
  return data.data;
};

export { getDoaDetail, getDoaList };
