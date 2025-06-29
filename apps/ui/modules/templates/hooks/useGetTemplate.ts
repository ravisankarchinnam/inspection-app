import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Template } from "@/types/template";

const getTemplate = async (id: string) => {
  const response = await apiClient.get(`/templates/${id}`);
  return response.data;
};

const useGetTemplate = (id?: string) => {
  return useQuery<Template>({
    queryKey: ["get-template", id],
    queryFn: () => getTemplate(id!),
    enabled: !!id,
  });
};

export default useGetTemplate;
