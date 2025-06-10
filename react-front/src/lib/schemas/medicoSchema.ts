import { z } from "zod";

export const medicoSchema = z.object({
  nome: z.string(),
  especialidade: z.string(),
});
