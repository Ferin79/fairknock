import { NextFunction, Response } from "express";
import { getConnection } from "typeorm";
import { Offer } from "../Offer/model";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../../Properties/Property/model";
import { OfferAnswer } from "./../OfferAnswer/model";
import { OfferAnswerOption } from "./../OfferAnswerOption/model";
import { OfferOption } from "./../OfferOption/model";
import { OfferQuestion } from "./../OfferQuestion/model";

export type questionTypeInput = {
  userAnswer: {
    answer: string;
    justification: string;
    options: OfferOption[];
    optionsKey: Record<string, string>;
  };
} & OfferQuestion;

export const createOffer = async (
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
    const price: number = req.body.price || -1;
    const expiration: string = req.body.expiration || "";
    const data: questionTypeInput[] = req.body.data;

    if (!data.length) {
      throw new BadRequest("data cannot be null");
    }
    if (price < 0) {
      throw new BadRequest("price cannot be null");
    }
    if (!expiration.trim().length) {
      throw new BadRequest("expiration cannot be null");
    }

    const property = await getConnection()
      .getRepository(Property)
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.invitationsAccepted", "invitationsAccepted")
      .where("property.id =:id", { id: propertyId })
      .andWhere("invitationsAccepted.id =:UserId", { UserId: user.id })
      .getOne();

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    const offer = new Offer();
    offer.price = price;
    offer.expiration = new Date(expiration);
    offer.property = property;
    offer.user = user;

    await offer.save();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const offerAnswer = new OfferAnswer();
      offerAnswer.offer = offer;
      offerAnswer.answer = item.userAnswer.answer;
      offerAnswer.offerQuestion = item;

      await offerAnswer.save();

      item.userAnswer["optionsKey"] = {};
      for (let j = 0; j < item.userAnswer.options.length; j++) {
        const item2 = item.userAnswer.options[j];

        const userOption = new OfferAnswerOption();
        userOption.offerAnswer = offerAnswer;
        userOption.offerOption = item2;

        await userOption.save();

        if (item.userAnswer.optionsKey) {
          item.userAnswer.optionsKey[item2.key] = item2.name;
        } else {
          item.userAnswer["optionsKey"] = {};
          item.userAnswer.optionsKey[item2.key] = item2.name;
        }
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllOfferByPropertyId = async (
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

    const offers = await Offer.find({
      where: { property: propertyId },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllOfferByMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const offers = await Offer.find({
      where: { user: user.id },
      relations: ["property"],
      order: { createdAt: "DESC" },
    });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    return next(error);
  }
};
