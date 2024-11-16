import { z } from "zod";

export const facultadSchema = z.object({
  id: z.number().optional(), // id autonumérico
  nombre: z
    .string()
    .trim()
    .min(10, "La longitud mínima es 10 caracteres")
    .max(60, "La longitud máxima es 60 caracteres")
    .regex(
      /^[a-zA-ZñÑáéíóúÁÉÍÓÚãẽĩõũỹÃẼĨÕŨỸ\s]+$/,
      "Solo puede contener letras y espacios"
    ),
  siglas: z
    .string()
    .trim()
    .min(3, "La longitud mínima es de 3 caracteres")
    .max(10, "La longitud máxima es de 10 caracteres")
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚãẽĩõũỹÃẼĨÕŨỸ]+$/, "Solo letras, sin espacios"),
  estado: z.string().min(1, "El campo es requerido"),
});

export const facultadPartial = facultadSchema.partial();

export type Facultad = z.infer<typeof facultadSchema>;
