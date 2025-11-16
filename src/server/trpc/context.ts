import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTRPCContext() {
  return { prisma };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
