// Logging depends a lot on preferred tooling so I have just used code mostly out of the box from: https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342

import winston from "winston";
import { Response, Request, NextFunction } from "express";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "info";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [new winston.transports.Console()];

export const log = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export const httpLoggingMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  log.http({
    type: "inbound",
    url: req.url,
    method: req.method,
  });
  next();
};
