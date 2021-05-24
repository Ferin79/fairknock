import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { Unathorized } from "./../../../errors/Unauthorized";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../Property/model";
import { PropertyAdditionalCategory } from "./../PropertyAddCategory/model";
import { PropertyAdditionalItem } from "./model";

export const getAllPropertyItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getConnection()
      .getRepository(PropertyAdditionalCategory)
      .createQueryBuilder("propertyAdditionalCategory")
      .leftJoinAndSelect(
        "propertyAdditionalCategory.propertyAdditionalItem",
        "item"
      )
      .getMany();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const createPropertyItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user not found");
    }

    const propertyId: number = req.body.propertyId || -1;
    const items: number[] = req.body.items || [];

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    const validData: PropertyAdditionalItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const data = await PropertyAdditionalItem.findOne(item);
      if (!data) {
        throw new NotFound("Property Additional Item", item);
      } else {
        validData.push(data);
      }
    }

    property.propertyAdditionalItems = validData;

    if (property.userId !== user.id) {
      throw new Unathorized();
    }
    await property.save({ reload: false });
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    return next(error);
  }
};
