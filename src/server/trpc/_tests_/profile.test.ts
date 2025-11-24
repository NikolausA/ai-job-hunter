import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/server/db";
import { createTestCaller } from "../testHelpers";

describe("profileRouter", () => {
  beforeEach(async () => {
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
  });

  it("gets profiles by user ID", async () => {
    const user = await prisma.user.create({
      data: {
        email: "profile@test.com",
        name: "Tester",
        profiles: {
          create: [{ title: "Backend", experience: "2 years" }],
        },
      },
    });

    const caller = await createTestCaller();
    const profiles = await caller.profile.getByUser({ userId: user.id });

    expect(profiles.length).toBe(1);
    expect(profiles[0].title).toBe("Backend");
  });
});
