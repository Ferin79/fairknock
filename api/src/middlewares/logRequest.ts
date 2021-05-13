import { NextFunction, Request, Response } from "express";
import { RequestLogger } from "./../configs/RequestLogger";
export const logRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const data = {
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    cookies: req.cookies,
    path: req.path,
    ip: req.ip,
    ips: req.ips,
  };
  RequestLogger.info(data);
  next();
};
