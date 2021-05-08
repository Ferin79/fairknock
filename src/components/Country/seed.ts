import { Country } from "./model";
export const seedCountry = async () => {
  await Country.insert({
    name: "United States of America",
    abbreviation: "USA",
  });
};
