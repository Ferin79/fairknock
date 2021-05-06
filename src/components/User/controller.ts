import { classToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { RoleType } from "./../Role/enum";
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

    const { data, ...props } = users;

    const newUsers: User[] = [];
    data.forEach((user: User) => {
      if (user.role.name !== RoleType.admin) {
        newUsers.push(<User>classToPlain(user));
      }
    });

    res.status(200).json({
      success: true,
      users: newUsers,
      ...props,
    });
  } catch (error) {
    next(error);
  }
};
