import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ScheduleParams,
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

export const useSchedule = (params: ScheduleParams | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.shalat.schedule(
      params?.provinsi ?? "",
      params?.kabkota ?? "",
      params?.bulan ?? 0,
      params?.tahun ?? 0,
    ),
    queryFn: () => getSchedule(params!),
    enabled: !!params?.provinsi && !!params?.kabkota,
    staleTime: Infinity,
  });
};
