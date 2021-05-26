import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { BadRequest } from "../../../errors/BadRequest";
import { QuestionTemplate } from "./model";

export const getQuestionTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stateId = req.params.id;

    const questionTemplates = await QuestionTemplate.find({
      relations: [
        "state",
        "questions",
        "questions.questionType",
        "questions.questionOptions",
      ],
      where: { state: stateId },
    });

    res.status(200).json({
      success: true,
      questionTemplates,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSpecificQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stateId: string = req.query.stateId as string;
    const askTo: string = req.query.askTo as string;

    if (!stateId || !stateId.trim().length) {
      throw new BadRequest("state id cannot be null");
    }

    const questionTemplates = await getConnection()
      .getRepository(QuestionTemplate)
      .createQueryBuilder("questionTemplate")
      .leftJoinAndSelect("questionTemplate.questions", "questions")
      .leftJoinAndSelect("questionTemplate.state", "state")
      .leftJoinAndSelect("questions.questionOptions", "questionOptions")
      .leftJoinAndSelect("questions.questionType", "questionType")
      .where("questionTemplate.state = :stateId", { stateId })
      .andWhere("questions.askTo = :askToId", { askToId: askTo })
      .getMany();

    res.status(200).json({
      success: true,
      questionTemplates,
    });
  } catch (error) {
    return next(error);
  }
};
