import { NextFunction, Request, Response } from "express";
import { BadRequest } from "./../../errors/BadRequest";
import { PropertyType } from "./model";

export const getAllPropertyType = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyType = await PropertyType.find({
      order: { createdAt: "DESC" },
    });

    res.status(200).json({
      success: true,
      propertyType,
    });
  } catch (error) {
    return next(error);
  }
};

export const createPropertyType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name: string = req.body.name || "";
    const description: string = req.body.description || "";

    if (!name.trim().length) {
      throw new BadRequest("name cannot be empty");
    }

    const propertyType = new PropertyType();

    propertyType.name = name;
    propertyType.description = description;

    propertyType.save();

    res.status(200).json({
      success: true,
      propertyType,
    });
  } catch (error) {
    return next(error);
  }
};
