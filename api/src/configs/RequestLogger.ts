import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const RequestLogger = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.File({ filename: "requests.log" })],
});
