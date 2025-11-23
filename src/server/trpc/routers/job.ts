import { router, publicProcedure } from "../trpc";
import { createJobSchema, getJobByIdSchema } from "../../../shared/types";

export const jobRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),
  getById: publicProcedure
    .input(getJobByIdSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.job.findUniqueOrThrow({
        where: { id: input.id },
      });
    }),
  create: publicProcedure
    .input(createJobSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.job.create({ data: input });
    }),
});
