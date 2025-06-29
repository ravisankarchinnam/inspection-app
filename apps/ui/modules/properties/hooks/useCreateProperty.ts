import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Property } from "@/types/property";

const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyData: Property) =>
      apiClient.post("/properties", propertyData).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },

    onError: (error) => {
      console.error("Property creation failed:", error);
    },
  });
};

export default useCreateProperty;
