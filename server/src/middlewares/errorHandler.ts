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
  // Log the error stack for debugging purposes
  console.error(error.stack);

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    // mejor mandar un solo error para mantener un mensaje estandar
    const firstError = error.errors[0];
    const errMessage = `(${firstError.path[0]}) ${firstError.message}`;
    sendValidationError(response, errMessage);
    return;
  }

  if (isPgError(error)) {
    let message = "Ocurrió un error inesperado en la base de datos.";

    console.log(error);
    switch (error.code) {
      case PgErrorCode.UNIQUE_VIOLATION:
        // increible error managing
        // formato: Key (siglas)=(AAX) already exists.
        const errorValue = error.detail.split(" ")[1];
        message = `La clave ${errorValue} ya existe. Intenta con otro.`;
        break;
    }

    sendErrorResponse(response, { message }, HttpStatusCode.BAD_REQUEST);
    return;
  }

  // Handle other types of errors
  const res =
    process.env.APP_ENV === "dev"
      ? { message: error.message }
      : {
          message:
            "Ocurrió un error inesperado en el servidor. Intenta nuevamente.",
        };
  sendErrorResponse(response, res);
};
