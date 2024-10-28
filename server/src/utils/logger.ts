import winston from "winston";

// configuración basica de winston
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});
