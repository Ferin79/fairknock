import { NextFunction, Response } from "express";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { Unathorized } from "./../../../errors/Unauthorized";
import { AuthRequest } from "./../../../types/AuthRequest";
import { ToPdf } from "./../../../utils/toPdf";
import { Property } from "./../../Properties/Property/model";
import { QuestionOption } from "./../OuestionOption/model";
import { Question } from "./../Question/model";
import { QuestionTemplate } from "./../QuestionTemplate/model";
import { UserAnswer } from "./../UserAnswer/model";
import { UserAnswerOption } from "./../UserAnswerOption/model";
import { UserAnswerTemplate } from "./model";

export type questionTypeInput = {
  userAnswer: {
    answer: string;
    justification: string;
    options: QuestionOption[];
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
    const questions: questionTypeInput[] = req.body.questions || [];

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

    const property = await Property.findOne(propertyId, {
      relations: ["state"],
    });

    if (!property) {
      throw new NotFound("property", propertyId);
    }

    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    const oldData = await UserAnswerTemplate.findOne({
      where: { property: propertyId, user: user.id },
    });
    if (oldData) {
      throw new BadRequest("entry already exist");
    }

    const userAnswerTemplate = new UserAnswerTemplate();

    userAnswerTemplate.property = property;
    userAnswerTemplate.questionTemplate = questionTemplate;
    userAnswerTemplate.user = user;
    await userAnswerTemplate.save();

    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];

      const userAnswer = new UserAnswer();
      userAnswer.question = item;
      userAnswer.answer = item.userAnswer.answer;
      userAnswer.justification = item.userAnswer.justification;
      userAnswer.userAnswerTemplate = userAnswerTemplate;

      await userAnswer.save();

      for (let j = 0; j < item.userAnswer.options.length; j++) {
        const item2 = item.userAnswer.options[i];

        const userOption = new UserAnswerOption();
        userOption.userAnswer = userAnswer;
        userOption.questionOption = item2;

        await userOption.save();
      }
    }

    res.status(200).json({
      success: true,
      userAnswerTemplate,
    });

    ToPdf(userAnswerTemplate, questions);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserAnswer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await UserAnswerTemplate.delete(id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
