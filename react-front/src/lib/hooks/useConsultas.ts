import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Consulta } from "../types/Consulta";
import {
  getConsultas,
  createConsulta,
  updateConsulta,
  deleteConsulta,
  CreateConsultaPayload,
  UpdateConsultaPayload,
} from "../services/consultaService";
import { toast } from "react-toastify";

export function useConsultas() {
  return useQuery<Consulta[]>({
    queryKey: ["consultas"],
    queryFn: getConsultas,
  });
}

export function useCreateConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConsultaPayload) => createConsulta(payload),
    onSuccess: () => {
      toast.success("Consulta agendada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
    onError: (error) => {
      toast.error(`Falha ao agendar consulta: ${error.message}`);
    },
  });
}

export function useUpdateConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateConsultaPayload;
    }) => updateConsulta(id, payload),
    onSuccess: () => {
      toast.success("Consulta atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
    onError: (error) => {
      toast.error(`Falha ao atualizar consulta: ${error.message}`);
    },
  });
}

export function useDeleteConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteConsulta(id),
    onSuccess: () => {
      toast.success("Consulta cancelada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
    onError: (error) => {
      toast.error(`Falha ao cancelar consulta: ${error.message}`);
    },
  });
}
