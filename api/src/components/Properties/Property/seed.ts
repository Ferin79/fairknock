/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from "faker";
import { nanoid } from "nanoid";
import { State } from "./../../State/model";
import { User } from "./../../User/model";
import { PropertyMedia } from "./../PropertyMedia/model";
import { PropertyOption } from "./../PropertyOption/model";
import { PropertyOptionProperty } from "./../PropertyOptionProperty/model";
import { PropertyType } from "./../PropertyType/model";
import { Property } from "./model";

export const seedProperty = async () => {
  const allStates = await State.find();
  const allUser = await User.find();
  const allPropertyType = await PropertyType.find();
  const allPropertyOption = await PropertyOption.find();

  for (let i = 0; i < 5; i++) {
    const property = new Property();
    property.displayUrl = faker.image.imageUrl();
    property.description = faker.lorem.sentence();
    property.addressLine1 = faker.address.streetAddress();
    property.addressLine2 = faker.address.streetName();
    property.community = faker.lorem.words();
    property.city = faker.address.city();
    property.zipCode = faker.address.zipCode();
    property.squareFeet = parseInt(faker.finance.amount());
    property.numberOfFloor = Math.floor(Math.random() * 10);
    property.state = allStates[Math.floor(Math.random() * allStates.length)];
    property.user = allUser[Math.floor(Math.random() * allUser.length)];
    property.yearBuilt = 2021;
    property.propertyType =
      allPropertyType[Math.floor(Math.random() * allPropertyType.length)];
    property.nanoId = nanoid(10);

    await property.save();

    const jValue = Math.floor(Math.random() * 5);
    for (let j = 0; j < jValue; j++) {
      const propertyOptionsConnection = new PropertyOptionProperty();
      propertyOptionsConnection.count = Math.floor(Math.random() * 5);
      propertyOptionsConnection.squareFeet = Math.floor(Math.random() * 1000);
      propertyOptionsConnection.propertyOptionId =
        allPropertyOption[
          Math.floor(Math.random() * allPropertyOption.length)
        ].id;
      propertyOptionsConnection.propertyId = property.id;
      await propertyOptionsConnection.save({ reload: false });
    }

    const kValue = Math.floor(Math.random() * 5);
    for (let k = 0; k < kValue; k++) {
      const propertyMedia = new PropertyMedia();
      propertyMedia.mediaType = "IMAGE";
      propertyMedia.url = faker.image.imageUrl();
      propertyMedia.property = property;

      await propertyMedia.save({ reload: false });
    }
  }
};
