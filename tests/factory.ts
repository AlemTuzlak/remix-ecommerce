import { createUser as createDbUser } from "~/.server/models/user.model";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

const createUser = (role: User["role"]) => () =>
  createDbUser({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role,
  });

export const createNormalUser = createUser("USER");

export const createAdminUser = createUser("ADMIN");
