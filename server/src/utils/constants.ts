import { z } from "zod";

export const ESTADO_SCHEMA = z.enum(["ACTIVO", "INACTIVO"], {
  errorMap: () => ({ message: "Debe ser ACTIVO o INACTIVO" }),
});
