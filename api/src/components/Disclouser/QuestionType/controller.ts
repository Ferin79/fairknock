import { NextFunction, Request, Response } from "express";
import { QuestionType } from "./model";

export const getAllQuestionType = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionType = await QuestionType.find();

    res.status(200).json({
      success: true,
      questionType,
    });
  } catch (error) {
    return next(error);
  }
};
