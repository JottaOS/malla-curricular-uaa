import { z } from "zod";
export const carreraFormSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z
    .string()
    .trim()
    .min(5, "La longitud mínima es 5 caracteres")
    .max(100, "La longitud máxima es de 100 caracteres"),
  tipo: z.string().min(1, "El campo es requerido"),
  facultadId: z.number().int().positive("El campo es obligatorio"),
  modalidad: z.string().min(1, "El campo es requerido"),
  perfilProfesional: z
    .string()
    .trim()
    .min(10, "La longitud mínima es de 10 caracteres")
    .max(500, "La longitud máxima es de 500 caracteres"),
  acreditaciones: z.array(z.string()).optional(),
  estado: z.string().min(1, "El campo es requerido"),
  duracion: z
    .number()
    .positive("Debe ser mayor a 0")
    .max(100, "Debe ser menor o igual a 100"),
  unidadTiempo: z.string().min(1, "El campo es requerido"),
});

export type CarreraForm = z.infer<typeof carreraFormSchema>;

export interface CarreraRequestDTO extends Omit<CarreraForm, "acreditaciones"> {
  acreditaciones: number[];
}

export interface CarreraTableColumns
  extends Omit<CarreraForm, "acreditaciones"> {
  acreditaciones: string[];
  facultadSiglas: string;
}
