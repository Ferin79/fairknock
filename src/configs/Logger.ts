import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});
