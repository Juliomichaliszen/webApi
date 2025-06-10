import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedico } from "../services/medicoService";
import { toast } from "react-toastify";

export function useDeleteMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMedico(id),
    onSuccess: () => {
      toast.success("Médico deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
    onError: (error) => {
      toast.error(`Falha ao deletar médico: ${error.message}`);
    },
  });
}
