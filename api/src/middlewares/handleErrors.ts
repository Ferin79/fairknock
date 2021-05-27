/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { GeneralError } from "../errors/GeneralError";
import { logger } from "./../configs/Logger";
import { InputError } from "./../errors/InputError";

export const handleErrors = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  logger.error(err.message);
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof InputError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.error,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};
