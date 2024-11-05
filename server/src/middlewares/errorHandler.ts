import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  sendErrorResponse,
  sendValidationError,
} from "../utils/responseHandler";
import { PgErrorCode } from "../utils/pgErrorCode";
import HttpStatusCode from "../utils/httpStatusCode";

// los genios de node-pg no crearon una instancia específica para diferenciar sus errores
// de otras excepciones de node. Le pusieron unos cuantos atributos and they called it a day
const isPgError = (error: any): boolean => {
  return error && error.code && error.severity;
};

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.stack);

  if (error instanceof z.ZodError) {
    // mejor mandar un solo error para mantener un mensaje estándar
    const firstError = error.errors[0];
    const errMessage = `(${firstError.path[0]}) ${firstError.message}`;
    sendValidationError(response, errMessage);
    return;
  }

  if (isPgError(error)) {
    let message = "Ocurrió un error inesperado en la base de datos.";
    let errorValue = "";
    console.log(error);

    // increible error managing
    switch (error.code) {
      case PgErrorCode.UNIQUE_VIOLATION:
        // formato: Key (siglas)=(AAX) already exists.
        errorValue = error.detail.split(" ")[1];
        message = `La clave ${errorValue} ya existe. Intenta con otro.`;
        break;

      // tira el mismo código cuando el fk no existe en la tabla padre,
      // pero ese caso si lo valido
      case PgErrorCode.FOREIGN_KEY_VIOLATION:
        // formato: Key (id)=(7) is still referenced from table "materia"
        errorValue = error.detail.split(" ")[1];
        message = `El registro con clave ${errorValue} aún está siendo referenciado en otra entidad`;
        break;
    }

    sendErrorResponse(response, { message }, HttpStatusCode.BAD_REQUEST);
    return;
  }

  // cualqueir otro tipo de error
  const res =
    process.env.APP_ENV === "dev"
      ? { message: error.message }
      : {
          message:
            "Ocurrió un error inesperado en el servidor. Intenta nuevamente.",
        };
  sendErrorResponse(response, res);
};
