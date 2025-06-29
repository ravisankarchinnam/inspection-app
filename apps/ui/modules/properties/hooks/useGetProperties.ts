import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Property } from "@/types/property";

const getProperties = async () => {
  const response = await apiClient.get("/properties");
  return response.data;
};

export default function useGetProperties() {
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: () => getProperties(),
  });
}
