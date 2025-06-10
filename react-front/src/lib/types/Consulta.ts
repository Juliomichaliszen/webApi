import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export interface Consulta {
  id: number;
  dataHora: string;
  pacienteId: number;
  paciente: Paciente;
  medicoId: number;
  medico: Medico;
}
