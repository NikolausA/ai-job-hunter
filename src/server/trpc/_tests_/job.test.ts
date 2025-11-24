import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/server/db";
import { createTestCaller } from "../testHelpers";

describe("jobRouter", () => {
  beforeEach(async () => {
    await prisma.job.deleteMany();
  });

  it("creates a job", async () => {
    const caller = await createTestCaller();

    const job = await caller.job.create({
      title: "Test Job",
      company: "ACME",
      description: "Some desc",
      location: "Remote",
      tags: ["test"],
    });

    expect(job.title).toBe("Test Job");
  });

  it("returns all jobs", async () => {
    await prisma.job.create({
      data: {
        title: "Test Job 2",
        company: "ACME",
        description: "Desc",
        location: "Remote",
        tags: ["react"],
      },
    });

    const caller = await createTestCaller();
    const jobs = await caller.job.getAll();

    expect(jobs.length).toBe(1);
    expect(jobs[0].company).toBe("ACME");
  });
});
