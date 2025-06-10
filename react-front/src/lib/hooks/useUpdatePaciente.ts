import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updatePaciente,
  UpdatePacientePayload,
} from "../services/pecienteService";
import { toast } from "react-toastify";

export function useUpdatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePacientePayload;
    }) => updatePaciente(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
    onError: (error) => {
      toast.error(`Falha ao atualizar paciente: ${error.message}`);
    },
  });
}
