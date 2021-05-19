import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../../errors/BadRequest";
import { InputError } from "./../../../errors/InputError";
import { NotFound } from "./../../../errors/NotFound";
import { AuthRequest } from "./../../../types/AuthRequest";
import { formatUser } from "./../../../utils/formatUser";
import { toMapErrors } from "./../../../utils/toMapErrors";
import { State } from "./../../State/model";
import { PropertyType } from "./../PropertyType/model";
import { Property } from "./model";

export const getAllProperty = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await getConnection()
      .getRepository(Property)
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.state", "state")
      .leftJoinAndSelect("property.propertyType", "propertyType")
      .paginate();

    const { data, ...props } = properties;

    res.status(200).json({
      success: true,
      properties: data,
      ...props,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = req.params.id;

    const property = await Property.findOne(propertyId, {
      relations: [
        "user",
        "state",
        "propertyType",
        "propertyOptionsConnection",
        "propertyOptionsConnection.propertyOption",
        "propertyMedia",
        "PropertyAdditionalItems",
        "PropertyAdditionalItems.propertyAdditionalCategory",
      ],
    });

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    property.user = formatUser(property.user);

    res.status(200).json({
      property,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const createProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const stateId: number = req.body.stateId || -1;
    const propertyTypeId: number = req.body.propertyTypeId || -1;

    if (!user) {
      throw new BadRequest("user id cannot be empty");
    }
    if (!propertyTypeId || propertyTypeId !== -1) {
      throw new BadRequest("property id cannot be empty");
    }

    const property = new Property();

    property.displayUrl = req.body.displayUrl;
    property.description = req.body.description;
    property.addressLine1 = req.body.addressLine1;
    property.addressLine2 = req.body.addressLine2 || "";
    property.community = req.body.community || "";
    property.city = req.body.city;
    property.zipCode = req.body.zipCode;
    property.squareFeet = req.body.squareFeet;
    property.numberOfFloor = req.body.numberOfFloor;
    property.user = user;

    const errors = await validate(property);

    if (errors.length) {
      const { errorMap } = toMapErrors(errors);
      throw new InputError(errorMap);
    }

    const state = await State.findOne(stateId);
    if (!state) {
      throw new NotFound("state", stateId);
    }
    const propertyType = await PropertyType.findOne(propertyTypeId);
    if (!propertyType) {
      throw new NotFound("Property type", propertyTypeId);
    }

    property.state = state;
    property.propertyType = propertyType;

    await property.save();

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    return next(error);
  }
};
