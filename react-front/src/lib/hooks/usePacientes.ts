import { useQuery } from "@tanstack/react-query";
import { Paciente } from "../types/Paciente";
import { getPacientes } from "../services/pecienteService";

export function usePacientes() {
  return useQuery<Paciente[]>({
    queryKey: ["pacientes"],
    queryFn: getPacientes,
  });
}
