import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  sendErrorResponse,
  sendValidationError,
} from "../utils/responseHandler";

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
    const errors = error.errors.map((err) => ({
      attribute: err.path[0],
      message: err.message,
    }));
    sendValidationError(response, "Validation Error", errors);
  }

  // Handle other types of errors
  const res =
    process.env.APP_ENV === "dev"
      ? { message: error.message }
      : { message: "Internal Server Error" };
  sendErrorResponse(response, res);
};
