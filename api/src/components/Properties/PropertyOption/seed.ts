import { getConnection } from "typeorm";
import { PropertyOption } from "./model";
import data from "./propertyOptionData.json";

export const seedPropertyOptions = async () => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(PropertyOption)
    .values(data)
    .execute();
};
