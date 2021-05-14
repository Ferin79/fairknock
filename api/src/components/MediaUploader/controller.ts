import { NextFunction, Response } from "express";
import {
    publishToQueueImage,
    publishToQueueVideo
} from "./../../configs/MessageQueue";
import { AuthRequest } from "./../../types/AuthRequest";

export const uploadSingleImg = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    publishToQueueImage(req.file);

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
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    if (files.length) {
      files.forEach((item) => {
        publishToQueueImage(item);
      });
    }

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
    publishToQueueVideo(req.file);
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
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    if (files.length) {
      files.forEach((item) => {
        publishToQueueVideo(item);
      });
    }

    res.status(200).json({
      success: true,
      files: req.files,
    });
  } catch (error) {
    return next(error);
  }
};
