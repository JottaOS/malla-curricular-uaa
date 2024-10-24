import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log de la solicitud (request)
  logger.info(
    `[Request] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`
  );

  // Captura el método original 'send' para loguear la respuesta
  const originalSend = res.send;

  res.send = function (body) {
    // Log de la respuesta (response)
    logger.info(
      `[Response] ${req.method} ${req.url} - Status: ${res.statusCode} - Body: ${body}`
    );

    // Llama al método original 'send'
    return originalSend.call(this, body);
  };

  next();
};
