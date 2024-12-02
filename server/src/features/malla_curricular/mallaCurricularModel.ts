import { z } from "zod";
import { ESTADO_SCHEMA } from "../../utils/constants";
import { mallaCurricularDetalleSchema } from "../malla_curricular_detalle/mallaCurricularDetalleModel";

export const mallaCurricularSchema = z.object({
  id: z.number().int().positive().optional(),
  carreraId: z.number().int().positive("Debe ser un ID de carrera válido"),
  promocion: z
    .number()
    .int()
    .min(1, "Debe ser igual o superior a 1")
    .max(1000, "Debe ser inferior o igual a 1000"),
  fechaInicio: z.coerce.date().min(new Date("1900-01-01")).max(new Date()),
  estado: ESTADO_SCHEMA,
  detalles: z
    .array(mallaCurricularDetalleSchema)
    .nonempty("La lista de detalles no puede estar vacía"),
});

export type MallaCurricular = z.infer<typeof mallaCurricularSchema>;
