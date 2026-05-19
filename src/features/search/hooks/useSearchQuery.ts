import { useMutation } from "@tanstack/react-query";
import { searchVectorData, VectorParams } from "../api/search.api";

export const useVectorSearch = () => {
  return useMutation({
    mutationFn: (params: VectorParams) => searchVectorData(params),
  });
};
