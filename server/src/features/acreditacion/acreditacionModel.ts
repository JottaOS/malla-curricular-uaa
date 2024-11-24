import { z } from "zod";

export const acreditacionSchema = z.object({
  id: z.number().int(),
  descripcion: z.string(),
});

export type Acreditacion = z.infer<typeof acreditacionSchema>;
