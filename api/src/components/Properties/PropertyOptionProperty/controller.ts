import { validate } from "class-validator";
import { NextFunction, Response } from "express";
import { InputError } from "../../../errors/InputError";
import { toMapErrors } from "../../../utils/toMapErrors";
import { logger } from "./../../../configs/Logger";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { Unathorized } from "./../../../errors/Unauthorized";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../Property/model";
import { PropertyOption } from "./../PropertyOption/model";
import { PropertyOptionProperty } from "./model";

export const createPropertyOptionConn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be empty");
    }
    const propertyId = req.body.propertyId || -1;
    const data = req.body.data || [];

    if (!data.length) {
      return res.status(200).json({
        success: true,
        data,
      });
    }

    const validData: PropertyOptionProperty[] = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const proOptCon = new PropertyOptionProperty();
      proOptCon.count = item.count;
      proOptCon.propertyOptionId = item.propertyOptionId;

      const errors = await validate(proOptCon);
      if (errors.length) {
        const { errorMap } = toMapErrors(errors);
        throw new InputError(errorMap);
      }

      validData.push(proOptCon);
    }

    const property = await Property.findOne(propertyId);
    if (!property) {
      throw new NotFound("property", propertyId);
    }
    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    for (let i = 0; i < validData.length; i++) {
      const item = validData[i];

      const data = await PropertyOption.findOne(item.propertyOptionId);
      if (!data) {
        throw new NotFound("propertyOption", item.propertyOptionId);
      }
    }

    for (let i = 0; i < validData.length; i++) {
      const item = validData[i];
      item.propertyId = propertyId;
      try {
        await item.save({ reload: false });
      } catch (error) {
        logger.error(error);
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const deletePropertyOptionConn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be empty");
    }
    const propertyId = req.body.propertyId || -1;
    const data: number[] = req.body.data || [];

    if (!data.length) {
      return res.status(200).json({
        success: true,
        data,
      });
    }

    const property = await Property.findOne(propertyId);
    if (!property) {
      throw new NotFound("property", propertyId);
    }
    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      await PropertyOptionProperty.delete({ propertyOptionId: item });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
