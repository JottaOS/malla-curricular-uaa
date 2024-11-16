import { query } from "../../db";
import { Materia, MateriaDB } from "./materiaModel";

export class MateriaRepository {
  static async getAll() {
    return await query(`
      SELECT m.*, f.siglas as facultad_siglas
      FROM materia m
      INNER JOIN facultad f ON f.id = m.facultad_id;
      `);
  }

  static async getById(id: number): Promise<MateriaDB[]> {
    return await query("SELECT * FROM materia WHERE id = $1;", [id]);
  }

  static async create(materia: Materia): Promise<MateriaDB[]> {
    return await query(
      `INSERT INTO materia(codigo, nombre, creditos_presenciales, creditos_practicas, facultad_id, estado) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      [
        materia.codigo,
        materia.nombre,
        materia.creditosPresenciales,
        materia.creditosPracticas,
        materia.facultadId,
        materia.estado
      ]
    );
  }

  static async update(id: number, materia: Materia): Promise<MateriaDB[]> {
    return await query(
      `UPDATE materia 
      SET codigo = $1, nombre = $2, creditos_presenciales = $3, creditos_practicas = $4, facultad_id = $5, estado = $6
      WHERE id = $7
      RETURNING *;`,
      [
        materia.codigo,
        materia.nombre,
        materia.creditosPresenciales,
        materia.creditosPracticas,
        materia.facultadId,
        materia.estado,
        id,
      ]
    );
  }

  static async delete(id: number) {
    return await query("DELETE FROM materia WHERE id = $1;", [id]);
  }
}
