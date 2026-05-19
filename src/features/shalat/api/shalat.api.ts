import { api } from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ShalatResponse, ShalatSchedule } from "../types/shalat.type";

export interface ShalatParams {
  provinsi: string;
  kabkota: string;
}

export interface ScheduleParams {
  provinsi: string;
  kabkota: string;
  bulan: number;
  tahun: number;
}

const getProvinceList = async (): Promise<string[]> => {
  const { data } = await api.get<ShalatResponse<string[]>>(
    ENDPOINTS.shalat.provinceList,
  );
  return data.data;
};

const getCityList = async (provinsi: string): Promise<string[]> => {
  const { data } = await api.post<ShalatResponse<string[]>>(
    ENDPOINTS.shalat.cityList,
    { provinsi },
  );
  return data.data;
};

const getSchedule = async (params: ScheduleParams): Promise<ShalatSchedule> => {
  const { data } = await api.post<ShalatResponse<ShalatSchedule>>(
    ENDPOINTS.shalat.schedule,
    params,
  );
  return data.data;
};

export { getCityList, getProvinceList, getSchedule };
