import { getConnection } from "typeorm";
import { QuestionType } from "./model";
import data from "./questionTypeData.json";

export const seedQuestionType = async () => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(QuestionType)
    .values(data)
    .execute();
};
