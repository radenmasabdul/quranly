import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ShalatParams,
  getCityList,
  getProvinceList,
  getSchedule,
} from "../api/shalat.api";

export const useProvinceList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.shalat.provinceList(),
    queryFn: () => getProvinceList(),
    staleTime: Infinity,
  });
};

export const useCityList = () => {
  return useMutation({
    mutationFn: (provinsi: string) => getCityList(provinsi),
  });
};

export const useSchedule = () => {
  return useMutation({
    mutationFn: (params: ShalatParams) => getSchedule(params),
  });
};
