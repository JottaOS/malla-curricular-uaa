import { query } from "../../db";
import { Facultad } from "./facultadModel";

export class FacultadRepository {
  static async getAll() {
    return await query("SELECT * FROM facultad");
  }

  static async getById(id: number) {
    return await query("SELECT * FROM facultad WHERE id = $1", [id]);
  }

  static async create(facultad: Facultad) {
    return await query(
      "INSERT INTO facultad(nombre, siglas, estado) VALUES ($1, $2, $3) RETURNING *",
      [facultad.nombre, facultad.siglas, facultad.estado]
    );
  }

  static async update(id: number, facultad: Facultad) {
    return await query(
      "UPDATE facultad SET nombre = $1, siglas = $2 , estado = $3 WHERE id = $4 RETURNING *",
      [facultad.nombre, facultad.siglas, facultad.estado, id]
    );
  }

  static async delete(id: number) {
    return await query("DELETE FROM facultad WHERE id = $1", [id]);
  }
}
