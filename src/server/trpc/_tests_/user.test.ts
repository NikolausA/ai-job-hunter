import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/server/db";
import { createTestCaller } from "../testHelpers";

describe("userRouter", () => {
  beforeEach(async () => {
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
  });

  it("gets user by id", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "John",
      },
    });

    const caller = await createTestCaller();
    const found = await caller.user.getById({ id: user.id });

    expect(found.email).toBe("test@example.com");
  });

  it("gets user with profiles", async () => {
    const user = await prisma.user.create({
      data: {
        email: "abc@example.com",
        name: "Jane",
        profiles: {
          create: [{ title: "Frontend Dev", experience: "3 years" }],
        },
      },
      include: { profiles: true },
    });

    const caller = await createTestCaller();
    const result = await caller.user.getUserWithProfiles({ id: user.id });

    expect(result?.profiles.length).toBe(1);
  });
});
