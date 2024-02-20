import { User } from "@prisma/client";
import { prisma } from "../db";

export const createUser = (user: Omit<User, "id">) => {
  return prisma.user.create({
    data: user,
  });
};
