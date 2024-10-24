import { NextFunction, Request, Response } from "express";
import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import HttpStatusCode from "../../utils/httpStatusCode";
import { FacultadRepository } from "./facultadRepository";

export class FacultadController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const facultades = await FacultadRepository.getAll();
      sendSuccessResponse(res, facultades);
    } catch (error: any) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const facultad = await FacultadRepository.getById(id);
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      sendSuccessResponse(res, facultad);
    } catch (error: any) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const facultad = await FacultadRepository.create(req.body);
      sendSuccessResponse(res, facultad, HttpStatusCode.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(id);
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      const updatedFacultad = await FacultadRepository.update(
        facultad[0].id,
        req.body
      );

      sendSuccessResponse(res, updatedFacultad);
    } catch (error: any) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(id);
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      await FacultadRepository.delete(id);
      sendSuccessNoDataResponse(res);
    } catch (error: any) {
      next(error);
    }
  }
}
