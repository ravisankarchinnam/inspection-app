import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Answer } from "@/types/inspection";
import { toast } from "sonner";

const useUpdateInspection = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, answers }: { id: string; answers: Answer[] }) =>
      apiClient.put(`/inspections/${id}`, { answers }).then((res) => res.data),

    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
    },

    onError: (error) => {
      toast.error(`Inspection update failed: ${error}`);
    },
  });
};

export default useUpdateInspection;
