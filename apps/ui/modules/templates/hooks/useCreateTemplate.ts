import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Template } from "@/types/template";

const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateData: Template) =>
      apiClient.post("/templates", templateData).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },

    onError: (error) => {
      console.error("Template creation failed:", error);
    },
  });
};

export default useCreateTemplate;
