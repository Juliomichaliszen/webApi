import { z } from "zod";

export const pacienteSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  dataNascimento: z.string(),
});
