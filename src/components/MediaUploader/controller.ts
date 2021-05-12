import { NextFunction, Response } from "express";
import { AuthRequest } from "./../../types/AuthRequest";

export const uploadSingleImg = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.file);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
