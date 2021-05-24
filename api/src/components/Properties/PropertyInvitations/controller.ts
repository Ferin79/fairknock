import { NextFunction, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../Property/model";

export const acceptInvitation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const propertyId = req.body.propertyId || -1;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .relation(Property, "invitationsAccepted")
        .of(property)
        .add(user);
    } catch (error) {
      res.status(200).json({
        sucess: true,
      });
    }
    res.status(200).json({
      sucess: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeInvitation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const propertyId = req.params.id;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    if (!propertyId.trim().length) {
      throw new BadRequest("property cannot be null");
    }

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    await getConnection()
      .createQueryBuilder()
      .relation(Property, "invitationsAccepted")
      .of(property)
      .remove(user);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
