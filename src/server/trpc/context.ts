import { prisma } from "../db";

export async function createTRPCContext() {
  return { prisma };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
