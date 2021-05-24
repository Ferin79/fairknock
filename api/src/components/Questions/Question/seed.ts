import faker from "faker";
import { UserType } from "./../../../types/UserType";
import { PropertyType } from "./../../Properties/PropertyType/model";
import { State } from "./../../State/model";
import { QuestionOption } from "./../OuestionOption/model";
import { QuestionType } from "./../QuestionType/model";
import { Question } from "./model";

export const seedQuestions = async () => {
  const allUserType = Object.values(UserType);
  const allQuestionType = await QuestionType.find();
  const allState = await State.find();
  const allPropertyType = await PropertyType.find();

  for (let i = 0; i < 50; i++) {
    const question = new Question();
    question.title = faker.lorem.sentence();
    question.description = faker.lorem.paragraph();
    question.askTo =
      allUserType[Math.floor(Math.random() * allUserType.length)];
    question.questionType =
      allQuestionType[Math.floor(Math.random() * allQuestionType.length)];

    if (
      question.questionType.name === "radio" ||
      question.questionType.name === "checkbox"
    ) {
      const jValue = Math.floor(Math.random() * 4);
      const questionOptionData = [];
      for (let j = 0; j < jValue; j++) {
        const questionOption = new QuestionOption();
        questionOption.name = faker.lorem.word();
        await questionOption.save();
        questionOptionData.push(questionOption);
      }
      question.questionOptions = questionOptionData;
    }
    await question.save();
    question.state = allState[Math.floor(Math.random() * allState.length)];

    question.propertyTypes = [
      allPropertyType[Math.floor(Math.random() * allPropertyType.length)],
    ];
    await question.save({ reload: false });
  }
};
