import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Inspection } from "@/types/inspection";

const getInspections = async () => {
  const response = await apiClient.get("/inspections");
  return response.data;
};

export default function useGetInspections() {
  return useQuery<Inspection[]>({
    queryKey: ["inspections"],
    queryFn: () => getInspections(),
  });
}
