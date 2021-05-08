import { getConnection } from "typeorm";
import { PropertyType } from "./model";
import propertyTypeData from "./PropertyType.json";

export const seedPropertyType = async () => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(PropertyType)
    .values(propertyTypeData)
    .execute();
};
