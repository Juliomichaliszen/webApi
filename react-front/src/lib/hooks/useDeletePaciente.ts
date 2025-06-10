import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePaciente } from "../services/pecienteService";
import { toast } from "react-toastify";

export function useDeletePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePaciente(id),
    onSuccess: () => {
      toast.success("Paciente deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
    onError: (error) => {
      toast.error(`Falha ao deletar paciente: ${error.message}`);
    },
  });
}
