import { getConnection } from "typeorm";
import { Country } from "./../Country/model";
import { State } from "./model";
import stateData from "./states.json";

export const seedState = async () => {
  const usa = await Country.findOne({ where: { abbreviation: "USA" } });

  if (!usa) {
    return;
  }

  const stateArr: {
    name: string;
    abbreviation: string;
    country: Country;
  }[] = [];

  for (let i = 0; i < stateData.length; i++) {
    const item = stateData[i];
    stateArr.push({
      name: item.name,
      abbreviation: item.abbreviation,
      country: usa,
    });
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(State)
    .values(stateArr)
    .execute();
};
