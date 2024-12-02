import { query } from "../../db";
import { MallaCurricularDetalleRepository } from "../malla_curricular_detalle/mallaCurricularDetalleRepository";
import { MallaCurricular } from "./mallaCurricularModel";

export class MallaCurricularRepository {
  static async getAll() {
    return await query(`
      SELECT 
          mc.id,
          mc.carrera_id as "carreraId",
          c.nombre as "nombreCarrera",
          mc.promocion,
          mc.fecha_inicio as "fechaInicio",
          mc.estado,
          COALESCE(
            JSON_AGG(
              DISTINCT JSONB_BUILD_OBJECT(
                'mallaCurricularId', mcd.malla_curricular_id,
                'materiaId', mcd.materia_id,
                'materiaNombre', m.nombre,
                'materiaCodigo', m.codigo,
                'anoLectivo', mcd.ano_lectivo,
                'semestre', mcd.semestre
              )
            ) FILTER (WHERE mcd.malla_curricular_id IS NOT NULL), '[]'
          ) AS detalles
      FROM malla_curricular mc
      INNER JOIN carrera c ON c.id = mc.carrera_id
      LEFT JOIN malla_curricular_detalle mcd ON mcd.malla_curricular_id = mc.id
      LEFT JOIN materia m ON m.id = mcd.materia_id
      GROUP BY mc.id, c.id;
    `);
  }

  static async getById(id: number) {
    return await query(
      `
      SELECT 
          mc.id,
          mc.carrera_id as "carreraId",
          c.nombre as "nombreCarrera",
          mc.promocion,
          mc.fecha_inicio as "fechaInicio",
          mc.estado,
          COALESCE(
            JSON_AGG(
              DISTINCT JSONB_BUILD_OBJECT(
                'mallaCurricularId', mcd.malla_curricular_id,
                'materiaId', mcd.materia_id,
                'materiaNombre', m.nombre,
                'materiaCodigo', m.codigo,
                'anoLectivo', mcd.ano_lectivo,
                'semestre', mcd.semestre
              )
            ) FILTER (WHERE mcd.malla_curricular_id IS NOT NULL), '[]'
          ) AS detalles
      FROM malla_curricular mc
      INNER JOIN carrera c ON c.id = mc.carrera_id
      LEFT JOIN malla_curricular_detalle mcd ON mcd.malla_curricular_id = mc.id
      LEFT JOIN materia m ON m.id = mcd.materia_id
      WHERE mc.id = $1
      GROUP BY mc.id, c.id;
    `,
      [id]
    );
  }

  static async create(mallaCurricular: MallaCurricular) {
    const { detalles, ...cabecera } = mallaCurricular;

    // insertar cabecera
    const insertedCabecera = await query(
      `
      INSERT INTO malla_curricular(carrera_id, promocion, fecha_inicio, estado)
      VALUES($1, $2, $3, $4)
      RETURNING id AS "mallaCurricularId"`,
      [
        cabecera.carreraId,
        cabecera.promocion,
        cabecera.fechaInicio,
        cabecera.estado,
      ]
    );

    const mallaCurricularId = insertedCabecera[0].mallaCurricularId;
    // detalles
    const detallePromises = detalles.map((item) => {
      MallaCurricularDetalleRepository.create({ ...item, mallaCurricularId });
    });

    await Promise.all(detallePromises);

    return { mallaCurricularId, ...mallaCurricular };
  }

  static async update(id: number, mallaCurricular: MallaCurricular) {
    const { detalles, ...cabecera } = mallaCurricular;

    // insertar cabecera
    await query(
      `
      UPDATE malla_curricular
      SET carrera_id = $1,
          promocion = $2,
          fecha_inicio = $3,
          estado = $4
      WHERE id = $5`,
      [
        cabecera.carreraId,
        cabecera.promocion,
        cabecera.fechaInicio,
        cabecera.estado,
        id,
      ]
    );

    // borrar todos los detalles para volver a insertar
    await MallaCurricularDetalleRepository.delete(id);

    // detalles
    const detallePromises = detalles.map((item) => {
      MallaCurricularDetalleRepository.create({
        ...item,
        mallaCurricularId: id,
      });
    });

    await Promise.all(detallePromises);

    return { mallaCurricularId: id, ...mallaCurricular };
  }

  static async delete(id: number) {
    await query(
      "DELETE FROM malla_curricular_detalle WHERE malla_curricular_id = $1;",
      [id]
    );

    return await query("DELETE FROM malla_curricular WHERE id = $1;", [id]);
  }
}
