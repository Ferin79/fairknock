import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "./model";
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const firstName = (req.query.firstName as string) || "";

    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.firstName like :name", {
        name: `%${firstName.trim().length ? firstName : ""}%`,
      })
      .paginate();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
