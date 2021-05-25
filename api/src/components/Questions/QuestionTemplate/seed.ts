import { State } from "./../../State/model";
import { QuestionOption } from "./../OuestionOption/model";
import { Question } from "./../Question/model";
import { QuestionType } from "./../QuestionType/model";
import { QuestionTemplate } from "./model";
import data from "./questionData.json";

export const seedQuestions = async () => {
  const allQuestionType = await QuestionType.find();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const state = await State.findOne({ where: { abbreviation: item.state } });
    if (!state) {
      console.log("State Not Found In DB");
      return;
    }

    const questionTemplate = new QuestionTemplate();
    questionTemplate.name = item.name;
    questionTemplate.state = state;
    await questionTemplate.save();

    for (let j = 0; j < item.questions.length; j++) {
      const questionItem = item.questions[j];

      const questionType = allQuestionType.find(
        (type) =>
          questionItem.questionType.toLowerCase() === type.name.toLowerCase()
      );
      if (!questionType) {
        console.log("Question Type not found");
        return;
      }

      const question = new Question();
      question.questionTemplate = questionTemplate;
      question.title = questionItem.title;
      question.description = questionItem.description;
      question.sequenceNumber = questionItem.sequenceNumber;
      question.isCompulsory = questionItem.isCompulsory;
      question.questionType = questionType;
      await question.save();

      for (let k = 0; k < questionItem.questionOptions.length; k++) {
        const options = questionItem.questionOptions[k];

        const newOption = new QuestionOption();
        newOption.question = question;
        newOption.name = options.name;
        await newOption.save({ reload: false });
      }
    }
  }
  return;
};
