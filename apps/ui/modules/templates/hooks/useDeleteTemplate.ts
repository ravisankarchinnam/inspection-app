import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";

const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/templates/${id}`).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },

    onError: (error) => {
      console.error("Template deletion failed:", error);
    },
  });
};

export default useDeleteTemplate;
