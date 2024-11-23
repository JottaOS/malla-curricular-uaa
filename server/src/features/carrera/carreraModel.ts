import { z } from "zod";
import {
  ESTADO_SCHEMA,
  ModalidadCarrera,
  TipoCarrera,
} from "../../utils/constants";

const TIPO_CARRERA_SCHEMA = z.nativeEnum(TipoCarrera, {
  errorMap: () => ({
    message: "Debe ser GRADO, ESPECIALIZACION, MAESTRIA, DIPLOMADO o DOCTORADO",
  }),
});

const MODALIDAD_CARRERA_SCHEMA = z.nativeEnum(ModalidadCarrera, {
  errorMap: () => ({
    message: "Debse ser VIRTUAL, PRESENCIAL o VIRTUAL_PRESENCIAL",
  }),
});

export const carreraSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z
    .string()
    .trim()
    .min(5, "La longitud mínima es 5 caracteres")
    .max(100, "La longitud máxima es de 100 caracteres"),
  tipo: TIPO_CARRERA_SCHEMA,
  facultadId: z.number().int().positive("Debe ser un ID de facultad válido"),
  modalidad: MODALIDAD_CARRERA_SCHEMA,
  perfilProfesional: z
    .string()
    .trim()
    .max(500, "La longitud máxima es de 500 caracteres")
    .optional(),
  acreditaciones: z.array(z.number().positive()).optional(),
  estado: ESTADO_SCHEMA,
});

export type Carrera = z.infer<typeof carreraSchema>;
