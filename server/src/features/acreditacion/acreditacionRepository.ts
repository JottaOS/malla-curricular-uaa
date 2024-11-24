import { query } from "../../db";
import { Acreditacion } from "./acreditacionModel";

export class AcreditacionRepository {
  static async getAll(): Promise<Acreditacion[]> {
    return await query(`SELECT * FROM acreditacion;`);
  }
}
