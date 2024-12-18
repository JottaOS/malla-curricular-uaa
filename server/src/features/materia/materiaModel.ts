import { z } from "zod";
import { ESTADO_SCHEMA } from "../../utils/constants";

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
  estado: ESTADO_SCHEMA,
  facultadId: z.number().nonnegative().int("Debe ser un número entero"),
  facultadSiglas: z.string().optional(),
});

export const materiaPartial = materiaSchema.partial();

export type Materia = z.infer<typeof materiaSchema>;

export interface MateriaDB
  extends Omit<
    Materia,
    "id" | "creditosPresenciales" | "creditosPracticas" | "facultadId"
  > {
  id: number;
  creditos_presenciales: number;
  creditos_practicas: number;
  facultad_id: number;
  facultad_siglas?: string;
}
