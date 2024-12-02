import { z } from "zod";

export const mallaCurricularDetalleSchema = z.object({
  mallaCurricularId: z
    .number()
    .int()
    .positive("Debe ser un ID de malla válido")
    .optional(),
  materiaId: z.number().int().positive("Debe ser un ID de materia válido"),
  anoLectivo: z
    .number()
    .int()
    .min(1900, "Debe ser igual o superior a 1900")
    .max(2100, "Debe ser inferior o igual a 2100"),
  semestre: z
    .number()
    .int()
    .min(1, "Debe ser igual o superior a 1")
    .max(20, "Debe ser inferior o igual a 20"),
});

export type MallaCurricularDetalle = z.infer<
  typeof mallaCurricularDetalleSchema
>;

export const mallaCurricularSchema = z.object({
  id: z.number().int().positive().optional(),
  carreraId: z.number().int().positive("Debe ser un ID de carrera válido"),
  promocion: z
    .number()
    .int()
    .min(1, "Debe ser igual o superior a 1")
    .max(1000, "Debe ser inferior o igual a 1000"),
  fechaInicio: z.coerce.date().min(new Date("1900-01-01")).max(new Date()),
  estado: z.string().min(1, "El campo es requerido"),
  detalles: z
    .array(mallaCurricularDetalleSchema)
    .nonempty("La lista de detalles no puede estar vacía"),
});

export type MallaCurricular = z.infer<typeof mallaCurricularSchema>;
