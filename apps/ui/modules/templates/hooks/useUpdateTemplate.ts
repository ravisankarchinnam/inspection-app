import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Template } from "@/types/template";

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, questions }: Pick<Template, "_id" | "questions">) =>
      apiClient
        .post(`/templates/${_id}`, {
          questions: questions.map((q) => {
            const { _id, text, type, isRequired, options } = q;
            return { _id, text, type, isRequired, options };
          }),
        })
        .then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },

    onError: (error) => {
      console.error("Template update failed:", error);
    },
  });
};
