import { NextFunction, Request, Response } from "express";
import { FacultadService } from "./facultadService";
import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import HttpStatusCode from "../../utils/httpStatusCode";

export class FacultadController {
  private facultadService: FacultadService;

  constructor(facultadService: FacultadService) {
    this.facultadService = facultadService;
  }

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const facultades = await this.facultadService.getAll();
      sendSuccessResponse(res, facultades);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const facultad = await this.facultadService.getById(id);
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
      }
      sendSuccessResponse(res, facultad);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const facultad = await this.facultadService.create(req.body);
      sendSuccessResponse(res, facultad, HttpStatusCode.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      //todo validar desde antes que
      const updatedFacultad = await this.facultadService.update(id, req.body);
      sendSuccessResponse(res, updatedFacultad);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      await this.facultadService.delete(id);
      sendSuccessNoDataResponse(res);
    } catch (error: any) {
      next(error);
    }
  }
}
