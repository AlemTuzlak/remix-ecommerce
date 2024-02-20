import { prisma } from "~/.server/db";
import { createUser } from "../user.model";

describe("creating users", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });
  it("user is created properly", async () => {
    const user = await createUser({
      email: "tests@test.com",
      username: "tesst",
      firstName: "test",
      lastName: "test",
      role: "USER",
    });
    expect(user).toBeDefined();
  });

  it("when creating user with existing email, it throws an error", async ({
    integration,
  }) => {
    const user = await integration.createNormalUser();
    expect(() =>
      createUser({ ...user, username: "something unique" })
    ).rejects.toThrow();
  });
});
