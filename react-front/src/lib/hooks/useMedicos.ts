import { useQuery } from "@tanstack/react-query";
import { Medico } from "../types/Medico";
import { getMedicos } from "../services/medicoService";

export function useMedicos() {
  return useQuery<Medico[]>({
    queryKey: ["medicos"],
    queryFn: getMedicos,
  });
}
