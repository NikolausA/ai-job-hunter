import { appRouter } from "@/server/trpc/root";
import { createTRPCContext } from "@/server/trpc/context";

export async function createTestCaller() {
  const ctx = await createTRPCContext();
  return appRouter.createCaller(ctx);
}
