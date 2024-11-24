import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../../utils/responseHandler";
import { AcreditacionRepository } from "./acreditacionRepository";

export class AcreditacionController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const acreditaciones = await AcreditacionRepository.getAll();
      sendSuccessResponse(res, acreditaciones);
    } catch (error: any) {
      next(error);
    }
  }
}
