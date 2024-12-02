import { query } from "../../db";
import { MallaCurricularDetalle } from "./mallaCurricularDetalleModel";

export class MallaCurricularDetalleRepository {
  static async getAll() {
    return await query(`
      SELECT 
          mcd.malla_curricular_id as "mallaCurricularId",
          mcd.materia_id as "materiaId",
          mcd.ano_lectivo as "anoLectivo",
          mcd.semestre
      FROM malla_curricular_detalle mcd
    `);
  }

  static async getById(id: number) {
    return await query(
      `SELECT 
          mcd.malla_curricular_id as "mallaCurricularId",
          mcd.materia_id as "materiaId",
          m.nombre as "materiaNombre",
          m.codigo as "materiaCodigo",
          mcd.ano_lectivo as "anoLectivo",
          mcd.semestre
      FROM malla_curricular_detalle mcd
      INNER JOIN materia m ON m.id = mcd.materia_id
      WHERE mcd.malla_curricular_id = $1
    `,
      [id]
    );
  }

  static async create(detalle: MallaCurricularDetalle) {
    return await query(
      `
      INSERT INTO malla_curricular_detalle(malla_curricular_id, materia_id, ano_lectivo, semestre)
      VALUES($1, $2, $3, $4)
      `,
      [
        detalle.mallaCurricularId,
        detalle.materiaId,
        detalle.anoLectivo,
        detalle.semestre,
      ]
    );
  }

  /**
   * Elimina todos los detalles de una malla curricular según id de cabecera
   * @param id id de la malla curricular
   * @returns void
   */
  static async delete(id: number) {
    await query(
      "DELETE FROM malla_curricular_detalle WHERE malla_curricular_id = $1;",
      [id]
    );
  }
}
