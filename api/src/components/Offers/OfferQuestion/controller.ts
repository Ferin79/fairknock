import { NextFunction, Request, Response } from "express";
import { OfferQuestion } from "./model";

export const getAllQuestions = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await OfferQuestion.find({
      relations: ["questionType", "offerOptions"],
    });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(error);
  }
};
