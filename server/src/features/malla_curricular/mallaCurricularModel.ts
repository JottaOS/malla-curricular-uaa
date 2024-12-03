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
  anoInicio: z
    .number({ required_error: "El campo es requerido" })
    .int()
    .min(1900, "Debe ser igual o superior a 1900")
    .max(2100, "Debe ser inferior o igual a 2100"),
  estado: ESTADO_SCHEMA,
  detalles: z
    .array(mallaCurricularDetalleSchema)
    .nonempty("La lista de detalles no puede estar vacía"),
});

export type MallaCurricular = z.infer<typeof mallaCurricularSchema>;
