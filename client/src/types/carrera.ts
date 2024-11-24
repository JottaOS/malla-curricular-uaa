import { z } from "zod";

export enum TipoCarrera {
  GRADO = "GRADO",
  ESPECIALIZACION = "ESPECIALIZACION",
  MAESTRIA = "MAESTRIA",
  DIPLOMADO = "DIPLOMADO",
  DOCTORADO = "DOCTORADO",
}

export enum ModalidadCarrera {
  VIRTUAL = "VIRTUAL",
  PRESENCIAL = "PRESENCIAL",
  VIRTUAL_PRESENCIAL = "VIRTUAL_PRESENCIAL",
}

export const carreraFormSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z
    .string()
    .trim()
    .min(5, "La longitud mínima es 5 caracteres")
    .max(100, "La longitud máxima es de 100 caracteres"),
  tipo: z.string().min(1, "El campo es requerido"),
  facultadId: z.number().int().positive("Debe ser un ID de facultad válido"),
  modalidad: z.string().min(1, "El campo es requerido"),
  perfilProfesional: z
    .string()
    .trim()
    .max(500, "La longitud máxima es de 500 caracteres")
    .optional(),
  acreditaciones: z.array(z.number().positive()).optional(),
  estado: z.string().min(1, "El campo es requerido"),
});

export type CarreraForm = z.infer<typeof carreraFormSchema>;

export interface CarreraTableColumns
  extends Omit<CarreraForm, "acreditaciones"> {
  acreditaciones: string[];
  facultadSiglas: string;
}
