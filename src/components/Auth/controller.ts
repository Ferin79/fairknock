import { compare } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "./../../errors/BadRequest";
import { InputError } from "./../../errors/InputError";
import { NotFound } from "./../../errors/NotFound";
import {
    generateAccessToken,
    generateRefreshToken
} from "./../../utils/generateToken";
import { toMapErrors } from "./../../utils/toMapErrors";
import { Role } from "./../Role/model";
import { User } from "./../User/model";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailOrPhone: string = req.body.emailOrPhone || "";
    const password: string = req.body.password || "";

    if (!emailOrPhone.trim().length) {
      throw new BadRequest("email or phone number cannot be empty");
    }

    if (!password.trim().length) {
      throw new BadRequest("password cannot be empty");
    }

    let user: User | undefined = undefined;
    if (emailOrPhone.includes("@")) {
      user = await User.findOne({
        where: { email: emailOrPhone },
        relations: ["role"],
      });
    } else {
      user = await User.findOne({
        where: { phoneNumber: emailOrPhone },
        relations: ["role"],
      });
    }

    if (!user) {
      throw new NotFound("user", emailOrPhone);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new BadRequest("invalid email or password");
    }

    const { accessToken } = generateAccessToken(user);
    const { refreshToken } = generateRefreshToken(user);

    const transformedUser = <User>classToPlain(user);

    res.json({
      success: true,
      user: transformedUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role_id = req.body.role_id || 0;

    if (!role_id) {
      throw new BadRequest("role id cannot be empty");
    }

    const role = await Role.findOne(role_id);

    if (!role) {
      throw new NotFound("role", role_id);
    }

    const user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.password = req.body.password;
    user.profileUrl = req.body.profileUrl;
    user.role = role;

    const errors = await validate(user);

    if (errors.length) {
      const { errorMap } = toMapErrors(errors);
      throw new InputError(errorMap);
    }

    await user.save();

    const newUser = <User>classToPlain(user);

    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};
