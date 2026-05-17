import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ImsakiyahParams,
  getCityList,
  getProvinceList,
  getSchedule,
} from "../api/imsakiyah.api";

export const useProvinceList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.imsakiyah.provinceList(),
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
    mutationFn: (params: ImsakiyahParams) => getSchedule(params),
  });
};
