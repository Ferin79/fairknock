import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "./../../../errors/BadRequest";
import { UserType } from "./../../../types/UserType";
import { Question } from "./model";

export const getAllQuestions = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find({
      relations: ["questionType", "questionOptions", "states", "propertyTypes"],
    });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSellerQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stateId: string = req.query.stateId as string;
    const propertyTypeId: string = req.query.propertyTypeId as string;

    if (!stateId || !stateId.trim().length) {
      throw new BadRequest("state id cannot be null");
    }
    if (!propertyTypeId || !propertyTypeId.trim().length) {
      throw new BadRequest("propertyType id cannot be null");
    }

    const questions = await getConnection()
      .getRepository(Question)
      .createQueryBuilder("question")
      .leftJoinAndSelect("question.questionType", "questionType")
      .leftJoinAndSelect("question.questionOptions", "questionOptions")
      .leftJoinAndSelect("question.states", "states")
      .leftJoinAndSelect("question.propertyTypes", "propertyTypes")
      .where("states.id = :stateId", { stateId })
      .andWhere("propertyTypes.id = :propertyTypeId", { propertyTypeId })
      .andWhere("question.askTo = :askToId", { askToId: UserType.seller })
      .getMany();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBuyerQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stateId: string = req.query.stateId as string;
    const propertyTypeId: string = req.query.propertyTypeId as string;

    if (!stateId || !stateId.trim().length) {
      throw new BadRequest("state id cannot be null");
    }
    if (!propertyTypeId || !propertyTypeId.trim().length) {
      throw new BadRequest("propertyType id cannot be null");
    }

    const questions = await getConnection()
      .getRepository(Question)
      .createQueryBuilder("question")
      .leftJoinAndSelect("question.questionType", "questionType")
      .leftJoinAndSelect("question.questionOptions", "questionOptions")
      .leftJoinAndSelect("question.states", "states")
      .leftJoinAndSelect("question.propertyTypes", "propertyTypes")
      .where("states.id = :stateId", { stateId })
      .andWhere("propertyTypes.id = :propertyTypeId", { propertyTypeId })
      .andWhere("question.askTo = :askToId", { askToId: UserType.buyer })
      .getMany();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(error);
  }
};
