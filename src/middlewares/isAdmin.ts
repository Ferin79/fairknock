import { NextFunction, Response } from "express";
import { RoleType } from "./../components/Role/enum";
import { User } from "./../components/User/model";
import { Forbidden } from "./../errors/Forbidden";
import { AuthRequest } from "./../types/AuthRequest";
export const isAdmin = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Forbidden();
    }

    const user = await User.findOne(userId, { relations: ["role"] });
    if (!user) {
      throw new Forbidden();
    }
    if (user.role.name !== RoleType.admin) {
      throw new Forbidden();
    }

    next();
  } catch (error) {
    return next(error);
  }
};
