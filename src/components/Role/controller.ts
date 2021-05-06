import { Role } from "./model";
import { NextFunction, Request, Response } from "express";

export const getAllRole = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await Role.find();
    res.status(200).json({
      success: true,
      role,
    });
  } catch (error) {
    next(error);
  }
};
