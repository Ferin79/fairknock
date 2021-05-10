import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { NotFound } from "./../../../errors/NotFound";
import { formatUser } from "./../../../utils/formatUser";
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
