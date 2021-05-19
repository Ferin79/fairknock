import { PropertyAdditionalItem } from "./../PropertyAddItems/model";
import { PropertyAdditionalCategory } from "./model";
import data from "./propertyAddCategoryData.json";

export const seedPropertyAdditionalCategoryItems = async () => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const propertyCat = new PropertyAdditionalCategory();
    propertyCat.name = item.name;
    propertyCat.type = item.type;
    await propertyCat.save();

    for (let j = 0; j < item.items.length; j++) {
      const item2 = item.items[j];
      const propertyItem = new PropertyAdditionalItem();
      propertyItem.name = item2.name;
      propertyItem.propertyAdditionalCategory = propertyCat;
      await propertyItem.save();
    }
  }
};
