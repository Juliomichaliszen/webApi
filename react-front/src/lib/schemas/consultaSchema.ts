import { z } from "zod";

export const consultaSchema = z.object({
  pacienteId: z.number().min(1, "Selecione um paciente."),
  medicoId: z.number().min(1, "Selecione um médico."),
  data: z.string().min(1, "A data é obrigatória."),
  hora: z.string().min(1, "O horário é obrigatório."),
});
