import { api } from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type {
  ImsakiyahResponse,
  ImsakiyahSchedule,
} from "../types/imsakiyah.type";

export interface ImsakiyahParams {
  provinsi: string;
  kabkota: string;
}

const getProvinceList = async (): Promise<string[]> => {
  const { data } = await api.get<ImsakiyahResponse<string[]>>(
    ENDPOINTS.imsakiyah.provinceList,
  );
  return data.data;
};

const getCityList = async (provinsi: string): Promise<string[]> => {
  const { data } = await api.post<ImsakiyahResponse<string[]>>(
    ENDPOINTS.imsakiyah.cityList,
    { provinsi },
  );
  return data.data;
};

const getSchedule = async (
  params: ImsakiyahParams,
): Promise<ImsakiyahSchedule> => {
  const { data } = await api.post<ImsakiyahResponse<ImsakiyahSchedule>>(
    ENDPOINTS.imsakiyah.schedule,
    params,
  );
  return data.data;
};

export { getCityList, getProvinceList, getSchedule };
