import { NextFunction, Response } from "express";
import { AuthRequest } from "./../../types/AuthRequest";

export const uploadSingleImg = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      file: req.file,
    });
  } catch (error) {
    return next(error);
  }
};

export const uploadMultipleImgs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      files: req.files,
    });
  } catch (error) {
    return next(error);
  }
};

export const uploadSingleVid = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      file: req.file,
    });
  } catch (error) {
    return next(error);
  }
};

export const uploadMultipleVids = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      files: req.files,
    });
  } catch (error) {
    return next(error);
  }
};
