import { NextFunction, Request, Response } from "express";
import { PropertyOption } from "./model";

export const getAllPropertyOption = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyOption = await PropertyOption.find();

    res.status(200).json({
      success: true,
      propertyOption,
    });
  } catch (error) {
    return next(error);
  }
};
