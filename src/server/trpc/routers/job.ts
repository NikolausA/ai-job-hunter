import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const jobRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        company: z.string(),
        description: z.string(),
        location: z.string(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.job.create({ data: input });
    }),
});
