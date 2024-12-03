import { NextFunction, Request, Response } from "express";
import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import HttpStatusCode from "../../utils/httpStatusCode";
import { CarreraRepository } from "./carreraRepository";
import { Carrera, carreraSchema } from "./carreraModel";
import { FacultadRepository } from "../facultad/facultadRepository";

export class CarreraController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const carreras = await CarreraRepository.getAll();
      sendSuccessResponse(res, carreras);
    } catch (error: any) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const carrera = await CarreraRepository.getById(id);
      if (!carrera.length) {
        sendNotFoundResponse(res, "Carrera no encontrada");
        return;
      }
      sendSuccessResponse(res, carrera[0]);
    } catch (error: any) {
      next(error);
    }
  }

  static async create(
    req: Request<Carrera>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsedCarrera = carreraSchema.parse(req.body);

      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(
        parsedCarrera.facultadId
      );
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      const carrera = await CarreraRepository.create(parsedCarrera);
      sendSuccessResponse(res, carrera, HttpStatusCode.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // validar el payload
      const parsedCarrera = carreraSchema.parse(req.body);

      // verificar que exista la Carrera
      const carrera = await CarreraRepository.getById(id);
      if (!carrera.length) {
        sendNotFoundResponse(res, "Carrera no encontrada");
        return;
      }

      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(
        parsedCarrera.facultadId
      );

      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      const updatedCarrera = await CarreraRepository.update(
        carrera[0].id,
        parsedCarrera
      );

      sendSuccessResponse(res, updatedCarrera);
    } catch (error: any) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // verificar que exista la materia
      const carrera = await CarreraRepository.getById(id);
      if (!carrera.length) {
        sendNotFoundResponse(res, "Carrera no encontrada");
        return;
      }

      await CarreraRepository.delete(id);
      sendSuccessNoDataResponse(res);
    } catch (error: any) {
      next(error);
    }
  }
}
