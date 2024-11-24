import { query } from "../../db";
import { Carrera } from "./carreraModel";

export class CarreraRepository {
  static async getAll() {
    return await query(`
      SELECT 
          c.id,
          c.nombre,
          c.tipo,
          c.facultad_id as "facultadId",
          f.siglas as "facultadSiglas",
          c.modalidad,
          c.perfil_profesional as "perfilProfesional",
          c.estado,
          c.duracion,
          c.unidad_tiempo as "unidadTiempo",
          COALESCE(JSON_AGG(DISTINCT a.descripcion) FILTER (WHERE a.descripcion IS NOT NULL), '[]') AS acreditaciones
      FROM carrera c
      INNER JOIN facultad f ON f.id = c.facultad_id
      LEFT JOIN carrera_acreditacion ca ON c.id = ca.carrera_id
      LEFT JOIN acreditacion a ON ca.acreditacion_id = a.id
      GROUP BY c.id, f.siglas
    `);
  }

  static async getById(id: number) {
    return await query(
      `SELECT 
          c.id,
          c.nombre,
          c.tipo,
          c.facultad_id as "facultadId",
          f.siglas as "facultadSiglas",
          c.modalidad,
          c.perfil_profesional as "perfilProfesional",
          c.estado,
          c.duracion,
          c.unidad_tiempo as "unidadTiempo",
          COALESCE(JSON_AGG(DISTINCT ca.acreditacion_id) FILTER (WHERE ca.acreditacion_id IS NOT NULL), '[]') AS acreditaciones
      FROM carrera c
      INNER JOIN facultad f ON f.id = c.facultad_id
      LEFT JOIN carrera_acreditacion ca ON c.id = ca.carrera_id
      WHERE c.id = $1
      GROUP BY c.id, f.siglas`,
      [id]
    );
  }

  static async create(carrera: Carrera) {
    // Insertar la carrera
    const insertedCarrera = await query(
      `INSERT INTO carrera
      (nombre, tipo, facultad_id, modalidad, perfil_profesional, estado, duracion, unidad_tiempo)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;`,
      [
        carrera.nombre,
        carrera.tipo,
        carrera.facultadId,
        carrera.modalidad,
        carrera.perfilProfesional,
        carrera.estado,
        carrera.duracion,
        carrera.unidadTiempo,
      ]
    );

    const id = insertedCarrera[0].id;
    // preparar array de promises para acreditaciones
    const acreditacionesPromises =
      carrera.acreditaciones?.map((acreditacion) =>
        query(
          `INSERT INTO carrera_acreditacion(carrera_id, acreditacion_id)
          VALUES($1, $2)`,
          [id, acreditacion]
        )
      ) || []; // Si no hay acreditaciones, se pasa un array vacío

    await Promise.all(acreditacionesPromises);

    return { ...carrera, id };
  }

  static async update(id: number, carrera: Carrera) {
    // Actualizar la carrera
    await query(
      `UPDATE carrera
       SET nombre = $1,
           tipo = $2,
           facultad_id = $3,
           modalidad = $4,
           perfil_profesional = $5,
           estado = $6,
           duracion = $7,
           unidad_tiempo = $8
       WHERE id = $9
       RETURNING *;`,
      [
        carrera.nombre,
        carrera.tipo,
        carrera.facultadId,
        carrera.modalidad,
        carrera.perfilProfesional,
        carrera.estado,
        carrera.duracion,
        carrera.unidadTiempo,
        id,
      ]
    );

    // Eliminar las acreditaciones existentes
    await query(
      `DELETE FROM carrera_acreditacion
       WHERE carrera_id = $1;`,
      [id]
    );

    const acreditacionesPromises =
      carrera.acreditaciones?.map((acreditacion) =>
        query(
          `INSERT INTO carrera_acreditacion(carrera_id, acreditacion_id)
           VALUES($1, $2);`,
          [id, acreditacion]
        )
      ) || [];

    await Promise.all(acreditacionesPromises);

    return { ...carrera, id };
  }

  static async delete(id: number) {
    await query("DELETE FROM carrera_acreditacion WHERE carrera_id = $1;", [
      id,
    ]);
    return await query("DELETE FROM carrera WHERE id = $1;", [id]);
  }
}
