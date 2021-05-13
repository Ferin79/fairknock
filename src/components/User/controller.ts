import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../errors/BadRequest";
import { NotFound } from "./../../errors/NotFound";
import { AuthRequest } from "./../../types/AuthRequest";
import { formatUser } from "./../../utils/formatUser";
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
        newUsers.push(formatUser(user));
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
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequest("user id cannot be empty");
    }

    const user = await User.findOne(userId, { relations: ["role"] });

    if (!user) {
      throw new NotFound("user", userId);
    }

    res.status(200).json({
      success: true,
      user: formatUser(user),
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

    res.status(200).json({
      success: true,
      user: formatUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const firstName: string = req.body.firstName || "";
    const lastName: string = req.body.lastName || "";
    const profileUrl: string = req.body.profileUrl || "";
    const fcmToken: string = req.body.fcmToken || "";

    if (!userId) {
      throw new BadRequest("user id cannot be empty");
    }

    const updateObj: Record<string, string> = {};

    if (firstName.trim().length) {
      updateObj["firstName"] = firstName;
    }

    if (lastName.trim().length) {
      updateObj["lastName"] = lastName;
    }

    if (profileUrl.trim().length) {
      updateObj["profileUrl"] = profileUrl;
    }

    if (fcmToken.trim().length) {
      updateObj["fcmToken"] = fcmToken;
    }

    await User.update({ id: userId }, updateObj);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
