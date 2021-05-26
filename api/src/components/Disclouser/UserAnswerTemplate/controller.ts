import { NextFunction, Response } from "express";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../../Properties/Property/model";
import { QuestionOption } from "./../OuestionOption/model";
import { Question } from "./../Question/model";
import { QuestionTemplate } from "./../QuestionTemplate/model";
import { UserAnswer } from "./../UserAnswer/model";
import { UserAnswerOption } from "./../UserAnswerOption/model";
import { UserAnswerTemplate } from "./model";

type questionType = {
  userAnswer: {
    answer: string;
    justification: string;
    options: [
      {
        optionId: string;
      }
    ];
  };
} & Question;

export const createUserAnswer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const questionTemplateId: string = req.body.questionTemplateId || "";
    const propertyId: string = req.body.propertyId || "";
    const questions: questionType[] = req.body.questions || [];

    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    if (!questionTemplateId.trim().length) {
      throw new BadRequest("question template cannot be null");
    }
    if (!propertyId.trim().length) {
      throw new BadRequest("property cannot be null");
    }

    const questionTemplate = await QuestionTemplate.findOne(questionTemplateId);

    if (!questionTemplate) {
      throw new NotFound("questionTemplate", questionTemplateId);
    }

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    const userAnswerTemplate = new UserAnswerTemplate();

    userAnswerTemplate.property = property;
    userAnswerTemplate.questionTemplate = questionTemplate;
    userAnswerTemplate.user = user;
    await userAnswerTemplate.save();

    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];

      const userAnswer = new UserAnswer();
      userAnswer.answer = item.userAnswer.answer;
      userAnswer.justification = item.userAnswer.justification;
      userAnswer.userAnswerTemplate = userAnswerTemplate;

      await userAnswer.save();

      for (let j = 0; j < item.userAnswer.options.length; j++) {
        const item2 = item.userAnswer.options[i];

        const findOption = await QuestionOption.findOne(item2.optionId);
        if (!findOption) {
          throw new NotFound("option", item2.optionId);
        }

        const userOption = new UserAnswerOption();
        userOption.userAnswer = userAnswer;
        userOption.questionOption = findOption;

        await userOption.save();
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
