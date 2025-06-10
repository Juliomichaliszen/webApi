import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPaciente,
  CreatePacientePayload,
} from "../services/pecienteService";
import { toast } from "react-toastify";

export function useCreatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePacientePayload) => createPaciente(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
    onError: (error) => {
      toast.error(`Falha ao criar paciente: ${error.message}`);
    },
  });
}
