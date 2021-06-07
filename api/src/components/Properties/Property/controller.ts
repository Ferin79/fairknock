/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate } from "class-validator";
import { NextFunction, Response } from "express";
import { nanoid } from "nanoid";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../../errors/BadRequest";
import { InputError } from "./../../../errors/InputError";
import { NotFound } from "./../../../errors/NotFound";
import { Unathorized } from "./../../../errors/Unauthorized";
import { AuthRequest } from "./../../../types/AuthRequest";
import { formatUser } from "./../../../utils/formatUser";
import { toMapErrors } from "./../../../utils/toMapErrors";
import { State } from "./../../State/model";
import { PropertyType } from "./../PropertyType/model";
import { Property } from "./model";
import { PropertyStatusType } from "./PropertyStatusType";

export const getMyProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const status: string = (req.query.status as string) || "";

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    let properties: any = getConnection()
      .getRepository(Property)
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.state", "state")
      .leftJoinAndSelect("property.propertyType", "propertyType")
      .where("property.userId = :id", { id: req.user?.id });

    if (status.trim().length) {
      properties = properties.andWhere("property.status = :status", { status });
    }
    properties = await properties.paginate();

    const { data, ...props } = properties;

    data.forEach((item: Property) => {
      item.user = formatUser(item.user);
    });

    console.log(status);

    res.status(200).json({
      success: true,
      properties: data,
      ...props,
    });
  } catch (error) {
    return next(error);
  }
};

export const getInvitedProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const status: string = (req.query.status as string) || "";

    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    let properties: any = getConnection()
      .getRepository(Property)
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.state", "state")
      .leftJoinAndSelect("property.propertyType", "propertyType")
      .leftJoinAndSelect("property.user", "user")
      .leftJoinAndSelect("property.invitationsAccepted", "invitationsAccepted")
      .where("invitationsAccepted.id = :id", { id: user.id })
      .andWhere("property.status != :status", {
        status: PropertyStatusType.draft,
      })
      .andWhere("property.id != :myId", { myId: user.id });

    if (status.trim().length) {
      properties = properties.andWhere("property.status = :status", { status });
    }
    properties = await properties.paginate();

    const { data, ...props } = properties;

    data.map((item: Property) => {
      item.invitationsAccepted = item.invitationsAccepted.map((item2) =>
        formatUser(item2)
      );
    });

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
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const propertyId = req.params.id;
    if (!propertyId.trim().length) {
      throw new BadRequest("property id cannot be null");
    }

    const property = await getConnection()
      .getRepository(Property)
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.user", "user")
      .leftJoinAndSelect("property.state", "state")
      .leftJoinAndSelect("property.propertyType", "propertyType")
      .leftJoinAndSelect(
        "property.propertyOptionsConnection",
        "propertyOptionsConnection"
      )
      .leftJoinAndSelect(
        "propertyOptionsConnection.propertyOption",
        "propertyOption"
      )
      .leftJoinAndSelect("property.propertyMedia", "propertyMedia")
      .leftJoinAndSelect(
        "property.propertyAdditionalItems",
        "propertyAdditionalItems"
      )
      .leftJoinAndSelect(
        "propertyAdditionalItems.propertyAdditionalCategory",
        "propertyAdditionalCategory"
      )
      .leftJoinAndSelect("property.invitationsAccepted", "invitationsAccepted")
      .leftJoinAndSelect("property.userAnswerTemplates", "userAnswerTemplates")
      .where("property.id = :id", { id: propertyId })
      .andWhere("invitationsAccepted.id = :userId", {
        userId: user.id,
      })
      .getOne();

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
    const propertyId: number = req.body.propertyId || -1;

    if (propertyId > 0) {
      return updateProperty(req, res, next);
    }

    if (!user) {
      throw new BadRequest("user id cannot be empty");
    }
    if (!propertyTypeId || propertyTypeId === -1) {
      throw new BadRequest("property id cannot be empty");
    }

    const property = new Property();

    property.description = req.body.description;
    property.addressLine1 = req.body.addressLine1;
    property.addressLine2 = req.body.addressLine2 || "";
    property.community = req.body.community || "";
    property.city = req.body.city;
    property.zipCode = req.body.zipCode;
    property.squareFeet = req.body.squareFeet;
    property.numberOfFloor = req.body.numberOfFloor;
    property.yearBuilt = req.body.yearBuilt;
    property.HOADue = req.body.HOADue;
    property.LotSize = req.body.LotSize;
    property.user = user;
    property.nanoId = nanoid(10);

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
    property.invitationsAccepted = [user];

    await property.save();

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    const propertyId: number = req.body.propertyId || -1;
    const stateId: number = req.body.stateId || -1;
    const propertyTypeId: number = req.body.propertyTypeId || -1;

    const property = await Property.findOne(propertyId);
    if (!property) {
      throw new NotFound("property", propertyId);
    }

    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    property.description = req.body.description;
    property.addressLine1 = req.body.addressLine1;
    property.addressLine2 = req.body.addressLine2 || "";
    property.community = req.body.community || "";
    property.city = req.body.city;
    property.zipCode = req.body.zipCode;
    property.squareFeet = req.body.squareFeet;
    property.numberOfFloor = req.body.numberOfFloor;
    property.yearBuilt = req.body.yearBuilt;
    property.HOADue = req.body.HOADue;
    property.LotSize = req.body.LotSize;

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

export const updatePropertyStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const status = req.body.status || "";
    const propertyId = req.body.propertyId || -1;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    if (!status.trim().length) {
      throw new BadRequest("status cannot be null");
    }

    if (!Object.values(PropertyStatusType).includes(status)) {
      throw new BadRequest("invalid property status");
    }

    if (propertyId < 0) {
      throw new BadRequest("property id cannot be null");
    }

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    if (property.state !== status) {
      property.status = status;

      await property.save({ reload: false });
    }

    property.user = user;

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateInvitationCode = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    const propertyId: number = req.body.propertyId || -1;

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    property.nanoId = nanoid(10);
    await property.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
