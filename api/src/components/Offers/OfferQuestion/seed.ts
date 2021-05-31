import { QuestionType } from "./../../Disclouser/QuestionType/model";
import { OfferOption } from "./../OfferOption/model";
import { OfferQuestion } from "./model";
import data from "./offerQuestions.json";

export const seedOfferQuestions = async () => {
  const allQuestionType = await QuestionType.find();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const questionType = allQuestionType.find(
      (type) => item.questionType.toLowerCase() === type.name.toLowerCase()
    );
    if (!questionType) {
      console.log("Question Type not found");
      return;
    }

    const offerQuestion = new OfferQuestion();
    offerQuestion.title = item.title;
    offerQuestion.description = item.description;
    offerQuestion.questionType = questionType;
    offerQuestion.isCompulsory = item.isCompulsory;

    await offerQuestion.save();

    for (let j = 0; j < item.questionOptions.length; j++) {
      const option = item.questionOptions[j];

      const offerOptions = new OfferOption();
      offerOptions.name = option.name;
      offerOptions.offerQuestion = offerQuestion;

      await offerOptions.save({ reload: false });
    }
  }
};
