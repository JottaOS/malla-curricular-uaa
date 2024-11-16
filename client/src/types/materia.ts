import { z } from "zod";

export const materiaSchema = z.object({
  id: z.number().optional(),
  codigo: z
    .string()
    .trim()
    .min(5, "La longitud mínima es 5 caracteres")
    .max(10, "La longitud máxima es 10 caracteres")
    .toUpperCase()
    .regex(
      /^[A-Z]+-\d+$/,
      "Debe seguir el formato LETRAS-NÚMEROS (ej. INFO-110)"
    ),
  nombre: z
    .string()
    .trim()
    .min(5, "La longitud mínima es 5 caracteres")
    .max(100, "La longitud máxima es 100 caracteres")
    .toUpperCase()
    .regex(
      /^[a-zA-ZñÑáéíóúÁÉÍÓÚãẽĩõũỹÃẼĨÕŨỸ\s]+$/,
      "Solo puede contener letras y espacios"
    ),
  creditosPresenciales: z
    .number()
    .int()
    .nonnegative("Debe ser mayor o igual a 0")
    .max(100, "Debe ser menor o igual a 100"),
  creditosPracticas: z
    .number()
    .int()
    .nonnegative("Debe ser mayor o igual a 0")
    .max(100, "Debe ser menor o igual a 100"),
  facultadId: z.number().min(1, "El campo es requerido"),
  facultadSiglas: z.string().optional(),
  estado: z.string().min(1, "El campo es requerido"),
});

export type Materia = z.infer<typeof materiaSchema>;
