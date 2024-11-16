import { NextFunction, Request, Response } from "express";
import {
  sendErrorResponse,
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import HttpStatusCode from "../../utils/httpStatusCode";
import { MateriaRepository } from "./materiaRepository";
import {
  Materia,
  MateriaDB,
  materiaPartial,
  materiaSchema,
} from "./materiaModel";
import { FacultadRepository } from "../facultad/facultadRepository";

export class MateriaController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const materias = await MateriaRepository.getAll();
      sendSuccessResponse(res, transformMaterias(materias));
    } catch (error: any) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const materia = await MateriaRepository.getById(id);
      if (!materia.length) {
        sendNotFoundResponse(res, "Materia no encontrada");
        return;
      }
      const formattedMateria = transformMaterias(materia)[0];
      sendSuccessResponse(res, formattedMateria);
    } catch (error: any) {
      next(error);
    }
  }

  static async create(
    req: Request<Materia>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsedMateria = materiaSchema.parse(req.body);

      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(
        parsedMateria.facultadId
      );
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      const materia = await MateriaRepository.create(parsedMateria);
      sendSuccessResponse(
        res,
        transformMaterias(materia),
        HttpStatusCode.CREATED
      );
    } catch (error: any) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // validar el payload
      const parsedMateria = materiaSchema.parse(req.body);

      // verificar que exista la Materia
      const materia = await MateriaRepository.getById(id);
      if (!materia.length) {
        sendNotFoundResponse(res, "Materia no encontrada");
        return;
      }

      // verificar que exista la facultad
      const facultad = await FacultadRepository.getById(
        parsedMateria.facultadId
      );
      console.log("Facultad =>", facultad);
      if (!facultad.length) {
        sendNotFoundResponse(res, "Facultad no encontrada");
        return;
      }

      const updatedMateria = await MateriaRepository.update(
        materia[0].id,
        parsedMateria
      );

      sendSuccessResponse(res, transformMaterias(updatedMateria));
    } catch (error: any) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      // verificar que exista la materia
      const materia = await MateriaRepository.getById(id);
      if (!materia.length) {
        sendNotFoundResponse(res, "Materia no encontrada");
        return;
      }

      await MateriaRepository.delete(id);
      sendSuccessNoDataResponse(res);
    } catch (error: any) {
      next(error);
    }
  }
}

const transformMaterias = (materias: MateriaDB[]): Materia[] => {
  return materias.map((materia) => ({
    id: materia.id,
    codigo: materia.codigo,
    nombre: materia.nombre,
    creditosPresenciales: materia.creditos_presenciales,
    creditosPracticas: materia.creditos_practicas,
    facultadId: materia.facultad_id,
    estado: materia.estado,
    // LAZY SOLUTION DON'T BOTHER ME !!!
    ...(materia.facultad_siglas && { facultadSiglas: materia.facultad_siglas }),
  }));
};
