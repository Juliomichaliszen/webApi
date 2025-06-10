import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMedico, UpdateMedicoPayload } from "../services/medicoService";
import { toast } from "react-toastify";

export function useUpdateMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateMedicoPayload;
    }) => updateMedico(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
    onError: (error) => {
      toast.error(`Falha ao atualizar médico: ${error.message}`);
    },
  });
}
