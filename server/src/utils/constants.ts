import { z } from "zod";

export enum Estado {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

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

export enum UnidadTiempo {
  AÑOS = "AÑOS",
  SEMANAS = "SEMANAS",
}

export const ESTADO_SCHEMA = z.nativeEnum(Estado, {
  errorMap: () => ({ message: "Debe ser ACTIVO o INACTIVO" }),
});
