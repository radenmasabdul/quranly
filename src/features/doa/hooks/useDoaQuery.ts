import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getDoaDetail, getDoaList, GetDoaParams } from "../api/doa.api";

export const useDoa = (params?: GetDoaParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.doa.list(params),
    queryFn: () => getDoaList(params),
    staleTime: Infinity,
  });
};

export const useDoaDetail = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.doa.detail(id),
    queryFn: () => getDoaDetail(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};
