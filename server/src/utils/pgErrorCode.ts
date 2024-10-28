// códigos estandar de errores en pg extraídos de
// https://www.postgresql.org/docs/current/errcodes-appendix.html
export enum PgErrorCode {
  NOT_NULL_VIOLATION = "23502",
  UNIQUE_VIOLATION = "23505",
}
