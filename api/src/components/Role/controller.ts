import { NextFunction, Request, Response } from "express";
import { RoleType } from "./enum";
import { Role } from "./model";

export const getAllRole = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await Role.find();

    const newRole = role.filter((item) => item.name !== RoleType.admin);

    res.status(200).json({
      success: true,
      role: newRole,
    });
  } catch (error) {
    next(error);
  }
};
