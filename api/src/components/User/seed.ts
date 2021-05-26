import * as faker from "faker";
import { Role } from "./../Role/model";
import { User } from "./model";

export const seedUser = async () => {
  const roles = await Role.find();

  for (let i = 0; i < 3; i++) {
    await User.create({
      firstName: "SYSTEM",
      lastName: "GENERATED",
      email: `system${i + 1}@gmail.com`,
      phoneNumber: `9106054636${i + 1}`,
      password: "1234567890",
      profileUrl: faker.image.imageUrl(),
      role: roles[i],
      isEmailConfirmed: true,
    }).save({ reload: false });
  }

  for (let i = 0; i < 5; i++) {
    await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      password: faker.lorem.word(),
      profileUrl: faker.image.imageUrl(),
      role: Math.random() > 0.5 ? roles[0] : roles[1],
    }).save({ reload: false });
  }
};
