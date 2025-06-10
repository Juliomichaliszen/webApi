import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createConsulta,
  CreateConsultaPayload,
} from "@/lib/services/consultaService";
import { toast } from "react-toastify";

export function useCreateConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConsultaPayload) => createConsulta(data),
    onSuccess: () => {
      toast.success("Consulta criada com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["consulta"] });
    },
  });
}
