import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMedico, CreateMedicoPayload } from "../services/medicoService";
import { toast } from "react-toastify";

export function useCreateMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMedicoPayload) => createMedico(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
    onError: (error) => {
      toast.error(`Falha ao criar médico: ${error.message}`);
    },
  });
}
