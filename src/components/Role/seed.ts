import { getConnection } from "typeorm";
import { RoleType } from "./enum";
import { Role } from "./model";
export const seedRole = async () => {
  const roles: Record<string, string>[] = [];

  Object.values(RoleType).forEach((item) => {
    roles.push({
      name: item,
    });
  });

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Role)
    .values(roles)
    .execute();
};
