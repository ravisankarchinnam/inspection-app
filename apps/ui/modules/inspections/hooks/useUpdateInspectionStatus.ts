import apiClient from "@/services/apiClient";
import { InspectionStatus } from "@/types/inspection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function updateInspectionStatus(
  id: string,
  status: InspectionStatus
) {
  const { data } = await apiClient.patch(`/inspections/${id}/status`, {
    status,
  });
  return data;
}

export function useUpdateInspectionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InspectionStatus }) =>
      updateInspectionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
    },
  });
}
