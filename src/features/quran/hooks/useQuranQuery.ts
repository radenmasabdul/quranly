import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getDetailSurat, getSurat, getTafsir } from "../api/quran.api";

export const useQuran = () => {
  return useQuery({
    queryKey: QUERY_KEYS.surat.list(),
    queryFn: getSurat,
    staleTime: Infinity,
  });
};

export const useDetailQuran = (nomor: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.surat.detail(nomor),
    queryFn: () => getDetailSurat(nomor),
    enabled: !!nomor,
    staleTime: Infinity,
  });
};

export const useTafsir = (nomor: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.surat.tafsir(nomor),
    queryFn: () => getTafsir(nomor),
    enabled: !!nomor,
    staleTime: Infinity,
  });
};
