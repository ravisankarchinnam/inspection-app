import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";

const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/properties/${id}`).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },

    onError: (error) => {
      console.error("Property deletion failed:", error);
    },
  });
};

export default useDeleteProperty;
