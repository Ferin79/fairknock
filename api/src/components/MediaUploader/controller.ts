import { NextFunction, Response } from "express";
import fs from "fs";
import cloudinary from "../../configs/Cloudinary";
import { AuthRequest } from "./../../types/AuthRequest";

export const uploadSingleImg = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await cloudinary.v2.uploader.upload(req.file.path, {
      upload_preset: "ayk26en4",
    });

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    fs.unlinkSync(req.file.path);
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
    const data: cloudinary.UploadApiResponse[] = [];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const UploadedData = await cloudinary.v2.uploader.upload(file.path, {
          upload_preset: "ayk26en4",
        });
        data.push(UploadedData);
        fs.unlinkSync(file.path);
      }
    }

    res.status(200).json({
      success: true,
      data,
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
    cloudinary.v2.uploader.upload_large(
      req.file.path,
      {
        upload_preset: "x27u4ewd",
      },
      function (error, data) {
        fs.unlinkSync(req.file.path);
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Video Uploading Failed",
            error,
          });
        }

        return res.status(200).json({
          success: true,
          data,
        });
      }
    );
  } catch (error) {
    fs.unlinkSync(req.file.path);
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
    const data: cloudinary.UploadApiResponse[] = [];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        cloudinary.v2.uploader.upload_large(
          req.file.path,
          {
            upload_preset: "x27u4ewd",
          },
          function (error, result) {
            fs.unlinkSync(file.path);
            if (error) {
              res.status(500).json({
                success: false,
                message: "Video Uploading Failed",
                error,
              });
            }
            if (result) {
              data.push(result);
            }
          }
        );
      }
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
};
