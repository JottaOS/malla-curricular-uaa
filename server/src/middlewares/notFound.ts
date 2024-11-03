import { Request, Response, NextFunction } from "express";
import { sendNotFoundResponse } from "../utils/responseHandler";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  sendNotFoundResponse(response, "Request URL no encontrado");
};
