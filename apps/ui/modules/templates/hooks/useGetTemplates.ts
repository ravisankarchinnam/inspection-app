import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Template } from "@/types/template";

const getTemplates = async () => {
  const response = await apiClient.get("/templates");
  return response.data;
};

export default function useGetTemplates() {
  return useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });
}
