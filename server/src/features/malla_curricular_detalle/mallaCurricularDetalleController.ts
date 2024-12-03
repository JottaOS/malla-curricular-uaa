import { NextFunction, Request, Response } from "express";
import {
  sendNotFoundResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import { MallaCurricularDetalleRepository } from "./mallaCurricularDetalleRepository";

export class MallaCurricularDetalleController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const detalles = await MallaCurricularDetalleRepository.getAll();
      sendSuccessResponse(res, detalles);
    } catch (error: any) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const detalles = await MallaCurricularDetalleRepository.getById(id);
      if (!detalles.length) {
        sendNotFoundResponse(res, "La malla no cuenta con detalles");
        return;
      }
      sendSuccessResponse(res, detalles);
    } catch (error: any) {
      next(error);
    }
  }
}
