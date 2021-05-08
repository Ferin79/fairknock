import { classToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../errors/BadRequest";
import { NotFound } from "./../../errors/NotFound";
import { AuthRequest } from "./../../types/AuthRequest";
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

export const MeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new BadRequest("user id cannot be empty");
    }

    const user = await User.findOne(userId, { relations: ["role"] });

    if (!user) {
      throw new NotFound("user", userId);
    }

    const newUser = <User>classToPlain(user);

    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await User.findOne(id, { relations: ["role"] });

    if (!user) {
      throw new NotFound("user", id);
    }

    const newUser = <User>classToPlain(user);

    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};
