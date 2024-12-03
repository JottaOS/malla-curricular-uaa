import { NextFunction, Request, Response } from "express";
import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import { MallaCurricularRepository } from "./mallaCurricularRepository";
import { MallaCurricular, mallaCurricularSchema } from "./mallaCurricularModel";
import { CarreraRepository } from "../carrera/carreraRepository";
import HttpStatusCode from "../../utils/httpStatusCode";
import { MateriaRepository } from "../materia/materiaRepository";

export class MallaCurricularController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const mallas = await MallaCurricularRepository.getAll();
      sendSuccessResponse(res, mallas);
    } catch (error: any) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const malla = await MallaCurricularRepository.getById(id);
      if (!malla.length) {
        sendNotFoundResponse(res, "Malla curricular no encontrada");
        return;
      }
      sendSuccessResponse(res, malla[0]);
    } catch (error: any) {
      next(error);
    }
  }

  static async create(
    req: Request<MallaCurricular>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsedMalla = mallaCurricularSchema.parse(req.body);

      // verificar que exista la carrera
      const carrera = await CarreraRepository.getById(parsedMalla.carreraId);

      if (!carrera.length) {
        sendNotFoundResponse(res, "Carrera no encontrada");
        return;
      }

      // verificar que todas las materias existan
      const detallePromises = parsedMalla.detalles.map((item) =>
        MateriaRepository.getById(item.materiaId)
      );

      const responses = await Promise.all(detallePromises);

      responses.forEach((response, index) => {
        const materia = response[0];
        if (!materia) {
          const detalle = parsedMalla.detalles[index];
          sendNotFoundResponse(
            res,
            `La materia con id ${detalle.materiaId} no fue encontrada`
          );
          return;
        }
      });

      const createdMalla = await MallaCurricularRepository.create(parsedMalla);

      sendSuccessResponse(res, createdMalla, HttpStatusCode.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const parsedMalla = mallaCurricularSchema.parse(req.body);

      // verificar que exista la malla
      const malla = await MallaCurricularRepository.getById(id);

      if (!malla.length) {
        sendNotFoundResponse(res, "Malla no encontrada");
        return;
      }

      // verificar que exista la carrera
      const carrera = await CarreraRepository.getById(parsedMalla.carreraId);

      if (!carrera.length) {
        sendNotFoundResponse(res, "Carrera no encontrada");
        return;
      }

      // verificar que todas las materias existan
      const detallePromises = parsedMalla.detalles.map((item) =>
        MateriaRepository.getById(item.materiaId)
      );

      const responses = await Promise.all(detallePromises);

      responses.forEach((response, index) => {
        const materia = response[0];
        if (!materia) {
          const detalle = parsedMalla.detalles[index];
          sendNotFoundResponse(
            res,
            `La materia con id ${detalle.materiaId} no fue encontrada`
          );
          return;
        }
      });

      const createdMalla = await MallaCurricularRepository.update(
        id,
        parsedMalla
      );

      sendSuccessResponse(res, createdMalla, HttpStatusCode.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // verificar que exista la malla
      const malla = await MallaCurricularRepository.getById(id);
      if (!malla.length) {
        sendNotFoundResponse(res, "Malla no encontrada");
        return;
      }

      await MallaCurricularRepository.delete(id);
      sendSuccessNoDataResponse(res);
    } catch (error: any) {
      next(error);
    }
  }
}
