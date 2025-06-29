import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { Inspection } from "@/types/inspection";
import { toast } from "sonner";

const useCreateInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inspectionData: Inspection) =>
      apiClient.post("/inspections", inspectionData).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
    },

    onError: (error) => {
      toast.error(`Inspection creation failed: ${error}`);
    },
  });
};

export default useCreateInspection;
